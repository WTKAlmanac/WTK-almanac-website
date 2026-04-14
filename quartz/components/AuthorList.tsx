import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface AuthorListOptions {
  label: string
  separator: string
}

const defaultOptions: AuthorListOptions = {
  label: "Author",
  separator: ", ",
}

function normalizeAuthors(authors: unknown): string[] {
  if (authors === undefined || authors === null) {
    return []
  }

  const values = Array.isArray(authors) ? authors : authors.toString().split(",")

  return values
    .filter((author: unknown) => typeof author === "string" || typeof author === "number")
    .map((author: string | number) => author.toString().trim())
    .filter((author: string) => author.length > 0)
}

export default ((opts?: Partial<AuthorListOptions>) => {
  const options: AuthorListOptions = { ...defaultOptions, ...opts }

  function AuthorList({ fileData, displayClass }: QuartzComponentProps) {
    const authors = normalizeAuthors(fileData.frontmatter?.authors)
    if (authors.length === 0) {
      return null
    }

    return (
      <p class={classNames(displayClass, "article-author-list")}>
        <span class="article-author-list-label">{options.label}</span>
        <span class="article-author-list-separator">: </span>
        <span class="article-author-list-values">{authors.join(options.separator)}</span>
      </p>
    )
  }

  AuthorList.css = `
  .article-author-list {
    margin: 0.35rem 0 0 0;
    color: var(--darkgray);
  }

  .article-author-list-label {
    font-weight: 600;
  }
  `

  return AuthorList
}) satisfies QuartzComponentConstructor<Partial<AuthorListOptions> | undefined>
