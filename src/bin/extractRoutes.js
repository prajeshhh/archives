#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (!args[0]) {
  console.error("provide a path to routes file");
  process.exit(1);
}

const p = path.resolve(args[0]);

fs.readFileSync(p, "utf-8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l.startsWith("app"))
  .map((l) => {
    const match = l.match(/'([^']+)'/);
    return match ? match[1] : null;
  })
  .map((l) => {
    console.log(l);
  });
