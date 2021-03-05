const fs = require("fs");
const path = require("path");
const { parse } = require("../src/index");

const xml = fs.readFileSync(path.join(__dirname, "__testdata__", "scan.xml"));
const shortXml = fs.readFileSync(path.join(__dirname, "__testdata__", "short-scan.xml"));

describe("parse", () => {
  it("Should return a list of issues", () => {
    const issues = parse(xml);

    expect(issues.length).toBe(172);
  });

  it("Should have all properties", () => {
    const issues = parse(shortXml);

    const [firstIssue] = issues;

    expect(firstIssue).toHaveProperty("serialNumber");
    expect(firstIssue).toHaveProperty("type");
    expect(firstIssue).toHaveProperty("host");
    expect(firstIssue).toHaveProperty("path");
    expect(firstIssue).toHaveProperty("location");
    expect(firstIssue).toHaveProperty("severity");
    expect(firstIssue).toHaveProperty("confidence");
    expect(firstIssue).toHaveProperty("issueBackground");
    expect(firstIssue).toHaveProperty("remediationBackground");
    expect(firstIssue).toHaveProperty("vulnerabilityClassifications");
    expect(firstIssue).toHaveProperty("issueDetail");
    expect(firstIssue).toHaveProperty("references");
    expect(firstIssue).toHaveProperty("requestresponse");

    console.log(firstIssue)
  });
});
