export interface BeianRecord {
  text: string
  href?: string
}

export interface IcpConfig {
  records: BeianRecord[]
  publicSecurityRecords: BeianRecord[]
  publicSecurityIcon: string
}

const icpConfig: IcpConfig = {
  publicSecurityIcon: "/icon.png",
  records: [
    {
      // Build after replacing this with your ICP record, for example:
      // text: "京ICP备XXXXXXXX号-X",
      text: "",
      href: "https://beian.miit.gov.cn/",
    },
  ],
  publicSecurityRecords: [
    {
      // Build after replacing this with your public security record, for example:
      // text: "京公网安备 XXXXXXXXXXXXXX号",
      text: "",
      href: "https://beian.mps.gov.cn/#/query/webSearch?code=",
    },
  ],
}

export default icpConfig
