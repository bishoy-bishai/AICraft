import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyBlock } from "@/components/copy-block";

const REPO = "https://github.com/bishoy-bishai/AICraft.git";

interface InstallTab {
  id: string;
  name: string;
  badge: string;
  description: string;
  code: string;
  notes?: string[];
}

const INSTALL_TABS: InstallTab[] = [
  {
    id: "curl",
    name: "1-Line Auto Installer",
    badge: "Recommended",
    description: "Detects installed AI agents and places skills into Antigravity, Claude Code, Cursor, Codex, or global configs automatically.",
    code: `curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/install.sh | bash`,
    notes: [
      "Zero dependencies required (pure POSIX shell).",
      "Auto-detects Antigravity, Claude Code, Cursor, Windsurf, and Codex environments.",
      "Pass target flag if desired: | bash -s -- antigravity (or claude, cursor, codex, all)",
    ],
  },
  {
    id: "antigravity",
    name: "Google Antigravity (AGY)",
    badge: "Native Skill",
    description: "Installs AICraft into your workspace project or global user config for Google Antigravity.",
    code: `# 1. Install for current workspace project (.agents/skills/aicraft):
mkdir -p .agents/skills/aicraft
git clone --depth 1 --filter=blob:none --sparse ${REPO} /tmp/aicraft-skill
cd /tmp/aicraft-skill && git sparse-checkout set skill
cp -R skill/. "$OLDPWD/.agents/skills/aicraft/"

# 2. Or install globally for all Antigravity workspaces:
mkdir -p ~/.gemini/config/skills/aicraft
cp -R /tmp/aicraft-skill/skill/. ~/.gemini/config/skills/aicraft/`,
    notes: [
      "Antigravity uses progressive disclosure to keep token context minimal.",
      "Activate anytime in Antigravity or let the agent invoke it automatically.",
    ],
  },
  {
    id: "claude",
    name: "Anthropic Claude Code",
    badge: "Slash Command",
    description: "Installs into ~/.claude/skills/aicraft for Claude Code CLI and /aicraft slash command.",
    code: `git clone --depth 1 --filter=blob:none --sparse ${REPO} /tmp/aicraft-skill
cd /tmp/aicraft-skill && git sparse-checkout set skill

mkdir -p ~/.claude/skills/aicraft
cp -R skill/. ~/.claude/skills/aicraft/

# Then inside Claude Code:
# /aicraft`,
    notes: [
      "Installs SKILL.md and all 9 sub-guides into Claude Code's skill discovery path.",
    ],
  },
  {
    id: "cursor",
    name: "Cursor & Windsurf",
    badge: "Rules / MDC",
    description: "Installs AICraft Constitution and Workflow into .cursor/rules/ or .windsurfrules.",
    code: `# For Cursor AI:
mkdir -p .cursor/rules
curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/skill/constitution.md -o .cursor/rules/aicraft.md
curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/skill/workflow.md -o .cursor/rules/aicraft-workflow.md

# For Windsurf Cascade:
curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/skill/constitution.md -o .windsurfrules`,
    notes: [
      "Enforces Constitution rules on every prompt and inline edit in Cursor & Windsurf.",
    ],
  },
  {
    id: "codex",
    name: "OpenAI Codex / Universal",
    badge: "AGENTS.md",
    description: "Appends the AICraft Constitution, Workflow, and Playbook into standing AGENTS.md.",
    code: `git clone --depth 1 --filter=blob:none --sparse ${REPO} /tmp/aicraft-skill
cd /tmp/aicraft-skill && git sparse-checkout set skill

mkdir -p ~/.codex
echo "" >> ~/.codex/AGENTS.md
echo "# --- AICraft Engineering Discipline ---" >> ~/.codex/AGENTS.md
cat skill/constitution.md >> ~/.codex/AGENTS.md
cat skill/workflow.md >> ~/.codex/AGENTS.md
cat skill/playbook.md >> ~/.codex/AGENTS.md`,
    notes: [
      "Codex reads AGENTS.md as standing instructions across all repositories.",
    ],
  },
];

export function MultiAgentInstallHub() {
  const [activeTabId, setActiveTabId] = useState<string>("curl");
  const tab = INSTALL_TABS.find((t) => t.id === activeTabId) || INSTALL_TABS[0];

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2">
        {INSTALL_TABS.map((t) => {
          const isActive = activeTabId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTabId(t.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-bold"
                  : "border border-border/70 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{t.name}</span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-[10px] font-mono",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {t.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Code Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">{tab.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{tab.description}</p>
          </div>
          <a
            href="https://github.com/bishoy-bishai/AICraft"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <span>Browse Skill Source</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <CopyBlock code={tab.code} />

        {tab.notes && (
          <div className="space-y-1.5 pt-2">
            <span className="font-mono text-[11px] font-semibold text-primary uppercase">
              Important Notes:
            </span>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {tab.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">›</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
