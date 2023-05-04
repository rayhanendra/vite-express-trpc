import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../server/api';

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
});

async function main() {
  // const result = await client.sayHi.query();

  const result = await client.logToServer.mutate('hello from client');
  console.log(result);
}

main();
