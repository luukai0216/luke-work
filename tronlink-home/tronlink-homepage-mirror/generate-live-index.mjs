import fs from "node:fs";
import path from "node:path";

const BASE_ORIGIN = "https://www.tronlink.org";
const inputPath = process.argv[2] || "/tmp/tronlink-home.html";
const outputPath = process.argv[3] || path.join(process.cwd(), "index.html");

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

let html = fs.readFileSync(inputPath, "utf8");

const absolutize = (value) => {
  if (!value) return value;
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("javascript:") ||
    value.startsWith("data:") ||
    value.startsWith("#") ||
    value.startsWith("<%")
  ) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  const clean = value.startsWith("./") ? value.slice(2) : value;
  const normalized = clean.startsWith("/") ? clean : `/${clean}`;
  return `${BASE_ORIGIN}${normalized}`;
};

html = html.replace(
  /\b(?:src|href)=("([^"]*)"|'([^']*)')/gi,
  (match, quoted, doubleValue, singleValue) => {
    const value = doubleValue ?? singleValue ?? "";
    const absolute = absolutize(value);
    const quote = quoted.startsWith("'") ? "'" : '"';
    const attr = match.startsWith("src=") ? "src" : "href";
    return `${attr}=${quote}${absolute}${quote}`;
  }
);

fs.writeFileSync(outputPath, html, "utf8");
console.log(`Generated live mirror index: ${outputPath}`);
