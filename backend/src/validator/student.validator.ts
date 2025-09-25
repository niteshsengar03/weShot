import { z } from "zod";

export const studentSchema = z.object({
  regNo: z.string().min(9, "Username too short").max(10, "Username too long"),
  email: z.string().email("Invalid email address"),
  name: z.string(),
});
