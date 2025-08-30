import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const regions = [
 "Bengaluru",
  "Chikkamagaluru",
  "Mysuru",
  "Mangalore",
  "Hyderabad",
  "Chennai",
  "Delhi",
  "Mumbai",
  "Kolkata",
];

const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Region: React.FC = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState<string>("");

  const handleChange = (value: string) => {
    setRegion(value);
    navigate(`/employee-login/${toSlug(value)}`);
  };

  return (
    <Card className="max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle>Select your region</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handleChange} value={region}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default Region;
