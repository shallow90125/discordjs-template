export type ErrorMessage = string & { __brand: 'ErrorMessage' }
export const ErrorMessage = (error: unknown): ErrorMessage => {
  return (error instanceof Error ? error.message : String(error)) as ErrorMessage
}
