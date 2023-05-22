import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    // 👇 add your context properties here
    // db: await connectToDatabase(),
    req,
    res,
    isAdmin: true,

    // 👇 add your custom error handling here
  };
}
