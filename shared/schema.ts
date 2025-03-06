import { pgTable, text, serial, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const holidays = pgTable("holidays", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: date("date").notNull(),
  isNationalHoliday: text("is_national_holiday").notNull(),
});

export const insertHolidaySchema = createInsertSchema(holidays).pick({
  name: true,
  date: true,
  isNationalHoliday: true,
});

export type InsertHoliday = z.infer<typeof insertHolidaySchema>;
export type Holiday = typeof holidays.$inferSelect;

// Static holiday data for 2024
export const STATIC_HOLIDAYS: InsertHoliday[] = [
  { name: "New Year's Day", date: new Date("2024-01-01"), isNationalHoliday: "true" },
  { name: "Martin Luther King Jr. Day", date: new Date("2024-01-15"), isNationalHoliday: "true" },
  { name: "Presidents' Day", date: new Date("2024-02-19"), isNationalHoliday: "true" },
  { name: "Memorial Day", date: new Date("2024-05-27"), isNationalHoliday: "true" },
  { name: "Independence Day", date: new Date("2024-07-04"), isNationalHoliday: "true" },
  { name: "Labor Day", date: new Date("2024-09-02"), isNationalHoliday: "true" },
  { name: "Columbus Day", date: new Date("2024-10-14"), isNationalHoliday: "true" },
  { name: "Veterans Day", date: new Date("2024-11-11"), isNationalHoliday: "true" },
  { name: "Thanksgiving Day", date: new Date("2024-11-28"), isNationalHoliday: "true" },
  { name: "Christmas Day", date: new Date("2024-12-25"), isNationalHoliday: "true" }
];
