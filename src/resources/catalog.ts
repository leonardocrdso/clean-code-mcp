import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { PRINCIPLES, findPrincipleById } from "../data/principles.js";
import { CATEGORY_LABELS } from "../data/categories.js";

export function registerCatalogResources(server: McpServer) {
  registerStaticCatalog(server);
  registerPrincipleTemplate(server);
}

function registerStaticCatalog(server: McpServer) {
  server.registerResource(
    "catalog",
    "cleancode://catalog",
    { description: "Full catalog of Clean Code principles grouped by category" },
    async () => ({
      contents: [
        {
          uri: "cleancode://catalog",
          text: JSON.stringify(buildGroupedCatalog(), null, 2),
          mimeType: "application/json",
        },
      ],
    }),
  );
}

function registerPrincipleTemplate(server: McpServer) {
  server.registerResource(
    "principle",
    new ResourceTemplate("cleancode://principle/{id}", {
      list: async () => ({
        resources: PRINCIPLES.map((principle) => ({
          uri: `cleancode://principle/${principle.id}`,
          name: principle.name,
          description: principle.description,
        })),
      }),
    }),
    { description: "Individual Clean Code principle by ID" },
    async (uri, { id }) => {
      const principleId = Array.isArray(id) ? id[0] : id;
      const principle = findPrincipleById(principleId);

      if (!principle) {
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify({ error: `Principle "${principleId}" not found` }),
              mimeType: "application/json",
            },
          ],
        };
      }

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(principle, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    },
  );
}

function buildGroupedCatalog(): Record<string, { id: string; name: string }[]> {
  const grouped: Record<string, { id: string; name: string }[]> = {};

  for (const principle of PRINCIPLES) {
    const label = CATEGORY_LABELS[principle.category];
    const list = grouped[label] ?? [];
    list.push({ id: principle.id, name: principle.name });
    grouped[label] = list;
  }

  return grouped;
}
