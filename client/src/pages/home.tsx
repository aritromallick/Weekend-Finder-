import { useQuery } from "@tanstack/react-query";
import { YearSelector } from "@/components/YearSelector";
import { CountrySelector } from "@/components/CountrySelector";
import { HolidayTable } from "@/components/HolidayTable";
import { useState } from "react";
import type { Holiday } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState("IN");

  const { data: holidays, isLoading } = useQuery<Holiday[]>({
    queryKey: [`/api/holidays/${selectedYear}/${selectedCountry}`],
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Long Weekend Finder
              </CardTitle>
              <CardDescription>
                Discover long weekends and plan your holidays for the year
              </CardDescription>
            </div>
            <div className="flex gap-4">
              <CountrySelector
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
              />
              <YearSelector
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : holidays ? (
            <HolidayTable holidays={holidays} />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}