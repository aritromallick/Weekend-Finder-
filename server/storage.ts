import { holidays, type Holiday, type InsertHoliday } from "@shared/schema";
import { addYears, subYears, format } from "date-fns";
import { STATIC_HOLIDAYS } from "@shared/schema";

export interface IStorage {
  getHolidaysByYear(year: number): Promise<Holiday[]>;
}

export class MemStorage implements IStorage {
  private holidays: Map<number, Holiday[]>;
  private currentId: number;

  constructor() {
    this.holidays = new Map();
    this.currentId = 1;
    this.initializeHolidays();
  }

  private initializeHolidays() {
    // Initialize with static data for 2024
    const holidays2024 = STATIC_HOLIDAYS.map((holiday) => ({
      ...holiday,
      id: this.currentId++
    }));
    this.holidays.set(2024, holidays2024);

    // Generate holidays for 2023 and 2025 by adjusting dates
    const holidays2023 = holidays2024.map(h => ({
      ...h,
      id: this.currentId++,
      date: format(subYears(new Date(h.date), 1), 'yyyy-MM-dd')
    }));
    const holidays2025 = holidays2024.map(h => ({
      ...h,
      id: this.currentId++,
      date: format(addYears(new Date(h.date), 1), 'yyyy-MM-dd')
    }));

    this.holidays.set(2023, holidays2023);
    this.holidays.set(2025, holidays2025);
  }

  async getHolidaysByYear(year: number): Promise<Holiday[]> {
    return this.holidays.get(year) || [];
  }
}

export const storage = new MemStorage();