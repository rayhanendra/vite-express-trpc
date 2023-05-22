import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './context';

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5173' }));

app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));

app.listen(3000);

export type AppRouter = typeof appRouter;
