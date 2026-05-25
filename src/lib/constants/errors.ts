export type AppError =
  | { type: "DatabaseError"; error: Error }
  | { type: "EntityNotFound"; entity: string }
  | { type: "ExternalServiceError"; service: string; error: Error }
  | { type: "Timeout"; service?: string }
  | { type: "Unauthorized"; reason?: string }
  | { type: "Forbidden"; reason?: string }
  | { type: "ValidationError"; error: Error };

export const databaseError = (error: Error): AppError => ({
  type: "DatabaseError",
  error,
});

export const entityNotFound = (entity: string): AppError => ({
  type: "EntityNotFound",
  entity,
});

export const externalServiceError = (service: string, error: Error): AppError => ({
  type: "ExternalServiceError",
  service,
  error,
});

export const timeout = (service?: string): AppError => ({
  type: "Timeout",
  service,
});

export const unauthorized = (reason?: string): AppError => ({
  type: "Unauthorized",
  reason,
});

export const validationError = (error: Error): AppError => ({
  type: "ValidationError",
  error,
});
