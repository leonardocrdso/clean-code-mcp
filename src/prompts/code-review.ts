import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PRINCIPLES } from "../data/principles.js";
import { CATEGORIES, isValidCategory, type PrincipleCategory } from "../data/categories.js";
import { formatPrincipleAsMarkdown } from "../formatters/principle-formatter.js";

const DEFAULT_FOCUS_CATEGORIES: PrincipleCategory[] = [
  "naming",
  "functions",
  "error-handling",
  "code-smells",
];

export function registerCodeReviewPrompt(server: McpServer) {
  server.registerPrompt(
    "clean-code-review",
    {
      description:
        "Generate a Clean Code review prompt with relevant principles embedded. " +
        "Provide code to review and optionally focus on specific categories.",
      argsSchema: {
        code: z.string().describe("The source code to review"),
        language: z
          .string()
          .optional()
          .describe("Programming language of the code (e.g. 'typescript', 'python')"),
        focus_categories: z
          .string()
          .optional()
          .describe(
            `Comma-separated categories to focus on. Valid: ${CATEGORIES.join(", ")}`,
          ),
      },
    },
    ({ code, language, focus_categories }) => {
      const categories = parseFocusCategories(focus_categories);
      const relevantPrinciples = PRINCIPLES.filter((p) =>
        categories.includes(p.category),
      );

      const principlesReference = relevantPrinciples
        .map(formatPrincipleAsMarkdown)
        .join("\n\n---\n\n");

      const languageHint = language ? ` (${language})` : "";

      const prompt = buildReviewPrompt(code, languageHint, categories, principlesReference);

      return {
        messages: [
          {
            role: "user",
            content: { type: "text", text: prompt },
          },
        ],
      };
    },
  );
}

function parseFocusCategories(raw: string | undefined): PrincipleCategory[] {
  if (!raw) return DEFAULT_FOCUS_CATEGORIES;

  const parsed = raw
    .split(",")
    .map((s) => s.trim())
    .filter(isValidCategory);

  return parsed.length > 0 ? parsed : DEFAULT_FOCUS_CATEGORIES;
}

function buildReviewPrompt(
  code: string,
  languageHint: string,
  categories: PrincipleCategory[],
  principlesReference: string,
): string {
  return `# Clean Code Review Request

Please review the following code${languageHint} against Clean Code principles, focusing on these categories: **${categories.join(", ")}**.

## Code to Review

\`\`\`
${code}
\`\`\`

## Review Instructions

For each issue found:
1. Identify the specific Clean Code principle being violated
2. Explain why it matters
3. Suggest a concrete improvement with a code example

Prioritize the most impactful issues first. Be specific and actionable.

## Clean Code Principles Reference

${principlesReference}`;
}
