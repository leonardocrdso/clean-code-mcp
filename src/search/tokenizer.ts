import type { PrincipleCategory } from "../data/categories.js";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "to", "in", "of", "and", "or", "for",
  "on", "at", "by", "with", "from", "as", "be", "this", "that", "not",
  "but", "are", "was", "were", "been", "being", "have", "has", "had",
  "do", "does", "did", "will", "would", "could", "should", "may",
  "might", "can", "shall", "i", "you", "we", "they", "he", "she",
  "my", "your", "our", "their", "its", "me", "us", "them", "what",
  "how", "when", "where", "which", "who", "whom", "why",
]);

const CATEGORY_KEYWORDS: Record<string, PrincipleCategory> = {
  name: "naming",
  names: "naming",
  naming: "naming",
  variable: "naming",
  variables: "naming",

  function: "functions",
  functions: "functions",
  method: "functions",
  methods: "functions",
  argument: "functions",
  arguments: "functions",
  parameter: "functions",
  parameters: "functions",
  nesting: "functions",
  nested: "functions",
  guard: "functions",
  conditional: "functions",
  "if-else": "functions",

  comment: "comments",
  comments: "comments",
  documentation: "comments",
  javadoc: "comments",
  jsdoc: "comments",

  format: "formatting",
  formatting: "formatting",
  indentation: "formatting",
  whitespace: "formatting",
  spacing: "formatting",

  error: "error-handling",
  errors: "error-handling",
  exception: "error-handling",
  exceptions: "error-handling",
  "try-catch": "error-handling",
  null: "error-handling",

  test: "unit-testing",
  tests: "unit-testing",
  testing: "unit-testing",
  unit: "unit-testing",
  assert: "unit-testing",
  assertion: "unit-testing",

  class: "classes",
  classes: "classes",
  cohesion: "classes",
  responsibility: "classes",

  solid: "solid",
  srp: "solid",
  ocp: "solid",
  lsp: "solid",
  isp: "solid",
  dip: "solid",

  smell: "code-smells",
  smells: "code-smells",
  "code-smell": "code-smells",
  duplication: "code-smells",
  "magic-number": "code-smells",
  "dead-code": "code-smells",

  object: "objects-and-data-structures",
  objects: "objects-and-data-structures",
  data: "objects-and-data-structures",
  dto: "objects-and-data-structures",
  demeter: "objects-and-data-structures",
  encapsulation: "objects-and-data-structures",

  concurrency: "concurrency",
  async: "concurrency",
  parallel: "concurrency",
  thread: "concurrency",
  race: "concurrency",

  system: "systems",
  systems: "systems",
  injection: "systems",
  "dependency-injection": "systems",

  emergence: "emergence",
  simple: "emergence",
  simplicity: "emergence",
  design: "emergence",
};

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

export function removeStopWords(tokens: string[]): string[] {
  return tokens.filter((token) => !STOP_WORDS.has(token));
}

export function detectCategoryBoosts(tokens: string[]): Map<PrincipleCategory, number> {
  const boosts = new Map<PrincipleCategory, number>();

  for (const token of tokens) {
    const category = CATEGORY_KEYWORDS[token];
    if (category) {
      const current = boosts.get(category) ?? 0;
      boosts.set(category, current + 1);
    }
  }

  return boosts;
}
