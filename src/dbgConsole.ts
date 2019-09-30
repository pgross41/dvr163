/**
 * Write to console only if in debug mode
 */

const dbgConsole = (type: keyof Console = 'log', ...messages: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console[type](...messages);
  }
};

export const error = (...messages: any[]) => dbgConsole('error', ...messages);
export const info = (...messages: any[]) => dbgConsole('info', ...messages);
export const log = (...messages: any[]) => dbgConsole('log', ...messages);
export const warn = (...messages: any[]) => dbgConsole('warn', ...messages);
