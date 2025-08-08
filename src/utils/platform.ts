/**
 * Detects if the user is on a Mac operating system
 * @returns true if running on macOS, false otherwise
 */
export const isMac = (): boolean => {
  return (
    typeof navigator !== 'undefined' &&
    navigator.platform.toUpperCase().indexOf('MAC') >= 0
  );
};
