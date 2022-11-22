export const errorCode = (error: unknown): number => {
  let result = 0;
  let message = '';
  if (error instanceof Error) message = error.message;
  if (message.indexOf('404') !== -1) {
    result = 404;
  } else if (message.indexOf('429') !== -1) {
    result = 429;
  }
  return result;
};
