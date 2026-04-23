import { FullSlug, isAbsoluteURL, resolveRelative } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function resolveIconSrc(icon: string, currentSlug: FullSlug): string {
  if (isAbsoluteURL(icon)) {
    return icon
  }

  return resolveRelative(currentSlug, icon as FullSlug)
}

export default (() => {
  function NoteIcon({ fileData, displayClass }: QuartzComponentProps) {
    const icon = fileData.frontmatter?.icon
    if (typeof icon !== "string" || icon.trim().length === 0 || !fileData.slug) {
      return null
    }

    const title = fileData.frontmatter?.title ?? "note"

    return (
      <div class={classNames(displayClass, "note-icon")}>
        <img
          class="note-icon-image"
          src={resolveIconSrc(icon, fileData.slug)}
          alt={`${title} icon`}
        />
      </div>
    )
  }

  NoteIcon.css = `
  .note-icon {
    margin: 0.75rem 0 1.25rem 0;
  }

  .note-icon-image {
    display: block;
    max-width: min(100%, 14rem);
    height: auto;
    border-radius: 12px;
    object-fit: contain;
  }

  @media all and (max-width: 800px) {
    .note-icon-image {
      max-width: min(100%, 10rem);
    }
  }
  `

  return NoteIcon
}) satisfies QuartzComponentConstructor
