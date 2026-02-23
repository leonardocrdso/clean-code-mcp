import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PRINCIPLES, filterByCategory } from "../data/principles.js";
import { CATEGORIES, isValidCategory } from "../data/categories.js";
import { formatPrincipleList, formatCatalogGrouped } from "../formatters/principle-formatter.js";

export function registerListPrinciplesTool(server: McpServer) {
  server.registerTool(
    "list-principles",
    {
      description:
        "List Clean Code principles, optionally filtered by category. " +
        "Without a category, returns the full catalog grouped by topic.",
      inputSchema: {
        category: z
          .string()
          .optional()
          .describe(
            `Category to filter by. Valid categories: ${CATEGORIES.join(", ")}`,
          ),
      },
    },
    async ({ category }) => {
      if (category && !isValidCategory(category)) {
        return {
          content: [
            {
              type: "text",
              text: `Invalid category "${category}". Valid categories: ${CATEGORIES.join(", ")}`,
            },
          ],
        };
      }

      if (category) {
        const filtered = filterByCategory(category);
        return {
          content: [{ type: "text", text: formatPrincipleList(filtered) }],
        };
      }

      return {
        content: [{ type: "text", text: formatCatalogGrouped(PRINCIPLES) }],
      };
    },
  );
}
