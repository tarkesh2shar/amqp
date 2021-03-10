import { Channel, Connection, ConsumeMessage } from "amqplib";
import consola                                 from "consola";
import { Queues }                              from "../types/queues";

interface Event {
  queue: Queues;
  data: any;
}

export abstract class BaseConsumer<T extends Event> {
  abstract queue: T["queue"];

  abstract onMessage(data: T["data"], message: ConsumeMessage): void;

  private connection: Connection;
  protected channel: Channel | undefined;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async listen() {
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });

    // Only request 1 unacked message from queue
    // This value indicates how many messages we want to process in parallel
    await this.channel.prefetch(1);
    consola.info(`[${ this.queue }] Listening for messages!`);

    await this.channel.consume(this.queue, (message: ConsumeMessage | null) => {
      if (!message) {
        consola.warn("No message");
        return;
      }

      consola.success(`Message received from ${ this.queue } queue`);

      const data = this.parseMessage(message!);
      this.onMessage(data, message);
    }, { noAck: false });
  }

  parseMessage(message: ConsumeMessage) {
    return JSON.parse(message.content.toString());
  }

  ensureChannelIsInitialized() {
    if (!this.channel) {
      throw new Error("Channel is not initialized!");
    }
  }
}
