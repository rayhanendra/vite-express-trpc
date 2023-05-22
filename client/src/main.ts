import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import { AppRouter } from '../../server/api';

const wsClient = createWSClient({
  url: 'ws://localhost:3000/trpc',
});

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: 'http://localhost:3000/trpc',
        headers: {
          Authorization: 'Bearer 123',
        },
      }),
    }),
  ],
});

document.addEventListener('click', () => {
  client.users.update.mutate({
    userId: '123',
    name: 'John Doe',
  });
});

async function main() {
  // const result = await client.sayHi.query();
  // const result = await client.logToServer.mutate('hello from client');
  // const result = await client.users.get.query({ userId: '123' });
  // const result = await client.users.update.mutate({
  //   userId: '123',
  //   name: 'John Doe',
  // });
  // console.log(result);
  // const result = await client.secretData.query();
  // console.log(result);
  const connection = client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log('user updated', id);
    },
  });
  wsClient.close();
}

main();
