export type AppError = {
  message?: string,
  messageKey?: string,
}

export type ErrorFallbackPropsType = {
  error?: Error,
  resetErrorBoundary?: Function,
}

export enum APIErrorCodeType {
  SERVER_ERROR = 'SERVER_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  INTEGRATION_ERROR = 'INTEGRATION_ERROR',
}

export type APIError = {
  code: APIErrorCodeType
  details: string
  messages: string[]
  requestId?: string
};
