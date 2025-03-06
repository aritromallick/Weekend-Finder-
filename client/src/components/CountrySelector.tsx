import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  return (
    <Select value={selectedCountry} onValueChange={onCountryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="IN">India</SelectItem>
        <SelectItem value="US">United States</SelectItem>
        <SelectItem value="UK">United Kingdom</SelectItem>
        {/* Add more countries as needed */}
      </SelectContent>
    </Select>
  );
}
