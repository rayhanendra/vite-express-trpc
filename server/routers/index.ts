import { t } from '../trpc';

export const appRouter = t.router({
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
