import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"
import { QuartzTransformerPlugin } from "../types"
import yaml from "js-yaml"
import toml from "toml"
import { FilePath, FullSlug, getFileExtension, slugifyFilePath, slugTag } from "../../util/path"
import { QuartzPluginData } from "../vfile"
import { i18n } from "../../i18n"
import fs from "fs"
import path from "path"

export interface Options {
  delimiters: string | [string, string]
  language: "yaml" | "toml"
}

const defaultOptions: Options = {
  delimiters: "---",
  language: "yaml",
}

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"])

function coalesceAliases(data: { [key: string]: any }, aliases: string[]) {
  for (const alias of aliases) {
    if (data[alias] !== undefined && data[alias] !== null) return data[alias]
  }
}

function coerceToArray(input: string | string[]): string[] | undefined {
  if (input === undefined || input === null) return undefined

  // coerce to array
  if (!Array.isArray(input)) {
    input = input
      .toString()
      .split(",")
      .map((tag: string) => tag.trim())
  }

  // remove all non-strings
  return input
    .filter((tag: unknown) => typeof tag === "string" || typeof tag === "number")
    .map((tag: string | number) => tag.toString())
}

function toPosix(fp: string): string {
  return fp.split(path.sep).join("/")
}

function getImageAssetFiles(contentDir: string): FilePath[] {
  const files: FilePath[] = []
  const walk = (currentDir: string) => {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      const relativePath = toPosix(path.relative(contentDir, fullPath))
      const ext = getFileExtension(relativePath)?.toLowerCase()
      if (ext && imageExtensions.has(ext)) {
        files.push(relativePath as FilePath)
      }
    }
  }

  walk(contentDir)
  return files
}

function fileExistsInContentDir(contentDir: string, relativePath: string): boolean {
  const fullPath = path.join(contentDir, ...relativePath.split("/"))
  return fs.existsSync(fullPath)
}

function expandImageCandidates(rawPath: string): string[] {
  const ext = getFileExtension(rawPath)?.toLowerCase()
  if (ext) {
    return [rawPath]
  }

  return [...imageExtensions].map((imageExt) => `${rawPath}${imageExt}`)
}

function resolveIconPath(
  icon: unknown,
  fileRelativePath: FilePath,
  contentDir: string,
): string | undefined {
  if (icon === undefined || icon === null) {
    return undefined
  }

  const rawIcon = icon.toString().trim()
  if (rawIcon.length === 0) {
    return undefined
  }

  if (/^https?:\/\//i.test(rawIcon)) {
    return rawIcon
  }

  const noteDir = path.posix.dirname(fileRelativePath)
  const topLevelDir = fileRelativePath.split("/")[0] ?? ""
  const hasExplicitPath = rawIcon.includes("/")
  const directCandidates = new Set<string>()

  for (const iconCandidate of expandImageCandidates(rawIcon)) {
    directCandidates.add(iconCandidate)
    if (noteDir !== ".") {
      directCandidates.add(path.posix.join(noteDir, iconCandidate))
    }

    if (topLevelDir) {
      directCandidates.add(path.posix.join(topLevelDir, "附件", iconCandidate))
      directCandidates.add(path.posix.join(topLevelDir, "attachments", iconCandidate))
      directCandidates.add(path.posix.join(topLevelDir, "assets", iconCandidate))
    }

    directCandidates.add(path.posix.join("附件", iconCandidate))
    directCandidates.add(path.posix.join("attachments", iconCandidate))
    directCandidates.add(path.posix.join("assets", iconCandidate))
  }

  for (const candidate of directCandidates) {
    if (fileExistsInContentDir(contentDir, candidate)) {
      return slugifyFilePath(candidate as FilePath)
    }
  }

  if (hasExplicitPath) {
    return slugifyFilePath(rawIcon as FilePath)
  }

  const assetFiles = getImageAssetFiles(contentDir)
  const exactMatches = assetFiles
    .filter((assetPath) => {
      const assetBaseName = path.posix.basename(assetPath)
      const assetStem = assetBaseName.replace(/\.[A-Za-z0-9]+$/, "")
      return assetBaseName === rawIcon || assetStem === rawIcon
    })
    .sort((left, right) => {
      const score = (assetPath: string) => {
        let value = 0
        if (noteDir !== "." && path.posix.dirname(assetPath) === noteDir) value += 100
        if (topLevelDir && assetPath.startsWith(`${topLevelDir}/`)) value += 50
        if (assetPath.includes("/附件/") || assetPath.includes("/attachments/")) value += 25
        if (path.posix.basename(assetPath) === rawIcon) value += 10
        return value
      }

      return score(right) - score(left) || left.length - right.length
    })

  if (exactMatches.length > 0) {
    return slugifyFilePath(exactMatches[0])
  }

  return undefined
}

function getAliasSlugs(aliases: string[]): FullSlug[] {
  const res: FullSlug[] = []
  for (const alias of aliases) {
    const isMd = getFileExtension(alias) === "md"
    const mockFp = isMd ? alias : alias + ".md"
    const slug = slugifyFilePath(mockFp as FilePath)
    res.push(slug)
  }

  return res
}

export const FrontMatter: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "FrontMatter",
    markdownPlugins(ctx) {
      const { cfg, allSlugs } = ctx
      return [
        [remarkFrontmatter, ["yaml", "toml"]],
        () => {
          return (_, file) => {
            const fileData = Buffer.from(file.value as Uint8Array)
            const { data } = matter(fileData, {
              ...opts,
              engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
                toml: (s) => toml.parse(s) as object,
              },
            })

            if (data.title != null && data.title.toString() !== "") {
              data.title = data.title.toString()
            } else {
              data.title = file.stem ?? i18n(cfg.configuration.locale).propertyDefaults.title
            }

            const tags = coerceToArray(coalesceAliases(data, ["tags", "tag"]))
            if (tags) data.tags = [...new Set(tags.map((tag: string) => slugTag(tag)))]

            const authors = coerceToArray(coalesceAliases(data, ["authors", "author"]))
            if (authors) data.authors = [...new Set(authors)]

            const icon = resolveIconPath(data.icon, file.data.relativePath!, ctx.argv.directory)
            if (icon) data.icon = icon

            const aliases = coerceToArray(coalesceAliases(data, ["aliases", "alias"]))
            if (aliases) {
              data.aliases = aliases // frontmatter
              file.data.aliases = getAliasSlugs(aliases)
              allSlugs.push(...file.data.aliases)
            }

            if (data.permalink != null && data.permalink.toString() !== "") {
              data.permalink = data.permalink.toString() as FullSlug
              const aliases = file.data.aliases ?? []
              aliases.push(data.permalink)
              file.data.aliases = aliases
              allSlugs.push(data.permalink)
            }

            const cssclasses = coerceToArray(coalesceAliases(data, ["cssclasses", "cssclass"]))
            if (cssclasses) data.cssclasses = cssclasses

            const socialImage = coalesceAliases(data, ["socialImage", "image", "cover"])

            const created = coalesceAliases(data, ["created", "date"])
            if (created) {
              data.created = created
            }

            const modified = coalesceAliases(data, [
              "modified",
              "lastmod",
              "updated",
              "last-modified",
            ])
            if (modified) data.modified = modified
            data.modified ||= created // if modified is not set, use created

            const published = coalesceAliases(data, ["published", "publishDate", "date"])
            if (published) data.published = published

            if (socialImage) data.socialImage = socialImage

            // Remove duplicate slugs
            const uniqueSlugs = [...new Set(allSlugs)]
            allSlugs.splice(0, allSlugs.length, ...uniqueSlugs)

            // fill in frontmatter
            file.data.frontmatter = data as QuartzPluginData["frontmatter"]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    aliases: FullSlug[]
    frontmatter: { [key: string]: unknown } & {
      title: string
    } & Partial<{
        tags: string[]
        aliases: string[]
        modified: string
        created: string
        published: string
        authors: string[]
        icon: string
        description: string
        socialDescription: string
        publish: boolean | string
        draft: boolean | string
        lang: string
        enableToc: string
        cssclasses: string[]
        socialImage: string
        comments: boolean | string
      }>
  }
}
