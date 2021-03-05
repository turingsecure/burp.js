interface RequestResponse {
  request: string;
  response: string;
  responseRedirected: boolean;
}

interface Issue {
  serialNumber?: string;
  type?: string;
  host?: string;
  path?: string;
  location?: string;
  severity?: string;
  confidence?: string;
  issueBackground?: string;
  remediationBackground?: string;
  vulnerabilityClassifications?: string;
  issueDetail?: string;
  references?: string;
  requestresponse?: RequestResponse[];
}

function findChildNode(nodes: Node[], property: string): Node {
  return nodes.find((childNode: Node) => childNode.nodeName === property);
}

function getTextContent(nodes: Node[], property: string): string | undefined {
  return findChildNode(nodes, property)?.textContent;
}

function parseRequestResponse(nodes: Node[], isBase64Encoded: boolean): RequestResponse[] {
  const requestResponseNodes = nodes.filter(
    (childNode: Node) => childNode.nodeName === "requestresponse"
  );

  const requestResponse = [];

  for (const node of requestResponseNodes) {
    const childNodes: Node[] = [...node.childNodes];

    const responseRequestObject: RequestResponse = {
      request: getTextContent(childNodes, "request"),
      response: getTextContent(childNodes, "response"),
      responseRedirected: getTextContent(childNodes, "responseRedirected") === "true"
    };

    if (isBase64Encoded) {
      responseRequestObject.request = atob(responseRequestObject.request);
      responseRequestObject.response = atob(responseRequestObject.response);
    }

    requestResponse.push(responseRequestObject);
  }

  return requestResponse;
}

function createIssueObject(node: ChildNode, isBase64Encoded: boolean): Issue {
  const childNodes: Node[] = [...node.childNodes];

  const issueObject: Issue = {
    serialNumber: getTextContent(childNodes, "serialNumber"),
    type: getTextContent(childNodes, "type"),
    host: getTextContent(childNodes, "host"),
    path: getTextContent(childNodes, "path"),
    location: getTextContent(childNodes, "location"),
    severity: getTextContent(childNodes, "severity"),
    confidence: getTextContent(childNodes, "confidence"),
    issueBackground: getTextContent(childNodes, "issueBackground"),
    remediationBackground: getTextContent(childNodes, "remediationBackground"),
    vulnerabilityClassifications: getTextContent(childNodes, "vulnerabilityClassifications"),
    issueDetail: getTextContent(childNodes, "issueDetail"),
    references: getTextContent(childNodes, "references"),
    requestresponse: parseRequestResponse(childNodes, isBase64Encoded)
  };

  return issueObject;
}

/**
 *  Parses burp xml output to a javascript object
 *
 * @param xml string
 *
 * @returns Issue[]
 */
export function BurpParser(xml: string): Issue[] {
  // eslint-disable-next-line no-undef
  const parser: DOMParser = new DOMParser();
  const parsed: Document = parser.parseFromString(xml, "application/xml");

  const isBase64Encoded =
    parsed
      .getElementsByTagName("requestresponse")[0]
      .getElementsByTagName("request")[0]
      .getAttribute("base64") === "true";

  // Get right issues node
  const issuesNode: Node = Array.from(parsed.childNodes).find(
    (node) => node.nodeName === "issues" && node.nodeType === 1
  );

  const output: Issue[] = [];

  // issue nodes
  for (const node of issuesNode.childNodes) {
    if (node.nodeName !== "issue") continue;

    output.push(createIssueObject(node, isBase64Encoded));
  }

  return output;
}
