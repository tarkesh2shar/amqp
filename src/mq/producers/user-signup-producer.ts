import { BaseProducer }    from "./base-producer";
import { UserSignupEvent } from "../types/user-signup";
import { Queues }          from "../types/queues";

export class UserSignupProducer extends BaseProducer<UserSignupEvent> {
  readonly queue = Queues.UserSignup;
}