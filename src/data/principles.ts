import type { PrincipleCategory } from "./categories.js";

export interface CodeExample {
  label: "Good" | "Bad";
  language: string;
  code: string;
}

export interface CleanCodePrinciple {
  id: string;
  name: string;
  category: PrincipleCategory;
  description: string;
  examples: CodeExample[];
  tags: string[];
}

export const PRINCIPLES: CleanCodePrinciple[] = [
  // ── Naming ──────────────────────────────────────────────
  {
    id: "use-intention-revealing-names",
    name: "Use Intention-Revealing Names",
    category: "naming",
    description:
      "Variable, function, and class names should reveal why they exist, what they do, and how they are used. A name that requires a comment to explain its purpose fails to reveal its intention.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `const d: number; // elapsed time in days`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const elapsedTimeInDays: number;`,
      },
    ],
    tags: ["naming", "readability", "intention", "variables", "clarity"],
  },
  {
    id: "avoid-disinformation",
    name: "Avoid Disinformation",
    category: "naming",
    description:
      "Do not use names that mislead the reader about the meaning of a variable or its type. Avoid using names like 'accountList' when the variable is not actually a List. Avoid names that vary in small ways.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `const accountList = new Set<Account>();`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const accounts = new Set<Account>();`,
      },
    ],
    tags: ["naming", "misleading", "disinformation", "types", "clarity"],
  },
  {
    id: "make-meaningful-distinctions",
    name: "Make Meaningful Distinctions",
    category: "naming",
    description:
      "If names must be different, they should also mean something different. Number-series naming (a1, a2, ...) and noise words (Info, Data, the) are not meaningful distinctions.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function copyChars(a1: string[], a2: string[]) {
  for (let i = 0; i < a1.length; i++) a2[i] = a1[i];
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function copyChars(source: string[], destination: string[]) {
  for (let i = 0; i < source.length; i++) destination[i] = source[i];
}`,
      },
    ],
    tags: ["naming", "distinction", "noise-words", "clarity"],
  },
  {
    id: "use-pronounceable-names",
    name: "Use Pronounceable Names",
    category: "naming",
    description:
      "Names should be pronounceable so they can be discussed without sounding foolish. Programming is a social activity; if you can't pronounce a name, you can't discuss it without looking silly.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `const genymdhms: Date; // generation date, year, month, day, hour, minute, second`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const generationTimestamp: Date;`,
      },
    ],
    tags: ["naming", "pronounceable", "communication", "readability"],
  },
  {
    id: "use-searchable-names",
    name: "Use Searchable Names",
    category: "naming",
    description:
      "Single-letter names and numeric constants are hard to locate across a body of text. Longer names are easier to search for. The length of a name should correspond to the size of its scope.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `for (let j = 0; j < 34; j++) {
  s += (t[j] * 4) / 5;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const WORK_DAYS_PER_WEEK = 5;
for (let j = 0; j < NUMBER_OF_TASKS; j++) {
  const realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
  const realTaskWeeks = realTaskDays / WORK_DAYS_PER_WEEK;
  sum += realTaskWeeks;
}`,
      },
    ],
    tags: ["naming", "searchable", "constants", "magic-numbers", "scope"],
  },
  {
    id: "avoid-encodings",
    name: "Avoid Encodings",
    category: "naming",
    description:
      "Hungarian notation, member prefixes (m_), and interface prefixes (I) add noise. Modern editors and languages make these encodings unnecessary. They add cognitive overhead and make names harder to read.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `interface IShapeFactory {
  createShape(m_type: string): IShape;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface ShapeFactory {
  createShape(type: string): Shape;
}`,
      },
    ],
    tags: ["naming", "encodings", "hungarian-notation", "prefixes", "interfaces"],
  },
  {
    id: "class-names-should-be-nouns",
    name: "Class Names Should Be Nouns",
    category: "naming",
    description:
      "Classes and objects should have noun or noun phrase names. A class name should not be a verb. Avoid generic names like Manager, Processor, Data, or Info — prefer specific names that describe what the class represents.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class DataProcessor { }
class ManageUsers { }`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class UserRepository { }
class PaymentGateway { }`,
      },
    ],
    tags: ["naming", "classes", "nouns", "verbs", "object-oriented"],
  },
  {
    id: "method-names-should-be-verbs",
    name: "Method Names Should Be Verbs",
    category: "naming",
    description:
      "Methods should have verb or verb phrase names. Accessors, mutators, and predicates should be prefixed with get, set, and is according to convention.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class Account {
  money(): number { return this.balance; }
  active(): boolean { return this._active; }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class Account {
  getBalance(): number { return this.balance; }
  isActive(): boolean { return this._active; }
}`,
      },
    ],
    tags: ["naming", "methods", "verbs", "accessors", "predicates"],
  },
  {
    id: "pick-one-word-per-concept",
    name: "Pick One Word Per Concept",
    category: "naming",
    description:
      "Use one word for one abstract concept and stick with it. It is confusing to have fetch, retrieve, and get as equivalent methods of different classes. A consistent lexicon makes code easier to navigate.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class UserService { fetchUser(id: string) {} }
class OrderService { retrieveOrder(id: string) {} }
class ProductService { getProduct(id: string) {} }`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class UserService { getUser(id: string) {} }
class OrderService { getOrder(id: string) {} }
class ProductService { getProduct(id: string) {} }`,
      },
    ],
    tags: ["naming", "consistency", "vocabulary", "concept", "lexicon"],
  },
  {
    id: "use-solution-domain-names",
    name: "Use Solution Domain Names",
    category: "naming",
    description:
      "Use computer science terms, algorithm names, pattern names, and math terms when appropriate. The people reading your code are programmers — names like 'visitor', 'queue', or 'jobQueue' are clear to them.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `const dataHolder = new Map<string, User>();`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const userCache = new Map<string, User>();`,
      },
    ],
    tags: ["naming", "domain", "patterns", "technical", "vocabulary"],
  },

  // ── Functions ───────────────────────────────────────────
  {
    id: "keep-functions-small",
    name: "Keep Functions Small",
    category: "functions",
    description:
      "Functions should be small. The first rule of functions is that they should be small. The second rule is that they should be smaller than that. Small functions are easier to read, understand, and maintain.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function processOrder(order: Order) {
  // validate order (20 lines)
  // calculate discounts (15 lines)
  // apply tax (10 lines)
  // save to database (10 lines)
  // send confirmation email (15 lines)
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotal(order);
  saveOrder(order, total);
  sendConfirmation(order);
}`,
      },
    ],
    tags: ["functions", "small", "size", "readability", "decomposition"],
  },
  {
    id: "do-one-thing",
    name: "Do One Thing",
    category: "functions",
    description:
      "Functions should do one thing. They should do it well. They should do it only. If a function does steps that are one level of abstraction below the stated name of the function, it is doing one thing.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function emailClients(clients: Client[]) {
  for (const client of clients) {
    const record = database.lookup(client);
    if (record.isActive()) {
      email(client);
    }
  }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function emailActiveClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client): boolean {
  const record = database.lookup(client);
  return record.isActive();
}`,
      },
    ],
    tags: ["functions", "single-responsibility", "one-thing", "srp", "decomposition"],
  },
  {
    id: "one-level-of-abstraction",
    name: "One Level of Abstraction per Function",
    category: "functions",
    description:
      "Mixing levels of abstraction within a function is confusing. Readers may not be able to tell whether an expression is an essential concept or a detail. Keep each function at a single, consistent level of abstraction.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function renderPage(data: PageData): string {
  const html = "<html>";
  const title = data.getTitle();
  const content = data.paragraphs.map(p => \`<p>\${p}</p>\`).join("");
  return \`\${html}<head><title>\${title}</title></head><body>\${content}</body></html>\`;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function renderPage(data: PageData): string {
  const head = renderHead(data.getTitle());
  const body = renderBody(data.paragraphs);
  return wrapInHtml(head, body);
}`,
      },
    ],
    tags: ["functions", "abstraction", "levels", "readability", "stepdown"],
  },
  {
    id: "use-descriptive-names",
    name: "Use Descriptive Names for Functions",
    category: "functions",
    description:
      "A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment. Don't be afraid to make a name long if it improves clarity.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function handle(e: Event) { /* ... */ }
function proc(data: unknown) { /* ... */ }`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function handleFormSubmission(event: SubmitEvent) { /* ... */ }
function processPaymentTransaction(transaction: Transaction) { /* ... */ }`,
      },
    ],
    tags: ["functions", "naming", "descriptive", "readability", "self-documenting"],
  },
  {
    id: "minimize-function-arguments",
    name: "Minimize Function Arguments",
    category: "functions",
    description:
      "The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed by two (dyadic). Three arguments (triadic) should be avoided. More than three requires very special justification. Use objects to group related arguments.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function createMenu(title: string, body: string, buttonText: string, cancellable: boolean) {}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface MenuConfig {
  title: string;
  body: string;
  buttonText: string;
  cancellable: boolean;
}

function createMenu(config: MenuConfig) {}`,
      },
    ],
    tags: ["functions", "arguments", "parameters", "objects", "arity"],
  },
  {
    id: "avoid-flag-arguments",
    name: "Avoid Flag Arguments",
    category: "functions",
    description:
      "Boolean arguments loudly declare that the function does more than one thing. They are confusing and should be avoided. Instead, split the function into two with descriptive names.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function createFile(name: string, temp: boolean) {
  if (temp) { fs.create(\`./temp/\${name}\`); }
  else { fs.create(name); }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function createFile(name: string) {
  fs.create(name);
}

function createTempFile(name: string) {
  fs.create(\`./temp/\${name}\`);
}`,
      },
    ],
    tags: ["functions", "boolean", "flags", "splitting", "srp"],
  },
  {
    id: "avoid-side-effects-in-functions",
    name: "Avoid Side Effects",
    category: "functions",
    description:
      "Side effects are lies. A function promises to do one thing, but it also does hidden things — modifying globals, writing files, or changing passed-in arguments. If a function must have a side effect, make it explicit in the name.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function checkPassword(userName: string, password: string): boolean {
  const user = UserGateway.findByName(userName);
  if (user.passwordMatches(password)) {
    Session.initialize(); // hidden side effect!
    return true;
  }
  return false;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function checkPassword(userName: string, password: string): boolean {
  const user = UserGateway.findByName(userName);
  return user.passwordMatches(password);
}

function authenticateAndInitializeSession(userName: string, password: string): boolean {
  if (checkPassword(userName, password)) {
    Session.initialize();
    return true;
  }
  return false;
}`,
      },
    ],
    tags: ["functions", "side-effects", "purity", "hidden-behavior", "coupling"],
  },
  {
    id: "command-query-separation",
    name: "Command-Query Separation",
    category: "functions",
    description:
      "Functions should either do something (command) or answer something (query), but not both. Doing both leads to confusion. A function that changes state should not return a value, and vice versa.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `// Returns true if the attribute was set, false if it didn't exist
function set(attribute: string, value: string): boolean { /* ... */ }

// Confusing usage:
if (set("username", "bob")) { /* ... */ }`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function attributeExists(attribute: string): boolean { /* ... */ }
function setAttribute(attribute: string, value: string): void { /* ... */ }

if (attributeExists("username")) {
  setAttribute("username", "bob");
}`,
      },
    ],
    tags: ["functions", "command-query", "cqs", "separation", "design"],
  },
  {
    id: "prefer-exceptions-to-error-codes",
    name: "Prefer Exceptions to Returning Error Codes",
    category: "functions",
    description:
      "Returning error codes leads to deeply nested structures and forces callers to deal with errors immediately. Exceptions allow error processing to be separated from the happy path, making code cleaner.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `if (deletePage(page) === E_OK) {
  if (registry.deleteReference(page.name) === E_OK) {
    if (configKeys.deleteKey(page.name.makeKey()) === E_OK) {
      logger.log("page deleted");
    } else { logger.log("configKey not deleted"); }
  } else { logger.log("deleteReference failed"); }
} else { logger.log("delete failed"); }`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `try {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
} catch (error) {
  logger.log(error.message);
}`,
      },
    ],
    tags: ["functions", "errors", "exceptions", "error-codes", "nesting"],
  },
  {
    id: "dry-principle",
    name: "Don't Repeat Yourself (DRY)",
    category: "functions",
    description:
      "Duplication is the root of all evil in software. Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. Duplicated code means duplicated bugs and duplicated maintenance effort.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function validateEmail(email: string) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

function isEmailValid(email: string) {
  const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return pattern.test(email);
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function isValidEmail(email: string): boolean {
  const EMAIL_PATTERN = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return EMAIL_PATTERN.test(email);
}`,
      },
    ],
    tags: ["functions", "dry", "duplication", "reuse", "maintenance"],
  },

  // ── Comments ────────────────────────────────────────────
  {
    id: "comments-do-not-make-up-for-bad-code",
    name: "Comments Do Not Make Up for Bad Code",
    category: "comments",
    description:
      "One of the most common motivations for writing comments is bad code. Rather than spending time writing a comment to explain messy code, spend it cleaning the code. Clear code with few comments is far superior to cluttered code with lots of comments.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65)) {}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `if (employee.isEligibleForFullBenefits()) {}`,
      },
    ],
    tags: ["comments", "bad-code", "refactoring", "readability", "self-documenting"],
  },
  {
    id: "explain-intent-with-comments",
    name: "Use Comments to Explain Intent",
    category: "comments",
    description:
      "Sometimes a comment is useful to explain why a decision was made, not what the code does. Comments that explain intent behind a decision provide value that the code cannot express on its own.",
    examples: [
      {
        label: "Good",
        language: "typescript",
        code: `// We sort by age descending because the business rule requires
// showing the most senior employees first for compliance reporting.
employees.sort((a, b) => b.age - a.age);`,
      },
    ],
    tags: ["comments", "intent", "why", "decision", "business-rules"],
  },
  {
    id: "avoid-redundant-comments",
    name: "Avoid Redundant Comments",
    category: "comments",
    description:
      "A comment is redundant if it describes something that adequately describes itself. Comments that restate what the code already clearly says are noise and should be removed.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `// Returns the day of the month
function getDayOfMonth(): number {
  return dayOfMonth;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function getDayOfMonth(): number {
  return dayOfMonth;
}`,
      },
    ],
    tags: ["comments", "redundant", "noise", "clutter", "readability"],
  },
  {
    id: "avoid-commented-out-code",
    name: "Don't Comment Out Code",
    category: "comments",
    description:
      "Commented-out code festers and rots. It confuses other developers who are afraid to delete it. Version control remembers your code — delete it and retrieve it from history if needed.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function calculateTotal(items: Item[]) {
  // const tax = calculateTax(items);
  // const discount = getDiscount(items);
  return items.reduce((sum, item) => sum + item.price, 0);
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}`,
      },
    ],
    tags: ["comments", "dead-code", "version-control", "cleanup"],
  },
  {
    id: "todo-comments",
    name: "Use TODO Comments Sparingly",
    category: "comments",
    description:
      "TODO comments are acceptable as a temporary reminder of work to be done, but they should not be an excuse to leave bad code in the system. Regularly scan for and address TODO comments.",
    examples: [
      {
        label: "Good",
        language: "typescript",
        code: `// TODO: Replace with proper authentication once OAuth is configured
function authenticateUser(token: string): boolean {
  return token.length > 0;
}`,
      },
    ],
    tags: ["comments", "todo", "temporary", "tracking", "technical-debt"],
  },

  // ── Formatting ──────────────────────────────────────────
  {
    id: "vertical-openness",
    name: "Vertical Openness Between Concepts",
    category: "formatting",
    description:
      "Each blank line is a visual cue that identifies a new and separate concept. Blank lines separate the package declaration, imports, and each of the functions. This simple rule has a profound effect on readability.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `import { UserService } from "./user.js";
import { Logger } from "./logger.js";
const logger = new Logger();
function getUser(id: string) {
  logger.info(\`Fetching user \${id}\`);
  return UserService.find(id);
}
function deleteUser(id: string) {
  logger.warn(\`Deleting user \${id}\`);
  return UserService.remove(id);
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `import { UserService } from "./user.js";
import { Logger } from "./logger.js";

const logger = new Logger();

function getUser(id: string) {
  logger.info(\`Fetching user \${id}\`);
  return UserService.find(id);
}

function deleteUser(id: string) {
  logger.warn(\`Deleting user \${id}\`);
  return UserService.remove(id);
}`,
      },
    ],
    tags: ["formatting", "vertical", "whitespace", "blank-lines", "readability"],
  },
  {
    id: "vertical-density",
    name: "Vertical Density for Related Code",
    category: "formatting",
    description:
      "Lines of code that are tightly related should appear vertically close to each other. Closely related concepts should not be separated into different files unless there is a very strong reason.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class ReporterConfig {
  /**
   * The class name of the reporter listener
   */
  private className: string;

  /**
   * The properties of the reporter listener
   */
  private properties: Property[];
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class ReporterConfig {
  private className: string;
  private properties: Property[];
}`,
      },
    ],
    tags: ["formatting", "vertical", "density", "related-code", "cohesion"],
  },
  {
    id: "dependent-functions-close",
    name: "Keep Dependent Functions Close",
    category: "formatting",
    description:
      "If one function calls another, they should be vertically close in the source file, with the caller above the callee when possible. This gives the program a natural flow and enhances readability.",
    examples: [
      {
        label: "Good",
        language: "typescript",
        code: `function processPayment(order: Order) {
  const amount = calculateTotal(order);
  chargeCustomer(order.customer, amount);
}

function calculateTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price, 0);
}

function chargeCustomer(customer: Customer, amount: number) {
  paymentGateway.charge(customer.paymentMethod, amount);
}`,
      },
    ],
    tags: ["formatting", "vertical", "ordering", "caller-callee", "flow"],
  },
  {
    id: "horizontal-formatting",
    name: "Keep Lines Short",
    category: "formatting",
    description:
      "Lines should be short. The old Hollerith limit of 80 is a bit arbitrary, but lines beyond 120 characters are careless. Short lines are easier to read and understand.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `const result = someService.processTransaction(customerId, transactionAmount, transactionDate, transactionType, currency, metadata, options);`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const result = someService.processTransaction({
  customerId,
  amount: transactionAmount,
  date: transactionDate,
  type: transactionType,
  currency,
  metadata,
  options,
});`,
      },
    ],
    tags: ["formatting", "horizontal", "line-length", "readability", "wrapping"],
  },

  // ── Error Handling ──────────────────────────────────────
  {
    id: "use-exceptions-not-return-codes",
    name: "Use Exceptions, Not Return Codes",
    category: "error-handling",
    description:
      "Using exceptions rather than return codes separates error handling from the main logic. The calling code is cleaner because it doesn't need to check for error codes after every call.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function withdraw(amount: number): number {
  if (amount > balance) return -1;
  if (amount <= 0) return -2;
  balance -= amount;
  return 0;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function withdraw(amount: number): void {
  if (amount > balance) throw new InsufficientFundsError(balance, amount);
  if (amount <= 0) throw new InvalidAmountError(amount);
  balance -= amount;
}`,
      },
    ],
    tags: ["error-handling", "exceptions", "return-codes", "clarity", "separation"],
  },
  {
    id: "write-try-catch-first",
    name: "Write Try-Catch-Finally First",
    category: "error-handling",
    description:
      "When writing code that might throw exceptions, start with the try-catch-finally statement. This helps define what the caller can expect, regardless of what goes wrong in the try block.",
    examples: [
      {
        label: "Good",
        language: "typescript",
        code: `function readFile(path: string): string {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch (error) {
    throw new FileNotFoundError(\`Could not read file: \${path}\`);
  }
}`,
      },
    ],
    tags: ["error-handling", "try-catch", "exceptions", "structure", "defensive"],
  },
  {
    id: "provide-context-with-exceptions",
    name: "Provide Context with Exceptions",
    category: "error-handling",
    description:
      "Each exception should provide enough context to determine the source and location of an error. Create informative error messages that include the operation attempted and the type of failure.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `throw new Error("Failed");`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `throw new Error(
  \`Failed to save user "\${user.name}" to database: connection timeout after \${TIMEOUT_MS}ms\`
);`,
      },
    ],
    tags: ["error-handling", "context", "messages", "debugging", "diagnostics"],
  },
  {
    id: "dont-return-null",
    name: "Don't Return Null",
    category: "error-handling",
    description:
      "Returning null creates work for the caller and invites null-pointer errors. When tempted to return null, consider throwing an exception or returning a special case object instead.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function getEmployee(id: string): Employee | null {
  const record = db.find(id);
  if (!record) return null;
  return new Employee(record);
}

// Caller must always check:
const employee = getEmployee("123");
if (employee !== null) { /* ... */ }`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function getEmployee(id: string): Employee {
  const record = db.find(id);
  if (!record) throw new EmployeeNotFoundError(id);
  return new Employee(record);
}`,
      },
    ],
    tags: ["error-handling", "null", "null-checks", "exceptions", "special-case"],
  },
  {
    id: "dont-pass-null",
    name: "Don't Pass Null as Arguments",
    category: "error-handling",
    description:
      "Passing null to a function is worse than returning null. Unless the API expects null, avoid passing it as it shifts the burden of null-checking to every function that receives parameters.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `calculateMetrics(null, new Date());`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `calculateMetrics(defaultMetricConfig(), new Date());`,
      },
    ],
    tags: ["error-handling", "null", "arguments", "defensive", "contracts"],
  },

  // ── Unit Testing ────────────────────────────────────────
  {
    id: "one-assert-per-test",
    name: "One Assert per Test",
    category: "unit-testing",
    description:
      "If your project uses tests, they are easiest to understand when each test function contains a single assertion. Multiple assertions can obscure which concept is being tested. When a test fails, you immediately know what's broken.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `test("user creation", () => {
  const user = createUser("Bob", "bob@test.com");
  expect(user.name).toBe("Bob");
  expect(user.email).toBe("bob@test.com");
  expect(user.isActive).toBe(true);
  expect(user.createdAt).toBeDefined();
});`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `test("new user has the provided name", () => {
  const user = createUser("Bob", "bob@test.com");
  expect(user.name).toBe("Bob");
});

test("new user starts as active", () => {
  const user = createUser("Bob", "bob@test.com");
  expect(user.isActive).toBe(true);
});`,
      },
    ],
    tags: ["unit-testing", "assertions", "single-concept", "clarity", "debugging"],
  },
  {
    id: "fast-tests",
    name: "Tests Should Be Fast (F.I.R.S.T.)",
    category: "unit-testing",
    description:
      "If your project uses tests, fast tests are run frequently. Slow tests are run infrequently. When tests run slow, you won't want to run them frequently, and you'll lose the ability to catch problems early. Aim for tests that run in milliseconds.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `test("user can place order", async () => {
  const user = await createRealUser(database);
  const product = await createRealProduct(database);
  const order = await placeRealOrder(user, product);
  expect(order.status).toBe("placed");
});`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `test("user can place order", () => {
  const user = buildUser();
  const product = buildProduct();
  const order = placeOrder(user, product);
  expect(order.status).toBe("placed");
});`,
      },
    ],
    tags: ["unit-testing", "fast", "first", "performance", "frequency"],
  },
  {
    id: "independent-tests",
    name: "Tests Should Be Independent",
    category: "unit-testing",
    description:
      "If your project uses tests, they should not depend on each other. One test should not set up the conditions for the next. You should be able to run each test independently and in any order.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `let sharedUser: User;
test("creates user", () => { sharedUser = createUser("Bob"); });
test("updates user", () => { updateUser(sharedUser, { name: "Alice" }); });`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `test("creates user with name", () => {
  const user = createUser("Bob");
  expect(user.name).toBe("Bob");
});

test("updates user name", () => {
  const user = createUser("Bob");
  updateUser(user, { name: "Alice" });
  expect(user.name).toBe("Alice");
});`,
      },
    ],
    tags: ["unit-testing", "independent", "isolation", "first", "coupling"],
  },
  {
    id: "readable-tests",
    name: "Tests Should Be Readable",
    category: "unit-testing",
    description:
      "If your project uses tests, readability is perhaps even more important than in production code. Tests serve as documentation for how code should be used. Each test should tell a clear story: arrange, act, assert.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `test("test1", () => {
  const x = fn(1, 2, true, null, "a");
  expect(x).toBe(42);
});`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `test("calculates total price with tax for US customers", () => {
  const subtotal = 100;
  const taxRate = 0.08;
  const includeShipping = true;

  const total = calculateTotal(subtotal, taxRate, includeShipping);

  expect(total).toBe(118);
});`,
      },
    ],
    tags: ["unit-testing", "readability", "documentation", "arrange-act-assert", "naming"],
  },
  {
    id: "test-boundary-conditions",
    name: "Test Boundary Conditions",
    category: "unit-testing",
    description:
      "Bugs often cluster at boundaries — empty arrays, zero values, null inputs, max limits. If your project uses tests, exercise boundary conditions explicitly. It's where most errors hide.",
    examples: [
      {
        label: "Good",
        language: "typescript",
        code: `test("returns empty array when no items match", () => {
  expect(filterByStatus([], "active")).toEqual([]);
});

test("handles single-item array", () => {
  const items = [{ status: "active" }];
  expect(filterByStatus(items, "active")).toHaveLength(1);
});`,
      },
    ],
    tags: ["unit-testing", "boundaries", "edge-cases", "bugs", "defensive"],
  },

  // ── Classes ─────────────────────────────────────────────
  {
    id: "classes-should-be-small",
    name: "Classes Should Be Small",
    category: "classes",
    description:
      "Classes should be small. With functions we measure size by counting physical lines. With classes we count responsibilities. A class name should describe its single responsibility — if it requires 'and' or 'or', it does too much.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class UserManager {
  createUser() {}
  deleteUser() {}
  sendEmail() {}
  generateReport() {}
  validatePayment() {}
  exportToCsv() {}
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class UserRepository {
  create(user: User) {}
  delete(id: string) {}
  findById(id: string) {}
}`,
      },
    ],
    tags: ["classes", "small", "responsibilities", "srp", "cohesion"],
  },
  {
    id: "high-cohesion",
    name: "Maintain High Cohesion",
    category: "classes",
    description:
      "A class should have a small number of instance variables. Each method should manipulate one or more of those variables. The more variables a method manipulates, the more cohesive it is to its class.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class Utility {
  formatDate(date: Date) { /* uses no instance vars */ }
  parseJSON(text: string) { /* uses no instance vars */ }
  validateEmail(email: string) { /* uses no instance vars */ }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class DateFormatter {
  constructor(private locale: string, private timezone: string) {}

  format(date: Date): string { /* uses locale and timezone */ }
  formatRelative(date: Date): string { /* uses locale and timezone */ }
}`,
      },
    ],
    tags: ["classes", "cohesion", "instance-variables", "design", "coupling"],
  },
  {
    id: "organize-for-change",
    name: "Organize Classes for Change",
    category: "classes",
    description:
      "Classes should be organized so that change is easy. The Open/Closed Principle states that classes should be open for extension but closed for modification. When a new requirement arrives, it should require adding code, not changing existing code.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class Sql {
  create(table: string) { /* ... */ }
  insert(table: string, values: unknown[]) { /* ... */ }
  selectAll(table: string) { /* ... */ }
  // Every new SQL type requires modifying this class
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `abstract class Sql { abstract generate(): string; }
class CreateSql extends Sql { generate() { /* ... */ } }
class InsertSql extends Sql { generate() { /* ... */ } }
class SelectSql extends Sql { generate() { /* ... */ } }`,
      },
    ],
    tags: ["classes", "open-closed", "change", "extension", "modification"],
  },

  // ── SOLID ───────────────────────────────────────────────
  {
    id: "single-responsibility-principle",
    name: "Single Responsibility Principle (SRP)",
    category: "solid",
    description:
      "A class should have one, and only one, reason to change. If a class has more than one responsibility, those responsibilities become coupled. A change to one can impair or inhibit the class's ability to meet the others.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class Employee {
  calculatePay(): number { /* ... */ }
  save(): void { /* ... */ }
  generateReport(): string { /* ... */ }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class Employee { constructor(public name: string, public salary: number) {} }
class PayCalculator { calculatePay(employee: Employee): number { /* ... */ } }
class EmployeeRepository { save(employee: Employee): void { /* ... */ } }
class EmployeeReportGenerator { generate(employee: Employee): string { /* ... */ } }`,
      },
    ],
    tags: ["solid", "srp", "single-responsibility", "coupling", "cohesion"],
  },
  {
    id: "open-closed-principle",
    name: "Open/Closed Principle (OCP)",
    category: "solid",
    description:
      "Software entities should be open for extension but closed for modification. You should be able to add new behavior without changing existing code. This is typically achieved through abstractions and polymorphism.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function calculateArea(shape: { type: string; width?: number; radius?: number }) {
  if (shape.type === "rectangle") return shape.width! * shape.width!;
  if (shape.type === "circle") return Math.PI * shape.radius! ** 2;
  // Must modify function for every new shape
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface Shape { area(): number; }
class Rectangle implements Shape { constructor(private w: number, private h: number) {} area() { return this.w * this.h; } }
class Circle implements Shape { constructor(private r: number) {} area() { return Math.PI * this.r ** 2; } }

function calculateArea(shape: Shape): number { return shape.area(); }`,
      },
    ],
    tags: ["solid", "ocp", "open-closed", "extension", "polymorphism"],
  },
  {
    id: "liskov-substitution-principle",
    name: "Liskov Substitution Principle (LSP)",
    category: "solid",
    description:
      "Objects of a superclass should be replaceable with objects of a subclass without breaking the application. Subtypes must be substitutable for their base types. Violating this leads to fragile code with instanceof checks.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class Bird { fly(): void { /* ... */ } }
class Penguin extends Bird {
  fly(): void { throw new Error("Penguins can't fly!"); }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface Bird { move(): void; }
class Sparrow implements Bird { move() { this.fly(); } fly() {} }
class Penguin implements Bird { move() { this.swim(); } swim() {} }`,
      },
    ],
    tags: ["solid", "lsp", "liskov", "substitution", "inheritance", "polymorphism"],
  },
  {
    id: "interface-segregation-principle",
    name: "Interface Segregation Principle (ISP)",
    category: "solid",
    description:
      "Clients should not be forced to depend on interfaces they do not use. Fat interfaces should be split into smaller, more specific ones so that clients only need to know about the methods that are of interest to them.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Robot implements Worker {
  work() { /* ok */ }
  eat() { throw new Error("Robots don't eat"); }
  sleep() { throw new Error("Robots don't sleep"); }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface Workable { work(): void; }
interface Feedable { eat(): void; }
interface Sleepable { sleep(): void; }

class Robot implements Workable { work() { /* ok */ } }
class Human implements Workable, Feedable, Sleepable {
  work() {} eat() {} sleep() {}
}`,
      },
    ],
    tags: ["solid", "isp", "interface-segregation", "fat-interface", "decoupling"],
  },
  {
    id: "dependency-inversion-principle",
    name: "Dependency Inversion Principle (DIP)",
    category: "solid",
    description:
      "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions. This reduces coupling between modules.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class MySqlDatabase { save(data: string) {} }
class UserService {
  private db = new MySqlDatabase();
  saveUser(user: string) { this.db.save(user); }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface Database { save(data: string): void; }
class MySqlDatabase implements Database { save(data: string) {} }
class UserService {
  constructor(private db: Database) {}
  saveUser(user: string) { this.db.save(user); }
}`,
      },
    ],
    tags: ["solid", "dip", "dependency-inversion", "abstractions", "decoupling", "injection"],
  },

  // ── Code Smells ─────────────────────────────────────────
  {
    id: "avoid-magic-numbers",
    name: "Replace Magic Numbers with Named Constants",
    category: "code-smells",
    description:
      "Magic numbers are raw numbers in source code with no explanation. They should be replaced with well-named constants. Named constants add context and make code easier to read and modify.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function calculatePrice(quantity: number): number {
  return quantity * 9.99 * 1.08;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const UNIT_PRICE = 9.99;
const TAX_RATE = 1.08;

function calculatePrice(quantity: number): number {
  return quantity * UNIT_PRICE * TAX_RATE;
}`,
      },
    ],
    tags: ["code-smells", "magic-numbers", "constants", "readability", "maintenance"],
  },
  {
    id: "avoid-dead-code",
    name: "Remove Dead Code",
    category: "code-smells",
    description:
      "Dead code — code that is never executed — is clutter. It confuses readers and wastes mental energy. Delete it. Version control systems remember it if you ever need it back.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function processOrder(order: Order) {
  // const oldTotal = legacyCalculation(order);
  const total = calculateTotal(order);
  // if (featureFlags.useOldSystem) { return oldTotal; }
  return total;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function processOrder(order: Order) {
  return calculateTotal(order);
}`,
      },
    ],
    tags: ["code-smells", "dead-code", "cleanup", "clutter", "version-control"],
  },
  {
    id: "avoid-feature-envy",
    name: "Avoid Feature Envy",
    category: "code-smells",
    description:
      "A method that uses more features of another class than its own has feature envy. It should probably be moved to the class it envies. Methods should be close to the data they manipulate.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class OrderPrinter {
  print(order: Order) {
    const total = order.getItems().reduce((s, i) => s + i.getPrice() * i.getQty(), 0);
    const tax = total * order.getTaxRate();
    const shipping = order.getAddress().isInternational() ? 25 : 5;
    console.log(\`Total: \${total + tax + shipping}\`);
  }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class Order {
  getTotal(): number {
    const subtotal = this.items.reduce((s, i) => s + i.getPrice() * i.getQty(), 0);
    const tax = subtotal * this.taxRate;
    const shipping = this.address.getShippingCost();
    return subtotal + tax + shipping;
  }
}`,
      },
    ],
    tags: ["code-smells", "feature-envy", "coupling", "encapsulation", "move-method"],
  },
  {
    id: "avoid-long-parameter-lists",
    name: "Avoid Long Parameter Lists",
    category: "code-smells",
    description:
      "Functions with many parameters are hard to understand and error-prone. Group related parameters into objects. Long parameter lists are a sign that a function may be doing too much.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function sendEmail(to: string, from: string, subject: string, body: string, cc: string, bcc: string, replyTo: string) {}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  body: string;
  cc?: string;
  bcc?: string;
  replyTo?: string;
}

function sendEmail(message: EmailMessage) {}`,
      },
    ],
    tags: ["code-smells", "parameters", "arguments", "objects", "readability"],
  },
  {
    id: "avoid-inappropriate-intimacy",
    name: "Avoid Inappropriate Intimacy",
    category: "code-smells",
    description:
      "Classes that reach into the private parts of other classes are too intimate. Minimize what one class knows about the internals of another. Keep interactions at the interface level.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class Order {
  customer: Customer;
  getDiscount() {
    return this.customer._internalCreditScore > 700 ? 0.1 : 0;
  }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class Customer {
  isEligibleForDiscount(): boolean { return this.creditScore > 700; }
}
class Order {
  customer: Customer;
  getDiscount() {
    return this.customer.isEligibleForDiscount() ? 0.1 : 0;
  }
}`,
      },
    ],
    tags: ["code-smells", "coupling", "encapsulation", "intimacy", "information-hiding"],
  },

  // ── Objects and Data Structures ─────────────────────────
  {
    id: "data-abstraction",
    name: "Data Abstraction",
    category: "objects-and-data-structures",
    description:
      "Hiding implementation is about abstractions, not just putting a layer of functions between variables. A class should expose abstract interfaces that allow users to manipulate the essence of the data without knowing its implementation.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class Vehicle {
  getFuelTankCapacityInGallons(): number { return this.fuelCapacity; }
  getGallonsOfFuel(): number { return this.fuel; }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class Vehicle {
  getPercentFuelRemaining(): number {
    return (this.fuel / this.fuelCapacity) * 100;
  }
}`,
      },
    ],
    tags: ["objects-and-data-structures", "abstraction", "encapsulation", "interface", "hiding"],
  },
  {
    id: "law-of-demeter",
    name: "Law of Demeter",
    category: "objects-and-data-structures",
    description:
      'A method should only call methods on its own object, its parameters, objects it creates, and its direct components. "Talk to friends, not to strangers." Chains like a.getB().getC().doSomething() violate this law.',
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `const outputDir = context.getOptions().getScratchDir().getAbsolutePath();`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `const outputDir = context.getOutputDirectory();`,
      },
    ],
    tags: ["objects-and-data-structures", "demeter", "coupling", "train-wreck", "encapsulation"],
  },
  {
    id: "data-transfer-objects",
    name: "Use Data Transfer Objects (DTOs)",
    category: "objects-and-data-structures",
    description:
      "Data structures with public variables and no functions (DTOs) are useful for transferring data between layers. They are not objects — they have no behavior. Keep them pure data holders.",
    examples: [
      {
        label: "Good",
        language: "typescript",
        code: `interface UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}`,
      },
    ],
    tags: ["objects-and-data-structures", "dto", "data-transfer", "layers", "serialization"],
  },

  // ── Concurrency ─────────────────────────────────────────
  {
    id: "keep-concurrency-separate",
    name: "Keep Concurrency Code Separate",
    category: "concurrency",
    description:
      "Concurrency-related code has its own lifecycle of development, change, and tuning. Mixing it with other code adds complexity. Keep concurrency-related code separated from other code.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `async function processOrders(orders: Order[]) {
  for (const order of orders) {
    const items = await fetchItems(order.id);
    const total = items.reduce((s, i) => s + i.price, 0);
    await saveTotal(order.id, total);
    await notifyCustomer(order.customerId, total);
  }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function calculateOrderTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

async function processOrders(orders: Order[]) {
  await Promise.all(orders.map(processOneOrder));
}

async function processOneOrder(order: Order) {
  const items = await fetchItems(order.id);
  const total = calculateOrderTotal(items);
  await saveTotal(order.id, total);
  await notifyCustomer(order.customerId, total);
}`,
      },
    ],
    tags: ["concurrency", "separation", "async", "parallel", "complexity"],
  },
  {
    id: "avoid-shared-mutable-state",
    name: "Avoid Shared Mutable State",
    category: "concurrency",
    description:
      "Shared mutable state is the root of most concurrency problems. Prefer immutable data, message passing, or isolated state. When sharing is necessary, use proper synchronization.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `let totalProcessed = 0;
async function processItem(item: Item) {
  await doWork(item);
  totalProcessed++; // Race condition!
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `async function processItems(items: Item[]): Promise<number> {
  const results = await Promise.all(items.map(doWork));
  return results.length;
}`,
      },
    ],
    tags: ["concurrency", "shared-state", "mutable", "immutable", "race-condition"],
  },

  // ── Systems ─────────────────────────────────────────────
  {
    id: "separate-construction-from-use",
    name: "Separate Construction from Use",
    category: "systems",
    description:
      "The startup process of constructing objects and wiring dependencies is a separate concern from the runtime logic. Mixing construction with use creates tight coupling and makes the code harder to maintain and extend.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class OrderService {
  process(orderId: string) {
    const db = new PostgresDatabase("localhost:5432");
    const order = db.find(orderId);
    // process order...
  }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `class OrderService {
  constructor(private db: Database) {}

  process(orderId: string) {
    const order = this.db.find(orderId);
    // process order...
  }
}`,
      },
    ],
    tags: ["systems", "construction", "dependency-injection", "coupling", "testing"],
  },
  {
    id: "use-dependency-injection",
    name: "Use Dependency Injection",
    category: "systems",
    description:
      "Rather than having an object create its own dependencies, pass them in from outside. This separates construction from use, improves flexibility, and allows different implementations to be swapped in.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class NotificationService {
  private mailer = new SmtpMailer();
  notify(user: User, message: string) { this.mailer.send(user.email, message); }
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `interface Mailer { send(to: string, message: string): void; }
class NotificationService {
  constructor(private mailer: Mailer) {}
  notify(user: User, message: string) { this.mailer.send(user.email, message); }
}`,
      },
    ],
    tags: ["systems", "dependency-injection", "di", "testing", "decoupling"],
  },

  // ── Emergence ───────────────────────────────────────────
  {
    id: "simple-design-runs-all-tests",
    name: "Simple Design Rule 1: Runs All the Tests",
    category: "emergence",
    description:
      "A system that can be verified is more reliable. Designing for verifiability pushes us toward small, single-purpose classes and loose coupling — which naturally leads to better design. If your project uses tests, they are a valuable tool for verification — but verifiability matters regardless.",
    examples: [
      {
        label: "Good",
        language: "typescript",
        code: `class TaxCalculator {
  calculate(amount: number, rate: number): number {
    return amount * rate;
  }
}

test("calculates tax correctly", () => {
  const calc = new TaxCalculator();
  expect(calc.calculate(100, 0.1)).toBe(10);
});`,
      },
    ],
    tags: ["emergence", "testing", "verification", "design", "testability"],
  },
  {
    id: "simple-design-no-duplication",
    name: "Simple Design Rule 2: No Duplication",
    category: "emergence",
    description:
      "Duplication is the primary enemy of a well-designed system. It represents additional work, additional risk, and additional unnecessary complexity. Eliminating duplication often leads to discovering new abstractions.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function scaleToOneDimension(desiredDimension: number, imageDimension: number) {
  if (Math.abs(desiredDimension - imageDimension) < errorThreshold) return;
  const scalingFactor = desiredDimension / imageDimension;
  scalingFactor = Math.floor(scalingFactor * 100) / 100;
  const newImage = ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor);
  image.dispose();
  image = newImage;
}

function rotate(degrees: number) {
  const newImage = ImageUtilities.getRotatedImage(image, degrees);
  image.dispose();
  image = newImage;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function scaleToOneDimension(desiredDimension: number, imageDimension: number) {
  if (Math.abs(desiredDimension - imageDimension) < errorThreshold) return;
  const scalingFactor = Math.floor((desiredDimension / imageDimension) * 100) / 100;
  replaceImage(ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor));
}

function rotate(degrees: number) {
  replaceImage(ImageUtilities.getRotatedImage(image, degrees));
}

function replaceImage(newImage: Image) {
  image.dispose();
  image = newImage;
}`,
      },
    ],
    tags: ["emergence", "duplication", "dry", "abstraction", "refactoring"],
  },
  {
    id: "simple-design-expressive",
    name: "Simple Design Rule 3: Expressive",
    category: "emergence",
    description:
      "Code should clearly express the intent of its author. The clearer code is, the less time others will spend understanding it. Use good names, keep functions and classes small, and use standard nomenclature (design patterns). When the project includes tests, ensure they are well-crafted and expressive too.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `function d(a: unknown[], b: (x: unknown) => boolean) {
  const r = [];
  for (let i = 0; i < a.length; i++) if (b(a[i])) r.push(a[i]);
  return r;
}`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function filterMatching<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}`,
      },
    ],
    tags: ["emergence", "expressiveness", "readability", "naming", "clarity"],
  },
  {
    id: "simple-design-minimal",
    name: "Simple Design Rule 4: Minimal Classes and Methods",
    category: "emergence",
    description:
      "Keep the overall count of classes and methods low. Too many tiny classes and methods can be as problematic as too few large ones. Be pragmatic — this rule has the lowest priority of the four simple design rules.",
    examples: [
      {
        label: "Bad",
        language: "typescript",
        code: `class StringValidator { validate(s: string) { return s.length > 0; } }
class StringFormatter { format(s: string) { return s.trim(); } }
class StringAnalyzer { analyze(s: string) { return s.split(" ").length; } }`,
      },
      {
        label: "Good",
        language: "typescript",
        code: `function isNonEmpty(text: string): boolean { return text.length > 0; }
function trimWhitespace(text: string): string { return text.trim(); }
function countWords(text: string): number { return text.split(" ").length; }`,
      },
    ],
    tags: ["emergence", "minimal", "pragmatism", "over-engineering", "simplicity"],
  },
];

export function findPrincipleById(id: string): CleanCodePrinciple | undefined {
  return PRINCIPLES.find((principle) => principle.id === id);
}

export function filterByCategory(category: string): CleanCodePrinciple[] {
  return PRINCIPLES.filter((principle) => principle.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(PRINCIPLES.map((principle) => principle.category));
  return [...categories];
}
