export enum Errors {
  // Invalid input
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_ENTRY = 'INVALID_ENTRY',
  IS_EMPTY = 'IS_EMPTY',

  // Database errors
  // Duplicated
  DUPLICATED_ENTRY = 'DUPLICATED_ENTRY',
  DATABASE_ERROR = 'DATABASE_ERROR',

  // Not found
  NOT_FOUND = 'NOT_FOUND',

  // Unauthorized
  UNAUTHORIZED = 'UNAUTHORIZED',

  // Forbidden
  FORBIDDEN = 'FORBIDDEN',

  // Internal server error
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',

  // Unhandled error
  UNHANDLED_ERROR = 'UNHANDLED_ERROR',
}
