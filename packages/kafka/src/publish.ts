import { producer } from "./producer";

export async function publish<T>(topic: string, key: string, value: T) {
  await producer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(value),
      },
    ],
  });
}
