import { Holiday } from "@shared/schema";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { findLongWeekends } from "@/lib/utils/date";
import { CalendarDays, Calendar } from "lucide-react";

interface TimelineViewProps {
  holidays: Holiday[];
}

export function TimelineView({ holidays }: TimelineViewProps) {
  const longWeekends = findLongWeekends(holidays);
  
  // Combine holidays and long weekends into a single timeline
  const timelineEvents = [
    ...holidays.map(h => ({
      type: 'holiday' as const,
      date: new Date(h.date),
      data: h
    })),
    ...longWeekends.map(w => ({
      type: 'longWeekend' as const,
      date: w.startDate,
      data: w
    }))
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative flex gap-4 pl-8">
                {/* Timeline dot */}
                <div className="absolute left-[14px] w-2 h-2 rounded-full bg-primary" />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {event.type === 'holiday' ? (
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {format(event.date, 'MMMM d, yyyy')}
                    </span>
                  </div>

                  {event.type === 'holiday' && (
                    <div>
                      <Badge variant="default">{event.data.name}</Badge>
                    </div>
                  )}

                  {event.type === 'longWeekend' && (
                    <div>
                      <Badge variant="secondary">
                        {event.data.totalDays} days long weekend
                      </Badge>
                      <p className="text-sm mt-1">
                        {format(event.data.startDate, 'MMM d')} - {format(event.data.endDate, 'MMM d')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
