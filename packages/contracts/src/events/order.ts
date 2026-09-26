export interface OrderCreatedEvent {
  type: "order.created";
  version: 1;
  data: {
    orderId: string;
    userId: string;
    total: number;
    currency: string;
  };
  occuredAt: string;
}

//contracts help in keeping kafka predictable as we can create multiple contracts (interfaces) for different situations
