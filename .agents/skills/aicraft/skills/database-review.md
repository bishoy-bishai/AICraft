# Database Review

For schema or persistence changes ask:
- Is the change necessary?
- Can existing structures represent the requirement?
- Are relationships and foreign keys correct?
- Are uniqueness constraints intentional?
- Are nullable fields meaningful?
- Are defaults consistent?
- Are cascade rules explicit?
- Is data loss possible?
- Is the migration safe?
- Are indexes needed?
- Is rollback or compatibility relevant?

Do not add metadata, lifecycle states, or status fields without a real requirement for them.
