export function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

// how to use:

// 1. create debouncer var
// const debouncerX = debounce(() => console.log(newMessageText), 250);

// 2. call debounce through debouncer var
// debouncerX();
