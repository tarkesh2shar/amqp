import amqp, { Connection } from "amqplib";
import consola              from "consola";

class AmqpWrapper {
  private _connection?: Connection;

  get connection() {
    if (!this._connection) {
      throw new Error("Cannot access RabbitMQ before initialization");
    }

    return this._connection;
  }

  async connect() {
    this._connection = await amqp.connect(process.env.AMQP_URL as string);
    consola.success("Connected to RabbitMQ");
  }
}

export const amqpWrapper = new AmqpWrapper();