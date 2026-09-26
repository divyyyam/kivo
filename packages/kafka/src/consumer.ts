import { kafka } from "./client";
import { Consumer } from "kafkajs";
export async function createConsumer(groupId: string): Promsie<Consumer> {
  const consumer = kafka.consumer({
    groupId,
  });
  await consumer.connect();
  return consumer;
}
