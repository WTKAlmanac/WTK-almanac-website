import { FullSlug, isAbsoluteURL, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

export function byDateAndAlphabeticalFolderFirst(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort folders first
    const f1IsFolder = isFolderPath(f1.slug ?? "")
    const f2IsFolder = isFolderPath(f2.slug ?? "")
    if (f1IsFolder && !f2IsFolder) return -1
    if (!f1IsFolder && f2IsFolder) return 1

    // If both are folders or both are files, sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps

function resolveIconSrc(currentSlug: FullSlug, icon: string): string {
  if (isAbsoluteURL(icon)) {
    return icon
  }

  return resolveRelative(currentSlug, icon as FullSlug)
}

const hiddenPageListTagNames = new Set(["官正", "官盗", "宽卡", "窄卡"])
const hiddenPageListTagPrefixes = ["E", "K", "S", "I", "X"]

function shouldShowPageListTag(tag: string): boolean {
  const normalizedTag = tag.trim()

  return (
    normalizedTag.length > 0 &&
    !hiddenPageListTagNames.has(normalizedTag) &&
    !hiddenPageListTagPrefixes.some((prefix) => normalizedTag.startsWith(prefix)) &&
    !normalizedTag.includes("芯")
  )
}

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title ?? "Untitled"
        const tags = (page.frontmatter?.tags ?? []).filter(shouldShowPageListTag)
        const icon = page.frontmatter?.icon
        const href = resolveRelative(fileData.slug!, page.slug!)
        const hasIcon = typeof icon === "string" && icon.length > 0
        const tagSummary = tags.length > 0 ? tags.join(" · ") : undefined

        return (
          <li class="section-li">
            <a href={href} class={`section-card internal${hasIcon ? " has-icon" : " no-icon"}`}>
              <div class="card-main">
                {hasIcon && (
                  <div class="card-icon-wrap">
                    <img
                      class="card-icon"
                      src={resolveIconSrc(fileData.slug!, icon)}
                      alt={`${title} icon`}
                    />
                  </div>
                )}
                <h3>{title}</h3>
              </div>
              {tagSummary && <p class="meta tags-meta">{tagSummary}</p>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.section-card h3 {
  margin: 0;
}

.section-card {
  color: inherit;
}

.section-card:hover h3 {
  text-decoration: underline;
}
`
