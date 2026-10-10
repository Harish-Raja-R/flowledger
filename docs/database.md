# Database Design

## Entities and Relationships

- **User**: Represents individuals in the system. Has a `role` (ADMIN, EMPLOYEE, MANAGER, FINANCE, DEPARTMENT_HEAD) and belongs to a `Department`.
- **Department**: Organizational units grouping users and workflows.
- **Request**: Core transactional entity. Tracks `type`, `status`, `amount`, `priority`, and refers to a `Workflow`.
- **Workflow**: Defines an ordered sequence of approval `steps` for a specific request `type`.
- **Approval**: An instance of a workflow step mapped to a specific `Request`. Tracks `status`, `comments`, and the `actionedBy` user.
- **AuditLog**: Immutable record of all system events and state changes.
- **Notification**: Alerts delivered to users.

### Request Lifecycle
DRAFT -> SUBMITTED -> PENDING_APPROVAL -> (APPROVED | REJECTED | CHANGES_REQUESTED) -> RESUBMITTED -> PENDING_APPROVAL ... -> APPROVED
