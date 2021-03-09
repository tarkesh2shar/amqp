import { ConsumeMessage }  from "amqplib";
import { BaseConsumer }    from "./base-consumer";
import { UserSignupEvent } from "../types/user-signup";
import { Queues }          from "../types/queues";
import { sendWelcomeMail } from "../../utils/sendWelcomeMail";

export class UserSignupConsumer extends BaseConsumer<UserSignupEvent> {
  readonly queue = Queues.UserSignup;

  async onMessage({ email }: UserSignupEvent["data"], message: ConsumeMessage) {
    this.ensureChannelIsInitialized();

    await sendWelcomeMail(email);
    this.channel!.ack(message);
  }
}