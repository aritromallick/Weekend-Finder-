import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  app.get("/api/holidays/:year", async (req, res) => {
    const year = parseInt(req.params.year);
    
    if (isNaN(year) || year < 2023 || year > 2025) {
      return res.status(400).json({ message: "Invalid year. Must be between 2023 and 2025" });
    }

    const holidays = await storage.getHolidaysByYear(year);
    res.json(holidays);
  });

  return createServer(app);
}
