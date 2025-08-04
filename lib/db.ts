// my-backend/lib/db.ts
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Octopus2011@",
  database: "PanelyticsSchema",
});
