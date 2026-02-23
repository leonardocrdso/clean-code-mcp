export const CATEGORIES = [
  "naming",
  "functions",
  "comments",
  "formatting",
  "error-handling",
  "unit-testing",
  "classes",
  "solid",
  "code-smells",
  "objects-and-data-structures",
  "concurrency",
  "systems",
  "emergence",
] as const;

export type PrincipleCategory = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<PrincipleCategory, string> = {
  naming: "Meaningful Names",
  functions: "Functions",
  comments: "Comments",
  formatting: "Formatting",
  "error-handling": "Error Handling",
  "unit-testing": "Unit Testing",
  classes: "Classes",
  solid: "SOLID Principles",
  "code-smells": "Code Smells",
  "objects-and-data-structures": "Objects and Data Structures",
  concurrency: "Concurrency",
  systems: "Systems",
  emergence: "Emergence",
};

export function isValidCategory(value: string): value is PrincipleCategory {
  return CATEGORIES.includes(value as PrincipleCategory);
}
