const fs = require("fs");
const path = require("path");
const parser = require("../index");

const xml = fs.readFileSync(path.join(__dirname, "__testdata__", "fullScan.xml"));

describe("parse", () => {
  it("Should return a list of issues", () => {
    const issues = parser(xml);
    expect(issues.length).toBe(15);
  });
});
