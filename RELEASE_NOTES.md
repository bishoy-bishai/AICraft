# Release Notes

## v1.0.0

AICraft is now packaged as a standalone Agent Skill and Claude Code plugin, ready for marketplace submission workflows.

### Highlights

- Converted repository to a skill-first distribution model.
- Established root-level canonical skill entrypoint at SKILL.md.
- Added Claude Code plugin packaging with .claude-plugin/plugin.json and .claude-plugin/marketplace.json.
- Preserved and normalized the 4 Pillars:
  - Constitution
  - Workflow
  - Playbook
  - Prompt Library
- Preserved the 7-phase workflow:
  - Receive
  - Understand
  - Plan
  - Implement
  - Validate
  - Review
  - Complete
- Preserved deterministic engineering truthfulness constraints.
- Added deterministic repository validation script at validation/validate.py.
- Added deterministic behavioral tests in tests/.
- Added CI workflow for strict validation and tests.
- Removed website-only frontend/build artifacts and obsolete installer path.

### Installation Paths

- Agent Skills: npx skills add bishoy-bishai/AICraft --skill aicraft
- Claude plugin: use Claude plugin installation flow with this repository.
- Manual: place skill artifacts in your client skills directory and use SKILL.md.

### Notes

- This release does not claim Anthropic approval, Anthropic verification, or guaranteed marketplace acceptance.
