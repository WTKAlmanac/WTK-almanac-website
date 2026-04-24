import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface IcpRecord {
  text: string
  href?: string
}

interface Options {
  links: Record<string, string>
  icp?: IcpRecord[]
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? []
    const icpRecords = opts?.icp?.filter((record) => record.text.trim().length > 0) ?? []

    return (
      <footer class={`${displayClass ?? ""}`}>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        {icpRecords.length > 0 && (
          <ul class="icp">
            {icpRecords.map(({ text, href }) => (
              <li>{href ? <a href={href}>{text}</a> : text}</li>
            ))}
          </ul>
        )}
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
