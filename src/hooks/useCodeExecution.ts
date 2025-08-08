import { useCallback, useState } from 'react';
import { executePhpCode } from '../services/api';
import type { ExecuteCodeRequest, ExecutionState } from '../types';

export const useCodeExecution = () => {
  const [executionState, setExecutionState] = useState<ExecutionState>({
    isExecuting: false,
    result: null,
    error: null,
  });

  const executeCode = useCallback(
    async (code: string, stdin?: string) => {
      if (executionState.isExecuting) {
        return;
      }

      setExecutionState((prev) => ({
        ...prev,
        isExecuting: true,
        error: null,
      }));

      try {
        const request: ExecuteCodeRequest = {
          code: code.trim(),
          stdin,
        };

        const result = await executePhpCode(request);

        setExecutionState({
          isExecuting: false,
          result,
          error: null,
        });
      } catch (error) {
        console.error('Code execution failed:', error);

        setExecutionState({
          isExecuting: false,
          result: null,
          error:
            error instanceof Error
              ? error.message
              : 'Failed to execute code. Please try again.',
        });
      }
    },
    [executionState.isExecuting],
  );

  const clearOutput = useCallback(() => {
    setExecutionState({
      isExecuting: false,
      result: null,
      error: null,
    });
  }, []);

  return {
    executionState,
    executeCode,
    clearOutput,
  };
};
