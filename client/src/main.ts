import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import { AppRouter } from '../../server/api';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers: {
        Authorization: 'Bearer 123',
      },
    }),
  ],
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
  const result = await client.secretData.query();
  console.log(result);
}

main();
