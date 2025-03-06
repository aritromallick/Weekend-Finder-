import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Holiday } from "@shared/schema";
import { LongWeekend, findLongWeekends } from "@/lib/utils/date";
import { format } from "date-fns";
import { Calendar, PartyPopper, Briefcase, Sun } from "lucide-react";

interface HolidayTableProps {
  holidays: Holiday[];
}

export function HolidayTable({ holidays }: HolidayTableProps) {
  const longWeekends = findLongWeekends(holidays);

  const isPartOfLongWeekend = (holiday: Holiday): LongWeekend | undefined => {
    return longWeekends.find(lw => 
      lw.holidays.some(h => format(new Date(h.date), 'yyyy-MM-dd') === format(new Date(holiday.date), 'yyyy-MM-dd'))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5" />
            Long Weekends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {longWeekends.map((weekend, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {format(weekend.startDate, 'MMM d')} - {format(weekend.endDate, 'MMM d, yyyy')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {weekend.dayDetails.map((day, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-24">{format(day.date, 'EEE, MMM d')}</span>
                        {day.type === 'holiday' && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <PartyPopper className="h-3 w-3" />
                            {day.holiday?.name}
                          </Badge>
                        )}
                        {day.type === 'weekend' && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Sun className="h-3 w-3" />
                            Weekend
                          </Badge>
                        )}
                        {day.type === 'optional-leave' && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            Optional Leave
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    {weekend.totalDays} days long weekend
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Holidays</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Holiday</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Long Weekend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday) => {
                const longWeekend = isPartOfLongWeekend(holiday);
                return (
                  <TableRow key={holiday.id}>
                    <TableCell>{format(new Date(holiday.date), 'MMMM d, yyyy')}</TableCell>
                    <TableCell>{holiday.name}</TableCell>
                    <TableCell>
                      <Badge variant={holiday.isNationalHoliday === "true" ? "default" : "secondary"}>
                        {holiday.isNationalHoliday === "true" ? "National" : "Regional"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {longWeekend && (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                          {longWeekend.totalDays} days
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}