import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server';
import { createContext } from './context';
import { TRPC_ERROR_CODES_BY_KEY } from '@trpc/server/rpc';

export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      user: {
        id: '123',
        name: 'John Doe',
      },
    },
  });
});

export const adminProcedure = t.procedure.use(isAdminMiddleware);
