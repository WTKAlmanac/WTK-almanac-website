import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface BeianRecord {
  text: string
  href?: string
}

interface Options {
  links: Record<string, string>
  icp?: BeianRecord[]
  publicSecurity?: BeianRecord[]
  publicSecurityIcon?: string
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? []
    const icpRecords = opts?.icp?.filter((record) => record.text.trim().length > 0) ?? []
    const publicSecurityRecords =
      opts?.publicSecurity?.filter((record) => record.text.trim().length > 0) ?? []
    const publicSecurityIcon = opts?.publicSecurityIcon

    return (
      <footer class={`${displayClass ?? ""}`}>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        {icpRecords.length + publicSecurityRecords.length > 0 && (
          <ul class="icp">
            {icpRecords.map(({ text, href }) => (
              <li>{href ? <a href={href}>{text}</a> : text}</li>
            ))}
            {publicSecurityRecords.map(({ text, href }) => (
              <li>
                {href ? (
                  <a class="public-security-beian" href={href}>
                    {publicSecurityIcon && (
                      <img src={publicSecurityIcon} alt="" aria-hidden="true" />
                    )}
                    <span>{text}</span>
                  </a>
                ) : (
                  <span class="public-security-beian">
                    {publicSecurityIcon && (
                      <img src={publicSecurityIcon} alt="" aria-hidden="true" />
                    )}
                    <span>{text}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
