import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderTemplate(templateName, data) {
  const filePath = path.join(__dirname, "..", "templates", `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, "utf-8");
  const template = handlebars.compile(source);
  return template(data);
}