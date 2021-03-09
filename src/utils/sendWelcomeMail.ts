import sgMail, { MailDataRequired } from "@sendgrid/mail";
import consola                      from "consola";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendWelcomeMail = async (email: string): Promise<boolean> => {
  const message: MailDataRequired = {
    to     : email,
    from   : process.env.SENDGRID_EMAIL as string,
    subject: "Sign up successful",
    text   : "Welcome on board",
    html   : `<strong>Welcome on board ${ email }</strong>`
  };

  try {
    await sgMail.send(message);
    consola.success(`Email sent to ${ email }`);
    return true;
  } catch (e) {
    consola.error("Failed to send email", e);
    return false;
  }
};