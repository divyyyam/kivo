export const TOPICS = {
  WORKER_EVENTS: "worker.events",
} as const;

export type Topic = (typeof TOPICS)[keyof typeof TOPICS];
