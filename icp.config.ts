export interface IcpRecord {
  text: string
  href?: string
}

export interface IcpConfig {
  records: IcpRecord[]
}

const icpConfig: IcpConfig = {
  records: [
    {
      // Build after replacing this with your ICP record, for example:
      // text: "京ICP备XXXXXXXX号-X",
      text: "",
      href: "https://beian.miit.gov.cn/",
    },
  ],
}

export default icpConfig
