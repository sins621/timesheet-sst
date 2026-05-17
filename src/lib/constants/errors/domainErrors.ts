export type DomainError =
  | { type: "EntityNotFound"; entity: string }
  | { type: "Conflict"; reason: string }
  | { type: "ValidationFailed"; reason: string }
  | { type: "Unauthorized"; reason?: string }
  | { type: "Internal"; reason: string };

export const entityNotFound = (entity: string): DomainError => ({
  type: "EntityNotFound",
  entity,
});

export const conflict = (reason: string): DomainError => ({
  type: "Conflict",
  reason,
});

// B.C. Similar to the validationError from the InfraError the point here is to
// return a reason in plain text rather than the actual error itself.
export const validationFailed = (reason: string): DomainError => ({
  type: "ValidationFailed",
  reason,
});

export const unauthorized = (reason?: string): DomainError => ({
  type: "Unauthorized",
  reason,
});

// B.C. Used for transforming InfaErrors to DomainErrors for Route Handlers
export const internal = (reason: string): DomainError => ({
  type: "Internal",
  reason,
});
