export function formatRuntime(runtimeMs: number): string {
  if (runtimeMs < 1000) {
    return `${runtimeMs.toFixed(2)} ms`;
  }

  if (runtimeMs < 60000) {
    return `${(runtimeMs / 1000).toFixed(2)} s`;
  }

  const minutes = Math.floor(runtimeMs / 60000);
  const seconds = Math.floor((runtimeMs % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}
