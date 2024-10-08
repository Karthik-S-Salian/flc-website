import { addOrganiserZ, removeOrganiserZ } from "~/zod/organiserZ";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const organiserRouter = createTRPCRouter({
  addOrganiser: adminProcedure
    .input(addOrganiserZ)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.organiser.create({
        data: {
          userId: input.userId,
          eventId: input.eventId,
        },
      });
    }),

  removeOrganiser: adminProcedure
    .input(removeOrganiserZ)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.organiser.delete({
        where: {
          id: input.organiserId,
        },
      });
    }),
});
