function getInnerHtmlOfNodeArray(nodes, property) {
  return nodes.find((childNode) => childNode.nodeName === property).innerHTML;
}

function removeCDATA(string) {
  const tmp = string.replace("<![CDATA[", "");
  return tmp.replace("]]>", "");
}

function parse(xml) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(xml, "application/xml");

  const output = [];

  // issue nodes
  for (const node of parsed.childNodes[1].childNodes) {
    if (node.nodeName === "#text") continue;

    const issueObject = {};

    const childNodes = [...node.childNodes];

    issueObject.serialNumber = getInnerHtmlOfNodeArray(childNodes, "serialNumber");

    const locationCDATA = getInnerHtmlOfNodeArray(childNodes, "location");
    issueObject.location =
      childNodes.find((childNode) => childNode.nodeName === "location").baseURI +
      removeCDATA(locationCDATA);

    output.push(issueObject);
  }

  return output;
}

module.exports = parse;
