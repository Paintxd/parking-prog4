import { connect, Channel } from 'amqplib';

export const rabbitmqConnection = async (exchange: string): Promise<Channel> => {
  const conection = await connect(process.env.BROKER_URL);
  const channel = await conection.createChannel();

  channel.assertExchange(exchange, 'direct', {
    durable: true,
  });

  return channel;
}
