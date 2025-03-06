import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  return (
    <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2023">2023</SelectItem>
        <SelectItem value="2024">2024</SelectItem>
        <SelectItem value="2025">2025</SelectItem>
      </SelectContent>
    </Select>
  );
}
