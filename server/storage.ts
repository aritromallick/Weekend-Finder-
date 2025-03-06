import { holidays, type Holiday, type InsertHoliday } from "@shared/schema";
import { addYears, subYears, format, eachYearOfInterval } from "date-fns";
import { STATIC_HOLIDAYS } from "@shared/schema";

export interface IStorage {
  getHolidaysByYearAndCountry(year: number, country: string): Promise<Holiday[]>;
}

export class MemStorage implements IStorage {
  private holidays: Map<string, Holiday[]>;
  private currentId: number;

  constructor() {
    this.holidays = new Map();
    this.currentId = 1;
    this.initializeHolidays();
  }

  private initializeHolidays() {
    // Get a range of years from 2020 to 2030
    const years = eachYearOfInterval({
      start: new Date(2020, 0, 1),
      end: new Date(2030, 11, 31)
    }).map(date => date.getFullYear());

    // Initialize with static data for 2024 India
    const holidays2024 = STATIC_HOLIDAYS.map((holiday) => ({
      ...holiday,
      id: this.currentId++
    }));

    // Store 2024 holidays
    this.holidays.set('2024_IN', holidays2024);

    // Generate holidays for other years by adjusting dates
    years.forEach(year => {
      if (year !== 2024) {
        const yearDiff = year - 2024;
        const yearHolidays = holidays2024.map(h => ({
          ...h,
          id: this.currentId++,
          date: format(addYears(new Date(h.date), yearDiff), 'yyyy-MM-dd')
        }));
        this.holidays.set(`${year}_IN`, yearHolidays);
      }
    });
  }

  async getHolidaysByYearAndCountry(year: number, country: string): Promise<Holiday[]> {
    return this.holidays.get(`${year}_${country}`) || [];
  }
}

export const storage = new MemStorage();