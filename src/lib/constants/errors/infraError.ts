export type InfraError =
  | { type: "DatabaseError"; error: Error }
  | { type: "UniqueConstraintViolation"; field?: string }
  | { type: "ExternalServiceError"; service: string; error: Error }
  | { type: "Timeout"; service?: string }
  | { type: "Unauthorized"; reason?: string }
  | { type: "Forbidden"; reason?: string }
  | { type: "ValidationError"; error: Error };

export const databaseError = (error: Error): InfraError => ({
  type: "DatabaseError",
  error,
});

export const uniqueConstraintViolation = (field?: string): InfraError => ({
  type: "UniqueConstraintViolation",
  field,
});

export const externalServiceError = (
  service: string,
  error: Error,
): InfraError => ({
  type: "ExternalServiceError",
  service,
  error,
});

export const timeout = (service?: string): InfraError => ({
  type: "Timeout",
  service,
});

export const unauthorized = (reason?: string): InfraError => ({
  type: "Unauthorized",
  reason,
});

export const forbidden = (reason?: string): InfraError => ({
  type: "Forbidden",
  reason,
});

export const validationError = (error: Error): InfraError => ({
  type: "ValidationError",
  error,
});