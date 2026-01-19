type AuthEvent = 'refresh-failed' | 'logout';

type Listener = (event: AuthEvent) => void;

const listeners: Listener[] = [];

export function onAuthEvent(listener: Listener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function emitAuthEvent(event: AuthEvent) {
  listeners.forEach((l) => {
    try {
      l(event);
    } catch (e) {
      console.error('Error handling auth event', e);
    }
  });
}
