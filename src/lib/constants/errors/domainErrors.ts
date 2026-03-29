export type DomainError =
  | { type: "EntityNotFound"; entity: string }
  | { type: "Conflict"; reason: string }
  | { type: "ValidationFailed"; reason: string };

export const entityNotFound = (entity: string): DomainError => ({
  type: "EntityNotFound",
  entity,
});

export const conflict = (reason: string): DomainError => ({
  type: "Conflict",
  reason,
});

export const validationFailed = (reason: string): DomainError => ({
  type: "ValidationFailed",
  reason,
});
