import kafka from "./client.ts";

export const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
}
