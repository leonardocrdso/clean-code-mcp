#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearchPrincipleTool } from "./tools/search-principle.js";
import { registerSearchByContextTool } from "./tools/search-by-context.js";
import { registerListPrinciplesTool } from "./tools/list-principles.js";
import { registerCatalogResources } from "./resources/catalog.js";
import { registerCodeReviewPrompt } from "./prompts/code-review.js";

const server = new McpServer({
  name: "clean-code-mcp",
  version: "1.0.0",
});

registerSearchPrincipleTool(server);
registerSearchByContextTool(server);
registerListPrinciplesTool(server);
registerCatalogResources(server);
registerCodeReviewPrompt(server);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Clean Code MCP server running on stdio");
