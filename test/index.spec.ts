const fs = require("fs");
const path = require("path");
const { BurpParser } = require("../src/index");

const xml = fs.readFileSync(path.join(__dirname, "__testdata__", "scan.xml"));
const shortXml = fs.readFileSync(
  path.join(__dirname, "__testdata__", "short-scan.xml")
);
const shortXmlBase64 = fs.readFileSync(
  path.join(__dirname, "__testdata__", "short-scan-base64.xml")
);
const xmlBase64 = fs.readFileSync(
  path.join(__dirname, "__testdata__", "scan-base64.xml")
);

describe("BurpParser", () => {
  it("Should return a list of issues", () => {
    const issues = BurpParser(xml);

    expect(issues.length).toBe(172);
  });

  it("Should have all properties", () => {
    const issues = BurpParser(shortXml);

    const [firstIssue] = issues;

    expect(firstIssue).toHaveProperty("serialNumber");
    expect(firstIssue).toHaveProperty("name");
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

  it("Should decode requests and responses by default if they are base64 encoded", () => {
    const issues = BurpParser(shortXmlBase64);

    const [firstIssue] = issues;

    expect(JSON.stringify(firstIssue.requestresponse)).toStrictEqual(
      '[{"request":"GET / HTTP/1.1\\r\\nHost: dwa.turingpoint.de\\r\\nUpgrade-Insecure-Requests: 1\\r\\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\\r\\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\\r\\nAccept-Encoding: gzip, deflate\\r\\nAccept-Language: en-US,en;q=0.9\\r\\nConnection: close\\r\\n\\r\\n","response":"HTTP/1.1 302 Found\\r\\nServer: nginx\\r\\nDate: Fri, 05 Mar 2021 09:36:36 GMT\\r\\nContent-Type: text/html; charset=UTF-8\\r\\nContent-Length: 0\\r\\nConnection: close\\r\\nSet-Cookie: PHPSESSID=l0e3p4hh9m0dkfqru1lobnghp1; path=/\\r\\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\\r\\nCache-Control: no-store, no-cache, must-revalidate\\r\\nPragma: no-cache\\r\\nSet-Cookie: PHPSESSID=l0e3p4hh9m0dkfqru1lobnghp1; path=/\\r\\nSet-Cookie: security=low\\r\\nLocation: login.php\\r\\n\\r\\n","responseRedirected":false}]'
    );
  });

  it("Should not decode requests and responses if they are base64 encoded when the flag is set to false", () => {
    const issues = BurpParser(shortXmlBase64, false);

    const [firstIssue] = issues;

    expect(JSON.stringify(firstIssue.requestresponse)).toStrictEqual(
      '[{"request":"R0VUIC8gSFRUUC8xLjENCkhvc3Q6IGR3YS50dXJpbmdwb2ludC5kZQ0KVXBncmFkZS1JbnNlY3VyZS1SZXF1ZXN0czogMQ0KVXNlci1BZ2VudDogTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg3LjAuNDI4MC44OCBTYWZhcmkvNTM3LjM2DQpBY2NlcHQ6IHRleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwsYXBwbGljYXRpb24veG1sO3E9MC45LGltYWdlL2F2aWYsaW1hZ2Uvd2VicCxpbWFnZS9hcG5nLCovKjtxPTAuOCxhcHBsaWNhdGlvbi9zaWduZWQtZXhjaGFuZ2U7dj1iMztxPTAuOQ0KQWNjZXB0LUVuY29kaW5nOiBnemlwLCBkZWZsYXRlDQpBY2NlcHQtTGFuZ3VhZ2U6IGVuLVVTLGVuO3E9MC45DQpDb25uZWN0aW9uOiBjbG9zZQ0KDQo=","response":"SFRUUC8xLjEgMzAyIEZvdW5kDQpTZXJ2ZXI6IG5naW54DQpEYXRlOiBGcmksIDA1IE1hciAyMDIxIDA5OjM2OjM2IEdNVA0KQ29udGVudC1UeXBlOiB0ZXh0L2h0bWw7IGNoYXJzZXQ9VVRGLTgNCkNvbnRlbnQtTGVuZ3RoOiAwDQpDb25uZWN0aW9uOiBjbG9zZQ0KU2V0LUNvb2tpZTogUEhQU0VTU0lEPWwwZTNwNGhoOW0wZGtmcXJ1MWxvYm5naHAxOyBwYXRoPS8NCkV4cGlyZXM6IFRodSwgMTkgTm92IDE5ODEgMDg6NTI6MDAgR01UDQpDYWNoZS1Db250cm9sOiBuby1zdG9yZSwgbm8tY2FjaGUsIG11c3QtcmV2YWxpZGF0ZQ0KUHJhZ21hOiBuby1jYWNoZQ0KU2V0LUNvb2tpZTogUEhQU0VTU0lEPWwwZTNwNGhoOW0wZGtmcXJ1MWxvYm5naHAxOyBwYXRoPS8NClNldC1Db29raWU6IHNlY3VyaXR5PWxvdw0KTG9jYXRpb246IGxvZ2luLnBocA0KDQo=","responseRedirected":false}]'
    );
  });

  it("Should decode large xml file", () => {
    const issues = BurpParser(xmlBase64);

    expect(issues.length).toBe(172);
  });
});
