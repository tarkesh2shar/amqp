import { Queues }              from "../types/queues";
import { Channel, Connection } from "amqplib";
import consola                 from "consola";

interface Event {
  queue: Queues;
  data: any;
}

export abstract class BaseProducer<T extends Event> {
  abstract queue: T["queue"];

  private connection: Connection;
  protected channel: Channel | undefined;

  constructor(connection: Connection) {
    this.connection = connection;
    // this.init();
  }

  async init() {
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true }); // ensure queue isn't deleted when serve restarts
  }

  async sendToQueue(data: T["data"]) {
    await this.init();

    this.ensureChannelIsInitialized();

    this.channel!.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)), {
      persistent: true
    });
    consola.success("Done sent to queue");
  }

  ensureChannelIsInitialized() {
    if (!this.channel) {
      throw new Error("Channel is not initialized!");
    }
  }

  close() {
    setTimeout(async () => {
      await this.connection.close();
    }, 500);
  }
}