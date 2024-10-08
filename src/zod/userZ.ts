import { z } from "zod";

const getUserZ = z
  .object({
    userId: z.number().or(z.nan().transform(() => undefined)),
  })
  .optional();

const editUserZ = z.object({
  id: z.number(),
  name: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
});

const editUserImageZ = z.object({
  image: z.string(),
});

export { editUserZ, editUserImageZ, getUserZ };
