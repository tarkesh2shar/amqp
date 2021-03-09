import { start }              from "./start";
import { app }                from "./app";
import { amqpWrapper }        from "./amqp-wrapper";
import consola                from "consola";
import { UserSignupConsumer } from "./mq";

async function init() {
  try {
    await amqpWrapper.connect();
    await new UserSignupConsumer(amqpWrapper.connection).listen();
    await start(app);
  } catch (e) {
    consola.error("Failed to init app", e);
  }
}

init();