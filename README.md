# @leonardocrdso/clean-code-mcp

An MCP (Model Context Protocol) server that provides 63 Clean Code principles for AI-assisted code review and development. Search, browse, and review code against best practices from Robert C. Martin's Clean Code.

## Installation

### Using npx (recommended)

```bash
npx @leonardocrdso/clean-code-mcp
```

### Adding to Claude Code

```bash
claude mcp add clean-code-mcp -- npx @leonardocrdso/clean-code-mcp
```

### Manual configuration

Add to your MCP client settings:

```json
{
  "mcpServers": {
    "clean-code-mcp": {
      "command": "npx",
      "args": ["@leonardocrdso/clean-code-mcp"]
    }
  }
}
```

## Tools

### `search-principle`

Search principles by name, keyword, or ID. Returns detailed results for top matches and a summary for additional matches.

```
query: "srp"
query: "naming"
query: "keep-functions-small"
```

### `search-by-context`

Find relevant principles for a given situation. Describe your problem in natural language.

```
context: "my function has too many parameters and is hard to test"
context: "I have deeply nested if statements"
```

### `list-principles`

List all principles or filter by category.

```
category: "solid"
category: "error-handling"
```

## Resources

- **`cleancode://catalog`** — Full catalog of all 63 principles grouped by category
- **`cleancode://principle/{id}`** — Individual principle by ID

## Prompts

### `clean-code-review`

Generates a structured code review prompt with relevant Clean Code principles embedded as context.

Parameters:
- `code` (required) — The source code to review
- `language` (optional) — Programming language (e.g. `typescript`, `python`)
- `focus_categories` (optional) — Comma-separated categories to focus on

## Categories

13 categories covering 63 principles:

| Category | Description |
|---|---|
| `naming` | Meaningful Names |
| `functions` | Functions |
| `comments` | Comments |
| `formatting` | Formatting |
| `error-handling` | Error Handling |
| `unit-testing` | Unit Testing |
| `classes` | Classes |
| `solid` | SOLID Principles |
| `code-smells` | Code Smells |
| `objects-and-data-structures` | Objects and Data Structures |
| `concurrency` | Concurrency |
| `systems` | Systems |
| `emergence` | Emergence |

## Development

```bash
# Install dependencies
bun install

# Run in development mode
bun run dev

# Build
bun run build
```

## License

MIT
