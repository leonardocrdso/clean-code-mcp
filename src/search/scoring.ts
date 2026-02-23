import type { CleanCodePrinciple } from "../data/principles.js";
import type { PrincipleCategory } from "../data/categories.js";

const SCORE_WEIGHTS = {
  EXACT_ID_MATCH: 100,
  NAME_CONTAINS: 80,
  TAG_EXACT: 70,
  TAG_PARTIAL: 50,
  DESCRIPTION_CONTAINS: 30,
  CATEGORY_MATCH: 20,
} as const;

const CATEGORY_BOOST_MULTIPLIER = 15;

export function scorePrincipleByQuery(
  principle: CleanCodePrinciple,
  query: string,
): number {
  const normalizedQuery = query.toLowerCase().trim();
  let score = 0;

  if (principle.id === normalizedQuery) {
    return SCORE_WEIGHTS.EXACT_ID_MATCH;
  }

  if (principle.name.toLowerCase().includes(normalizedQuery)) {
    score += SCORE_WEIGHTS.NAME_CONTAINS;
  }

  for (const tag of principle.tags) {
    if (tag === normalizedQuery) {
      score += SCORE_WEIGHTS.TAG_EXACT;
    } else if (tag.includes(normalizedQuery) || normalizedQuery.includes(tag)) {
      score += SCORE_WEIGHTS.TAG_PARTIAL;
    }
  }

  if (principle.description.toLowerCase().includes(normalizedQuery)) {
    score += SCORE_WEIGHTS.DESCRIPTION_CONTAINS;
  }

  if (principle.category.includes(normalizedQuery)) {
    score += SCORE_WEIGHTS.CATEGORY_MATCH;
  }

  return score;
}

export function scorePrincipleByTokens(
  principle: CleanCodePrinciple,
  tokens: string[],
  categoryBoosts: Map<PrincipleCategory, number>,
): number {
  let score = 0;

  for (const token of tokens) {
    score += scorePrincipleByQuery(principle, token);
  }

  const boost = categoryBoosts.get(principle.category) ?? 0;
  score += boost * CATEGORY_BOOST_MULTIPLIER;

  return score;
}

export function rankPrinciples<T extends CleanCodePrinciple>(
  principles: T[],
  scoreFn: (principle: T) => number,
): T[] {
  return principles
    .map((principle) => ({ principle, score: scoreFn(principle) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ principle }) => principle);
}
