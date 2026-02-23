import type { CleanCodePrinciple, CodeExample } from "../data/principles.js";
import { CATEGORY_LABELS, type PrincipleCategory } from "../data/categories.js";

export function formatPrincipleAsMarkdown(principle: CleanCodePrinciple): string {
  const lines: string[] = [
    `## ${principle.name}`,
    "",
    `**Category:** ${CATEGORY_LABELS[principle.category]}`,
    `**ID:** \`${principle.id}\``,
    "",
    principle.description,
  ];

  if (principle.examples.length > 0) {
    lines.push("", "### Examples");
    for (const example of principle.examples) {
      lines.push(...formatExample(example));
    }
  }

  lines.push("", `**Tags:** ${principle.tags.join(", ")}`);

  return lines.join("\n");
}

function formatExample(example: CodeExample): string[] {
  return [
    "",
    `**${example.label}:**`,
    "",
    `\`\`\`${example.language}`,
    example.code,
    "```",
  ];
}

export function formatPrincipleList(principles: CleanCodePrinciple[]): string {
  if (principles.length === 0) {
    return "No principles found.";
  }

  const lines = [`Found **${principles.length}** principle(s):`, ""];

  for (const principle of principles) {
    lines.push(
      `- **${principle.name}** (\`${principle.id}\`) — ${truncateDescription(principle.description)}`,
    );
  }

  return lines.join("\n");
}

function truncateDescription(description: string, maxLength = 100): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength).trimEnd() + "...";
}

export function formatCatalogGrouped(principles: CleanCodePrinciple[]): string {
  const grouped = groupByCategory(principles);
  const lines: string[] = ["# Clean Code Principles Catalog", ""];

  for (const [category, categoryPrinciples] of grouped) {
    lines.push(`## ${CATEGORY_LABELS[category]}`, "");
    for (const principle of categoryPrinciples) {
      lines.push(`- **${principle.name}** (\`${principle.id}\`)`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function groupByCategory(
  principles: CleanCodePrinciple[],
): Map<PrincipleCategory, CleanCodePrinciple[]> {
  const grouped = new Map<PrincipleCategory, CleanCodePrinciple[]>();

  for (const principle of principles) {
    const list = grouped.get(principle.category) ?? [];
    list.push(principle);
    grouped.set(principle.category, list);
  }

  return grouped;
}
