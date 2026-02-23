import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PRINCIPLES } from "../data/principles.js";
import { scorePrincipleByQuery, rankPrinciples } from "../search/scoring.js";
import { formatPrincipleAsMarkdown, formatPrincipleList } from "../formatters/principle-formatter.js";

const MAX_DETAILED_RESULTS = 3;
const MAX_TOTAL_RESULTS = 10;

export function registerSearchPrincipleTool(server: McpServer) {
  server.registerTool(
    "search-principle",
    {
      description:
        "Search Clean Code principles by name, keyword, or ID. " +
        "Returns detailed results for top matches and a summary list for additional matches.",
      inputSchema: {
        query: z
          .string()
          .describe("Search term: principle name, keyword, tag, or ID (e.g. 'srp', 'naming', 'keep-functions-small')"),
      },
    },
    async ({ query }) => {
      const ranked = rankPrinciples(PRINCIPLES, (principle) =>
        scorePrincipleByQuery(principle, query),
      );

      if (ranked.length === 0) {
        return {
          content: [{ type: "text", text: `No principles found for "${query}".` }],
        };
      }

      const detailed = ranked.slice(0, MAX_DETAILED_RESULTS);
      const remaining = ranked.slice(MAX_DETAILED_RESULTS, MAX_TOTAL_RESULTS);

      const parts = detailed.map(formatPrincipleAsMarkdown);

      if (remaining.length > 0) {
        parts.push("\n---\n### Other matches\n" + formatPrincipleList(remaining));
      }

      return {
        content: [{ type: "text", text: parts.join("\n\n---\n\n") }],
      };
    },
  );
}
