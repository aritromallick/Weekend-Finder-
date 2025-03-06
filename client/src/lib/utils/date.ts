import { Holiday } from "@shared/schema";
import { isWeekend, addDays, format } from "date-fns";

export interface LongWeekend {
  startDate: Date;
  endDate: Date;
  holidays: Holiday[];
  totalDays: number;
}

export function findLongWeekends(holidays: Holiday[]): LongWeekend[] {
  const longWeekends: LongWeekend[] = [];

  for (const holiday of holidays) {
    const date = new Date(holiday.date);
    let startDate = date;
    let endDate = date;
    const connectedHolidays = [holiday];

    // Check if the holiday creates a long weekend
    // For Friday holidays
    if (date.getDay() === 5) {
      endDate = addDays(date, 2);
    }
    // For Monday holidays
    else if (date.getDay() === 1) {
      startDate = addDays(date, -2);
    }
    // For Tuesday holidays
    else if (date.getDay() === 2) {
      startDate = addDays(date, -3);
      connectedHolidays.push(
        ...holidays.filter(h => 
          format(new Date(h.date), 'yyyy-MM-dd') === format(addDays(date, -1), 'yyyy-MM-dd')
        )
      );
    }
    // For Thursday holidays
    else if (date.getDay() === 4) {
      endDate = addDays(date, 3);
      connectedHolidays.push(
        ...holidays.filter(h => 
          format(new Date(h.date), 'yyyy-MM-dd') === format(addDays(date, 1), 'yyyy-MM-dd')
        )
      );
    }

    // Only add if it creates a long weekend (3 or more days)
    const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (totalDays >= 3) {
      longWeekends.push({
        startDate,
        endDate,
        holidays: connectedHolidays,
        totalDays
      });
    }
  }

  return longWeekends;
}
