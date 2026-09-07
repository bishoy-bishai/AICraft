import re
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "SKILL.md"
WORKFLOW_REF = ROOT / "references" / "workflow.md"
AI_BEHAVIOR_REF = ROOT / "references" / "ai-behavior.md"
PLAYBOOK_REF = ROOT / "references" / "playbook.md"


class AICraftInvariantTests(unittest.TestCase):
    def test_root_skill_exists(self):
        self.assertTrue(SKILL.exists())

    def test_skills_directory_does_not_exist(self):
        self.assertFalse((ROOT / "skills").exists())

    def test_website_directories_do_not_exist(self):
        for rel in ("src", "public", "dist", "_static-archive"):
            self.assertFalse((ROOT / rel).exists(), f"{rel} should not exist")

    def test_required_references_exist(self):
        required_refs = [
            "ai-behavior.md",
            "architecture.md",
            "code-review.md",
            "codebase-discovery.md",
            "constitution.md",
            "database-review.md",
            "implementation.md",
            "playbook.md",
            "prompt-library.md",
            "security.md",
            "task-planning.md",
            "testing.md",
            "workflow.md",
        ]
        for ref in required_refs:
            self.assertTrue((ROOT / "references" / ref).exists(), f"Missing references/{ref}")

    def test_plugin_and_marketplace_metadata_consistency(self):
        plugin = json.loads((ROOT / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
        market = json.loads((ROOT / ".claude-plugin" / "marketplace.json").read_text(encoding="utf-8"))
        self.assertEqual(plugin.get("name"), "aicraft")
        self.assertEqual(plugin.get("version"), "1.0.0")
        self.assertEqual(plugin.get("license"), "MIT")
        self.assertEqual(market.get("name"), "aicraft")
        self.assertEqual(market.get("plugins", [{}])[0].get("name"), "aicraft")
        self.assertEqual(market.get("plugins", [{}])[0].get("source"), "./")

    def test_plugin_command_path_exists(self):
        plugin = json.loads((ROOT / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
        commands = plugin.get("commands", [])
        self.assertTrue(commands)
        for cmd in commands:
            path = cmd[2:] if cmd.startswith("./") else cmd
            self.assertTrue((ROOT / path).exists(), f"Missing command file {cmd}")

    def test_pre_implementation_discipline_is_explicit(self):
        text = SKILL.read_text(encoding="utf-8")
        self.assertIn("Understand first. Build second.", text)
        self.assertRegex(text, r"If any answer is .*DO NOT write code")

    def test_seven_phase_workflow_is_documented_in_order(self):
        text = WORKFLOW_REF.read_text(encoding="utf-8")
        phases = ["Receive", "Understand", "Plan", "Implement", "Validate", "Review", "Complete"]
        positions = [text.find(phase) for phase in phases]
        self.assertTrue(all(p >= 0 for p in positions), "Missing one or more workflow phases")
        self.assertEqual(positions, sorted(positions), "Workflow phases are out of order")

    def test_architecture_changes_require_adr_approval(self):
        text = PLAYBOOK_REF.read_text(encoding="utf-8")
        self.assertIn("Implement only after explicit review and approval", text)
        self.assertIn("Do not rewrite or redesign existing architectural choices without an approved Architecture Decision Record (ADR)",
                      (ROOT / "references" / "constitution.md").read_text(encoding="utf-8"))

    def test_evidence_truthfulness_rules_are_present(self):
        text = AI_BEHAVIOR_REF.read_text(encoding="utf-8")
        required = [
            "claim tests passed without running them",
            "claim integrations work without verification",
            "claim approval for decisions that were not approved",
        ]
        for item in required:
            self.assertIn(item, text)

    def test_scope_and_atomicity_rules_are_present(self):
        text = (ROOT / "references" / "constitution.md").read_text(encoding="utf-8")
        self.assertIn("Keep changes atomic", text)

    def test_documentation_sync_rule_is_present(self):
        text = (ROOT / "references" / "constitution.md").read_text(encoding="utf-8")
        self.assertIn("Every change that affects behavior, configuration, contracts, or data models must update the corresponding documentation", text)

    def test_domain_invariants_rule_is_present(self):
        text = (ROOT / "references" / "constitution.md").read_text(encoding="utf-8")
        self.assertIn("Never break the Domain", text)

    def test_review_order_has_eight_stages(self):
        text = (ROOT / "references" / "code-review.md").read_text(encoding="utf-8")
        stages = re.findall(r"^\d+\.\s", text, flags=re.M)
        self.assertEqual(len(stages), 8)

    def test_skill_preserves_four_pillars(self):
        text = SKILL.read_text(encoding="utf-8")
        for pillar in ("Constitution", "Workflow", "Playbook", "Prompt Library"):
            self.assertIn(pillar, text)

    def test_skill_includes_ground_truth_rules(self):
        text = SKILL.read_text(encoding="utf-8")
        expected = [
            "tests passed when they were not run",
            "integrations work when they were not verified",
            "requirements exist when they were not provided",
            "files changed when they were not changed",
            "architectural decisions were approved without an ADR",
            "errors were fixed when they were only suppressed",
        ]
        for token in expected:
            self.assertIn(token, text)


if __name__ == "__main__":
    unittest.main()
