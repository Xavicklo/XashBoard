// Safari/iOS only parses ISO date strings ("2022-07-01"). Anything else, such as
// "2022, 7, 1", becomes Invalid Date there and crashed the dashboard on iPhones,
// while desktop Chrome hid the bug. Keep every date string in the data ISO.
const fs = require("fs");
const path = require("path");

test("all date strings in the chart data are ISO", () => {
  const src = fs.readFileSync(path.join(__dirname, "data/dummy.js"), "utf8");
  const nonIso = (src.match(/new Date\("[^"]*"\)/g) || []).filter(
    (d) => !/^new Date\("\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?"\)$/.test(d)
  );
  expect(nonIso).toEqual([]);
});
