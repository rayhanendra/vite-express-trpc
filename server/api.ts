import express from 'express';
import cors from 'cors';

import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const t = initTRPC.create();

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return 'hi!';
  }),
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === 'string') return v;

      throw new Error('Expected string');
    })
    .mutation((req) => {
      console.log('client', req.input);
      return true;
    }),
});

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5173' }));

app.use('/trpc', createExpressMiddleware({ router: appRouter }));

app.listen(3000);

export type AppRouter = typeof appRouter;
