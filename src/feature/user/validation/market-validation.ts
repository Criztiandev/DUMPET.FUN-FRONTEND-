import { z } from "zod";

// Calculate the date constraints
const currentDate = new Date();
const minDate = new Date(currentDate);
const maxDate = new Date(currentDate);

// Setting the minimum date to 1 day from now
minDate.setDate(minDate.getDate());

// Setting the maximum date to 90 days from now
maxDate.setDate(maxDate.getDate() + 90);

// Zod validation schema
export const createMarketValidation = z.object({
  Title: z
    .string()
    .min(8, { message: "Title is too short" })
    .max(64, { message: "Title is too long" }),
  date: z
    .date()
    .min(minDate, {
      message: `Date must be at least 1 day from today (${minDate.toDateString()})`,
    })
    .max(maxDate, {
      message: `Date must be within 90 days from today (${maxDate.toDateString()})`,
    }),
  time: z
    .string()
    .min(1, { message: "Time is too short" })
    .max(24, { message: "Time is too long" }),
  TokenTxId: z
    .string()
    .min(8, { message: "TokenTxId is too short" })
    .max(64, { message: "TokenTxId is too long" }),
  OptionA: z
    .string()
    .min(3, { message: "Option A is too short" })
    .max(64, { message: "Option A is too long" }),
  OptionB: z
    .string()
    .min(3, { message: "Option B is too short" })
    .max(64, { message: "Option B is too long" }),
});

export const createmarketValidationMutation = createMarketValidation
  .pick({
    Title: true,
    TokenTxId: true,
    OptionA: true,
    OptionB: true,
  })
  .extend({
    Duration: z
      .string()
      .min(1, "Duration is too short")
      .max(32, "Duration is too long"),
  });
