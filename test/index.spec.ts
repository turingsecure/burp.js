const fs = require("fs");
const path = require("path");
const { parse } = require("../src/index");

const xml = fs.readFileSync(path.join(__dirname, "__testdata__", "scan.xml"));
const shortXml = fs.readFileSync(path.join(__dirname, "__testdata__", "short-scan.xml"));
const shortXmlBase64 = fs.readFileSync(
  path.join(__dirname, "__testdata__", "short-scan-base64.xml")
);

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
  });

  it("Should decode requests and responses if they are base64 encoded", () => {
    const issues = parse(shortXmlBase64);

    const [firstIssue] = issues;

    expect(JSON.stringify(firstIssue.requestresponse)).toStrictEqual(
      '[{"request":"GET / HTTP/1.1\\r\\nHost: dwa.turingpoint.de\\r\\nUpgrade-Insecure-Requests: 1\\r\\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\\r\\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\\r\\nAccept-Encoding: gzip, deflate\\r\\nAccept-Language: en-US,en;q=0.9\\r\\nConnection: close\\r\\n\\r\\n","response":"HTTP/1.1 302 Found\\r\\nServer: nginx\\r\\nDate: Fri, 05 Mar 2021 09:36:36 GMT\\r\\nContent-Type: text/html; charset=UTF-8\\r\\nContent-Length: 0\\r\\nConnection: close\\r\\nSet-Cookie: PHPSESSID=l0e3p4hh9m0dkfqru1lobnghp1; path=/\\r\\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\\r\\nCache-Control: no-store, no-cache, must-revalidate\\r\\nPragma: no-cache\\r\\nSet-Cookie: PHPSESSID=l0e3p4hh9m0dkfqru1lobnghp1; path=/\\r\\nSet-Cookie: security=low\\r\\nLocation: login.php\\r\\n\\r\\n","responseRedirected":false}]'
    );
  });
});
