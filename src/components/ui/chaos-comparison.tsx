import { useState } from "react";
import { Flame, ShieldCheck, Zap, Database, KeyRound, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonScenario {
  id: string;
  title: string;
  icon: any;
  context: string;
  reckless: {
    title: string;
    behaviors: string[];
    codeSnippet: string;
    verdict: string;
  };
  disciplined: {
    title: string;
    behaviors: string[];
    codeSnippet: string;
    verdict: string;
  };
}

const COMPARISONS: ComparisonScenario[] = [
  {
    id: "caching",
    title: "Adding Caching",
    icon: Zap,
    context: "Requirement: Cache product details for 60 seconds to reduce database load.",
    reckless: {
      title: "Reckless Agent (Anti-Pattern)",
      behaviors: [
        "Models Cache as a database entity (CacheModel) in SQLite/Postgres.",
        "Puts raw Redis logic directly inside React component / HTTP controller.",
        "Refactors surrounding user controllers without asking.",
        "Claims 'All tests passed' without executing test runner.",
      ],
      codeSnippet: `// ❌ HTTP Controller directly instantiating cache entities
export async function getProduct(req, res) {
  const cacheKey = \`product:\${req.params.id}\`;
  const cached = await db.rawQuery("SELECT * FROM Caches WHERE key = ?", cacheKey);
  if (cached) return res.json(JSON.parse(cached.data));
  
  // Leaking persistence & bypass domain boundary
  const p = await db.products.findById(req.params.id);
  await db.rawQuery("INSERT INTO Caches VALUES (?, ?)", cacheKey, JSON.stringify(p));
  res.json(p);
}`,
      verdict: "Violation: Capabilities are not entities. Presentation leaking into infrastructure. Zero test evidence.",
    },
    disciplined: {
      title: "AICraft Agent (Senior Discipline)",
      behaviors: [
        "Inspects existing cache provider in src/infrastructure/cache.ts.",
        "Reuses existing CacheService primitive with clean TTL interface.",
        "Keeps caching behind application service layer.",
        "Runs unit & integration tests, verifying output before marking done.",
      ],
      codeSnippet: `// ✓ Respecting layer boundaries & reusing existing cache primitive
export class ProductApplicationService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly cache: CacheProvider
  ) {}

  async getProduct(id: ProductId): Promise<ProductDTO> {
    return this.cache.getOrSet(\`product:\${id}\`, 60, () => 
      this.productRepo.findById(id)
    );
  }
}`,
      verdict: "Pass: Reused primitives. Clean layer boundaries. Verified by evidentiary tests.",
    },
  },
  {
    id: "auth",
    title: "Auth Token Refresh",
    icon: KeyRound,
    context: "Requirement: Support JWT refresh token rotation on token expiry.",
    reckless: {
      title: "Reckless Agent (Anti-Pattern)",
      behaviors: [
        "Stores plain-text refresh tokens in localStorage.",
        "Invents a brand new crypto package dependency instead of using project utils.",
        "Changes existing session model schema without an ADR or migration.",
        "Quietly suppresses error handling with generic try/catch {}.",
      ],
      codeSnippet: `// ❌ Security flaw: Insecure storage & silent exception swallowing
export function refreshSession(token) {
  try {
    const raw = jwt.decode(token); // Unverified signature!
    localStorage.setItem("refresh_token", token);
    return fetch("/api/refresh", { body: JSON.stringify({ token }) });
  } catch (e) {
    // Suppressing errors silently
    return null;
  }
}`,
      verdict: "Violation: Security vulnerability. Silent error suppression. Invasive unapproved dependencies.",
    },
    disciplined: {
      title: "AICraft Agent (Senior Discipline)",
      behaviors: [
        "Follows documented auth ADR: httpOnly cookie rotation + Redis blacklist.",
        "Reuses project crypto primitives in src/lib/security.ts.",
        "Atomic change isolated to AuthApplicationService.",
        "Adds regression tests covering expired, revoked, and malformed tokens.",
      ],
      codeSnippet: `// ✓ Secure token rotation with domain invariant protection
export class AuthApplicationService {
  async rotateRefreshToken(rawToken: string, ip: string): Promise<SessionTokens> {
    const valid = await this.tokenService.verifyRefreshToken(rawToken);
    if (!valid) throw new UnauthorizedException("Invalid or revoked refresh token");
    
    await this.tokenService.revokeFamily(valid.familyId);
    return this.tokenService.issueNewPair(valid.userId, ip);
  }
}`,
      verdict: "Pass: Security rules enforced. Invariants protected. Comprehensive test coverage.",
    },
  },
  {
    id: "db",
    title: "Database Migration & Indexing",
    icon: Database,
    context: "Requirement: Add index on (tenant_id, created_at) to speed up audit log queries.",
    reckless: {
      title: "Reckless Agent (Anti-Pattern)",
      behaviors: [
        "Runs destructive ALTER TABLE directly without concurrent index creation.",
        "Locks production table during migration.",
        "Doesn't check if index already exists or table volume.",
        "Modifies historical migration files from 6 months ago.",
      ],
      codeSnippet: `// ❌ Destructive: Modifies historical migration, causes table lock
// File: migrations/20240101_init.sql (DO NOT EDIT HISTORICAL MIGRATIONS!)
ALTER TABLE audit_logs ADD INDEX idx_logs (tenant_id, created_at);`,
      verdict: "Violation: Destructive migration. Editing historical schema. Dangerous production table lock.",
    },
    disciplined: {
      title: "AICraft Agent (Senior Discipline)",
      behaviors: [
        "Checks database review guide in skills/database-review.md.",
        "Creates a new atomic forward migration with CREATE INDEX CONCURRENTLY.",
        "Includes safe rollback / down migration.",
        "Tests migration forward and backwards in local test database.",
      ],
      codeSnippet: `// ✓ Safe, non-blocking forward migration with rollback
-- Up Migration: 20260818_add_audit_log_tenant_idx.sql
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_tenant_created 
ON audit_logs (tenant_id, created_at DESC);

-- Down Migration:
DROP INDEX CONCURRENTLY IF EXISTS idx_audit_logs_tenant_created;`,
      verdict: "Pass: Non-blocking zero-downtime migration. Idempotent. Reversible.",
    },
  },
  {
    id: "api",
    title: "Adding API Endpoint",
    icon: Network,
    context: "Requirement: Add POST /orders/:id/cancel endpoint with reason field.",
    reckless: {
      title: "Reckless Agent (Anti-Pattern)",
      behaviors: [
        "Directly updates database status = 'CANCELLED' without domain validation.",
        "Bypasses inventory restocking and refund triggers.",
        "Invents a custom error format different from rest of API.",
        "Doesn't update OpenAPI / Swagger documentation.",
      ],
      codeSnippet: `// ❌ Bypasses business domain invariants completely
app.post("/orders/:id/cancel", async (req, res) => {
  // Directly mutating DB, ignoring whether order is already shipped!
  await db("orders").where({ id: req.params.id }).update({ status: "CANCELLED" });
  res.send("ok");
});`,
      verdict: "Violation: Breaks domain invariants (canceling shipped orders). Missing docs. Inconsistent responses.",
    },
    disciplined: {
      title: "AICraft Agent (Senior Discipline)",
      behaviors: [
        "Enforces domain invariants (cannot cancel already-shipped orders).",
        "Executes business logic inside Order.cancel(reason) domain method.",
        "Emits OrderCancelledEvent to trigger inventory restocking.",
        "Matches existing API error response envelope and updates OpenAPI specs.",
      ],
      codeSnippet: `// ✓ Enforces domain state machine & transactional event dispatch
export class CancelOrderUseCase {
  async execute(orderId: OrderId, reason: string, user: UserContext): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new NotFoundException("Order not found");
    
    // Domain entity protects its own invariant
    order.cancel(reason, user);
    await this.orderRepo.save(order);
    await this.eventPublisher.publish(new OrderCancelledEvent(order.id));
  }
}`,
      verdict: "Pass: Invariants intact. Clean orchestration. Living documentation updated.",
    },
  },
];

export function ChaosComparison() {
  const [activeId, setActiveId] = useState<string>("caching");
  const scenario = COMPARISONS.find((c) => c.id === activeId) || COMPARISONS[0];

  return (
    <div className="space-y-8">
      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-2">
        {COMPARISONS.map((c) => {
          const SIcon = c.icon;
          const isActive = activeId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-bold"
                  : "border border-border/70 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <SIcon className="h-3.5 w-3.5" />
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-border/70 bg-card p-4 text-xs font-mono text-muted-foreground">
        <span className="text-primary font-bold">SCENARIO:</span> {scenario.context}
      </div>

      {/* Side-by-Side Arena */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Reckless Agent */}
        <div className="flex flex-col justify-between rounded-2xl border border-destructive/40 bg-destructive/[0.04] p-5 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-destructive font-bold text-base">
                <Flame className="h-5 w-5" />
                <h4>{scenario.reckless.title}</h4>
              </div>
              <span className="rounded-full border border-destructive/30 bg-destructive/15 px-2.5 py-0.5 font-mono text-[10px] text-destructive font-bold">
                RECKLESS AI
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-destructive uppercase font-bold">
                Common Agent Failures:
              </span>
              <ul className="space-y-1.5 text-xs">
                {scenario.reckless.behaviors.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="font-mono text-destructive font-bold">✗</span>
                    <span className="text-foreground/85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-black/60 p-3 font-mono text-xs text-red-200/90 overflow-x-auto">
              <pre>
                <code>{scenario.reckless.codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 font-mono text-[11px] text-destructive">
            <strong>VERDICT:</strong> {scenario.reckless.verdict}
          </div>
        </div>

        {/* Right: AICraft Disciplined Agent */}
        <div className="flex flex-col justify-between rounded-2xl border border-primary/40 bg-primary/[0.04] p-5 md:p-6 shadow-[0_0_30px_-10px_var(--primary)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <ShieldCheck className="h-5 w-5" />
                <h4>{scenario.disciplined.title}</h4>
              </div>
              <span className="rounded-full border border-primary/40 bg-primary/20 px-2.5 py-0.5 font-mono text-[10px] text-primary font-bold">
                AICRAFT DISCIPLINED
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-primary uppercase font-bold">
                Disciplined Senior Behaviors:
              </span>
              <ul className="space-y-1.5 text-xs">
                {scenario.disciplined.behaviors.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="font-mono text-primary font-bold">✓</span>
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-primary/30 bg-black/60 p-3 font-mono text-xs text-emerald-200/90 overflow-x-auto">
              <pre>
                <code>{scenario.disciplined.codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-3 font-mono text-[11px] text-primary">
            <strong>VERDICT:</strong> {scenario.disciplined.verdict}
          </div>
        </div>
      </div>
    </div>
  );
}
