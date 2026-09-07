import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "aicraft" / "SKILL.md"
WORKFLOW_REF = ROOT / "skills" / "aicraft" / "references" / "workflow.md"
AI_BEHAVIOR_REF = ROOT / "skills" / "aicraft" / "references" / "ai-behavior.md"
PLAYBOOK_REF = ROOT / "skills" / "aicraft" / "references" / "playbook.md"


class AICraftInvariantTests(unittest.TestCase):
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
                      (ROOT / "skills" / "aicraft" / "references" / "constitution.md").read_text(encoding="utf-8"))

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
        text = (ROOT / "skills" / "aicraft" / "references" / "constitution.md").read_text(encoding="utf-8")
        self.assertIn("Keep changes atomic", text)

    def test_documentation_sync_rule_is_present(self):
        text = (ROOT / "skills" / "aicraft" / "references" / "constitution.md").read_text(encoding="utf-8")
        self.assertIn("Every change that affects behavior, configuration, contracts, or data models must update the corresponding documentation", text)

    def test_domain_invariants_rule_is_present(self):
        text = (ROOT / "skills" / "aicraft" / "references" / "constitution.md").read_text(encoding="utf-8")
        self.assertIn("Never break the Domain", text)

    def test_review_order_has_eight_stages(self):
        text = (ROOT / "skills" / "aicraft" / "references" / "code-review.md").read_text(encoding="utf-8")
        stages = re.findall(r"^\d+\.\s", text, flags=re.M)
        self.assertEqual(len(stages), 8)


if __name__ == "__main__":
    unittest.main()
