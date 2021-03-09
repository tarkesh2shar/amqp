import { Queues } from "./queues";

export interface UserSignupEvent {
  queue: Queues.UserSignup;
  data: {
    email: string;
  }
}