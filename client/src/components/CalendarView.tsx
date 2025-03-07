import { Calendar } from "@/components/ui/calendar";
import { Holiday } from "@shared/schema";
import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { findLongWeekends } from "@/lib/utils/date";

interface CalendarViewProps {
  holidays: Holiday[];
}

export function CalendarView({ holidays }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const longWeekends = findLongWeekends(holidays);

  const holidayDates = holidays.map(h => new Date(h.date));
  const longWeekendDates = longWeekends.flatMap(weekend => {
    const dates: Date[] = [];
    let current = weekend.startDate;
    while (current <= weekend.endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  // Find holiday or long weekend info for selected date
  const selectedDateInfo = selectedDate && {
    holiday: holidays.find(h => 
      format(new Date(h.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    ),
    longWeekend: longWeekends.find(w => 
      selectedDate >= w.startDate && selectedDate <= w.endDate
    )
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar View</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              holiday: holidayDates,
              longWeekend: longWeekendDates
            }}
            modifiersStyles={{
              holiday: { backgroundColor: 'hsl(var(--primary))', color: 'white' },
              longWeekend: { backgroundColor: 'hsl(var(--secondary))', color: 'white' }
            }}
          />
        </div>
        <div className="flex-1">
          {selectedDateInfo?.holiday && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Holiday</h3>
              <Badge variant="default">{selectedDateInfo.holiday.name}</Badge>
            </div>
          )}
          {selectedDateInfo?.longWeekend && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Long Weekend</h3>
              <p className="text-sm text-muted-foreground">
                {format(selectedDateInfo.longWeekend.startDate, 'MMM d')} - {format(selectedDateInfo.longWeekend.endDate, 'MMM d, yyyy')}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDateInfo.longWeekend.totalDays} days long weekend
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
