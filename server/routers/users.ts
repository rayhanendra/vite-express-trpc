import { t } from '../trpc';
import { z } from 'zod';

const userProcedure = t.procedure.input(
  z.object({
    userId: z.string(),
  })
);

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => {
    return {
      id: input.userId,
      name: 'John Doe',
    };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      console.log(
        'Updating user ',
        req.input.userId,
        ' to have name ',
        req.input.name
      );

      return {
        id: req.input.userId,
        name: req.input.name,
      };
    }),
});
