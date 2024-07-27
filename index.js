const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const filename = "color_palette.json"; // Change this :3

const name = path.parse(filename).name;
const colorPalette = Object.values(JSON.parse(fs.readFileSync(filename, "utf8")));
const png = new PNG({ width: colorPalette.length, height: 1 });
let pos = 0;
for (const colors of colorPalette) {
  const [r, g, b] = colors;
  png.data[pos++] = r;
  png.data[pos++] = g;
  png.data[pos++] = b;
  png.data[pos++] = 0xff;
}
png.pack().pipe(fs.createWriteStream(`${name}.png`));
