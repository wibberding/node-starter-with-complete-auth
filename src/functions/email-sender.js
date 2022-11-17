import sgMail from "@sendgrid/mail";
import { SENDGRID_API, HOST_EMAIL } from "../constants";

sgMail.setApiKey(SENDGRID_API);

const sendMail = async (email, subject, text, html) => {
  try {
    const msg = {
      subject: subject,
      text: text,
      html: html,
      to: email,
      from: HOST_EMAIL,
    };

    await sgMail.send(msg);
    console.log("MAIL_SENT");

  } catch (err) {
    console.log("ERROR_MAILING", err.message);
  } finally {
    return;
  }
}

export default sendMail;