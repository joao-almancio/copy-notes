export function emitError(message: string) {
  const error = new Error(message);
  console.error(error)
  return error
}