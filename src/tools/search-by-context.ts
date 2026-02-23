import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PRINCIPLES } from "../data/principles.js";
import { tokenize, removeStopWords, detectCategoryBoosts } from "../search/tokenizer.js";
import { scorePrincipleByTokens, rankPrinciples } from "../search/scoring.js";
import { formatPrincipleAsMarkdown, formatPrincipleList } from "../formatters/principle-formatter.js";

const MAX_DETAILED_RESULTS = 3;
const MAX_TOTAL_RESULTS = 8;

export function registerSearchByContextTool(server: McpServer) {
  server.registerTool(
    "search-by-context",
    {
      description:
        "Find relevant Clean Code principles for a given situation or problem description. " +
        "Describe what you're dealing with in natural language (e.g. 'my function has too many parameters and is hard to test').",
      inputSchema: {
        context: z
          .string()
          .describe("Description of the coding situation, problem, or question in natural language"),
      },
    },
    async ({ context }) => {
      const tokens = removeStopWords(tokenize(context));
      const categoryBoosts = detectCategoryBoosts(tokens);

      const ranked = rankPrinciples(PRINCIPLES, (principle) =>
        scorePrincipleByTokens(principle, tokens, categoryBoosts),
      );

      if (ranked.length === 0) {
        return {
          content: [{ type: "text", text: `No principles found matching that context.` }],
        };
      }

      const detailed = ranked.slice(0, MAX_DETAILED_RESULTS);
      const remaining = ranked.slice(MAX_DETAILED_RESULTS, MAX_TOTAL_RESULTS);

      const parts = detailed.map(formatPrincipleAsMarkdown);

      if (remaining.length > 0) {
        parts.push("\n---\n### Also relevant\n" + formatPrincipleList(remaining));
      }

      return {
        content: [{ type: "text", text: parts.join("\n\n---\n\n") }],
      };
    },
  );
}
