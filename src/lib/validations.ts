import { z } from 'zod';

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Ism-familiya kamida 2 ta belgidan iborat bo'lishi kerak" })
    .max(60, { message: "Ism-familiya 60 ta belgidan oshmasligi kerak" }),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?[0-9\s\-()]{9,25})$/, {
      message: "To'g'ri telefon raqamini kiriting (masalan: +998 90 123 45 67)",
    })
    .refine((val) => {
      // Must contain at least 7 digits
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length >= 7;
    }, {
      message: "Telefon raqami kamida 7 ta raqamdan iborat bo'lishi kerak",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Yaroqli elektron pochta manzilini kiriting" }),
  carId: z
    .string()
    .min(1, { message: "Iltimos, avtomobil modelini tanlang" }),
  preferredDate: z
    .string()
    .min(1, { message: "Iltimos, qulay sanani tanlang" }),
  dealership: z
    .string()
    .min(1, { message: "Iltimos, dilerlik markazini tanlang" }),
  notes: z
    .string()
    .max(300, { message: "Izoh 300 ta belgidan oshmasligi kerak" })
    .optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
