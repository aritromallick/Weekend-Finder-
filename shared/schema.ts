import { pgTable, text, serial, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const holidays = pgTable("holidays", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: date("date").notNull(),
  isNationalHoliday: text("is_national_holiday").notNull(),
  country: text("country").notNull(),
});

export const insertHolidaySchema = createInsertSchema(holidays).pick({
  name: true,
  date: true,
  isNationalHoliday: true,
  country: true,
});

export type InsertHoliday = z.infer<typeof insertHolidaySchema>;
export type Holiday = typeof holidays.$inferSelect;

// Static holiday data for India 2024
export const STATIC_HOLIDAYS: InsertHoliday[] = [
  { name: "New Year's Day", date: "2024-01-01", isNationalHoliday: "true", country: "IN" },
  { name: "Republic Day", date: "2024-01-26", isNationalHoliday: "true", country: "IN" },
  { name: "Holi", date: "2024-03-25", isNationalHoliday: "true", country: "IN" },
  { name: "Good Friday", date: "2024-03-29", isNationalHoliday: "true", country: "IN" },
  { name: "Ramzan", date: "2024-04-11", isNationalHoliday: "true", country: "IN" },
  { name: "Maharashtra Day", date: "2024-05-01", isNationalHoliday: "true", country: "IN" },
  { name: "Independence Day", date: "2024-08-15", isNationalHoliday: "true", country: "IN" },
  { name: "Gandhi Jayanti", date: "2024-10-02", isNationalHoliday: "true", country: "IN" },
  { name: "Dussehra", date: "2024-10-12", isNationalHoliday: "true", country: "IN" },
  { name: "Diwali", date: "2024-11-01", isNationalHoliday: "true", country: "IN" },
  { name: "Christmas", date: "2024-12-25", isNationalHoliday: "true", country: "IN" }
];