import {z} from 'zod'

export const registerPayloadModal = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50).optional(),
  email: z.email(),
  password: z.string().min(8),
});

export const loginPayloadModal = z.object({
  email: z.email(),
  password: z.string(),
});