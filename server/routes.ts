import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  app.get("/api/holidays/:year/:country", async (req, res) => {
    const year = parseInt(req.params.year);
    const country = req.params.country.toUpperCase();

    if (isNaN(year) || year < 2020 || year > 2030) {
      return res.status(400).json({ message: "Invalid year. Must be between 2020 and 2030" });
    }

    if (!country) {
      return res.status(400).json({ message: "Country code is required" });
    }

    const holidays = await storage.getHolidaysByYearAndCountry(year, country);
    res.json(holidays);
  });

  return createServer(app);
}