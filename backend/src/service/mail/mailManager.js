import config from "../../configuration/config.js";
import transporter from "../../utils/mail.js";

export default class MailManager {
  static async send({ to, subject, html, attachments = [] }) {
    return transporter.sendMail({
      from: config.mailTransport,
      to,
      subject,
      html,
      attachments
    })
  }
}