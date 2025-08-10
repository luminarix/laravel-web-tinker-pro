import axios from 'axios';
import { nanoid } from 'nanoid';
import type {
  ExecuteCodeRequest,
  ExecuteCodeResponse,
  ShareCodeRequest,
  ShareCodeResponse,
} from '../types';

const API_BASE_URL = 'https://backend.helixmetrics.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

/*
 * Error Simulation Testing Keywords:
 *
 * Network Errors (triggers immediately):
 * - 'network_timeout' - Simulates request timeout
 * - 'network_error' - Simulates connection refused
 * - 'server_error' - Simulates 500 server error
 *
 * PHP Errors:
 * - 'syntax_error' - Random PHP syntax errors
 * - 'runtime_error' or 'undefined_function' - Random PHP runtime errors
 * - 'warning_error' - PHP warnings with partial output
 * - 'memory_error' - Memory exhaustion error
 * - 'timeout_error' - Script execution timeout
 *
 * Random Errors:
 * - 5% chance of random network error on any execution
 * - 3% chance of network error on code sharing
 * - 2% chance of network error on retrieving shared code
 */

export async function executePhpCode(
  request: ExecuteCodeRequest,
): Promise<ExecuteCodeResponse> {
  // Simulate network errors randomly (5% chance)
  if (Math.random() < 0.05) {
    const networkErrors = [
      'Network Error: Request timeout after 10 seconds',
      'Network Error: Connection refused - server may be down',
      'Network Error: DNS resolution failed',
      'Network Error: SSL certificate verification failed',
      'Network Error: Connection reset by peer',
    ];
    throw new Error(
      networkErrors[Math.floor(Math.random() * networkErrors.length)],
    );
  }

  // Simulate specific network errors based on code content
  if (request.code.includes('network_timeout')) {
    await new Promise((resolve) => setTimeout(resolve, 15000)); // Simulate timeout
    throw new Error('Network Error: Request timeout after 10 seconds');
  }

  if (request.code.includes('network_error')) {
    throw new Error('Network Error: Connection refused - server may be down');
  }

  if (request.code.includes('server_error')) {
    throw new Error('Server Error: Internal server error (500)');
  }

  // Mock delay to simulate network request (variable delay based on code complexity)
  const baseDelay = 800;
  const complexityMultiplier = Math.min(request.code.length / 100, 5);
  const networkDelay =
    baseDelay + complexityMultiplier * 200 + Math.random() * 1000;

  await new Promise((resolve) => setTimeout(resolve, networkDelay));

  // Mock different outcomes based on code content
  const { code } = request;

  console.log(code);

  // Enhanced PHP error simulation with more realistic errors
  if (code.includes('syntax_error') || code.match(/[;{}]\s*[;{}]/)) {
    const syntaxErrors = [
      'PHP Parse error: syntax error, unexpected token "}" on line 3',
      'PHP Parse error: syntax error, unexpected end of file, expecting ";" on line 5',
      'PHP Parse error: syntax error, unexpected "(" on line 2',
      'PHP Parse error: syntax error, unexpected T_VARIABLE on line 1',
      'PHP Parse error: syntax error, unexpected ";" on line 4',
    ];
    return {
      output: '',
      error: syntaxErrors[Math.floor(Math.random() * syntaxErrors.length)],
      executionTime: 0,
      memoryUsage: 0,
      exitCode: 1,
    };
  }

  if (code.includes('runtime_error') || code.includes('undefined_function')) {
    const runtimeErrors = [
      'PHP Fatal error: Call to undefined function undefined_function() on line 1',
      'PHP Fatal error: Class "NonExistentClass" not found on line 2',
      'PHP Fatal error: Call to undefined method stdClass::nonExistentMethod() on line 3',
      'PHP Fatal error: Maximum execution time of 30 seconds exceeded on line 1',
      'PHP Fatal error: Allowed memory size of 134217728 bytes exhausted on line 2',
    ];
    return {
      output: '',
      error: runtimeErrors[Math.floor(Math.random() * runtimeErrors.length)],
      executionTime: 0.012 + Math.random() * 0.05,
      memoryUsage: 1024 + Math.random() * 2048,
      exitCode: 1,
    };
  }

  if (code.includes('warning_error')) {
    const warnings = [
      'PHP Warning: Division by zero on line 1\nResult: INF',
      'PHP Warning: Undefined variable $undefinedVar on line 2\nResult: null',
      'PHP Warning: array_merge(): Expected parameter 1 to be array, string given on line 1',
      'PHP Warning: Use of undefined constant UNDEFINED_CONSTANT on line 3',
    ];
    const warning = warnings[Math.floor(Math.random() * warnings.length)];
    return {
      output: warning.split('\n')[1] || '',
      error: warning.split('\n')[0],
      executionTime: 0.025 + Math.random() * 0.03,
      memoryUsage: 1024 + Math.random() * 512,
      exitCode: 0,
    };
  }

  if (code.includes('memory_error')) {
    return {
      output: '',
      error:
        'PHP Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 268435456 bytes) on line 1',
      executionTime: 2.156,
      memoryUsage: 134217728,
      exitCode: 1,
    };
  }

  if (code.includes('timeout_error')) {
    return {
      output: 'Script started...\n',
      error:
        'PHP Fatal error: Maximum execution time of 30 seconds exceeded on line 1',
      executionTime: 30.0,
      memoryUsage: 2048 + Math.random() * 1024,
      exitCode: 1,
    };
  }

  // Simulate successful execution
  let mockOutput = '';

  if (code.includes('echo') || code.includes('print')) {
    // Extract potential output from echo/print statements
    const echoMatches = code.match(/echo\s+["']([^"']*)["']/g);
    const printMatches = code.match(/print\s+["']([^"']*)["']/g);

    if (echoMatches) {
      echoMatches.forEach((match) => {
        const content = match.match(/["']([^"']*)["']/)?.[1];
        if (content) mockOutput += `${content}\n`;
      });
    }

    if (printMatches) {
      printMatches.forEach((match) => {
        const content = match.match(/["']([^"']*)["']/)?.[1];
        if (content) mockOutput += `${content}\n`;
      });
    }

    if (!mockOutput) {
      mockOutput =
        'Hello, World!\nWelcome to Laravel Web Tinker!\nHello, Developer!\n';
    }
  } else {
    mockOutput = 'Code executed successfully (no output)\n';
  }

  // Real implementation would be:
  // return (await api.post('/execute-php', request)).data;

  return {
    output: mockOutput.trim(),
    error: null,
    executionTime: 0.042 + Math.random() * 0.1,
    memoryUsage: 1024 + Math.random() * 1024,
    exitCode: 0,
  };
}

export async function shareCode(
  request: ShareCodeRequest,
): Promise<ShareCodeResponse> {
  // Simulate network errors for sharing (3% chance)
  if (Math.random() < 0.03) {
    const shareNetworkErrors = [
      'Network Error: Failed to connect to sharing service',
      'Network Error: Share service temporarily unavailable',
      'Server Error: Unable to generate share link (503)',
    ];
    throw new Error(
      shareNetworkErrors[Math.floor(Math.random() * shareNetworkErrors.length)],
    );
  }

  // Mock delay with slight variation
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 300),
  );

  const shareId = nanoid(8);

  // In real implementation:
  // return (await api.post('/share', request)).data;

  // Mock storage in localStorage for demo
  localStorage.setItem(`shared_${shareId}`, JSON.stringify(request));

  return {
    shareId,
    url: `${window.location.origin}?share=${shareId}`,
  };
}

export async function getSharedCode(
  shareId: string,
): Promise<ShareCodeRequest | null> {
  // Simulate network errors for retrieving shared code (2% chance)
  if (Math.random() < 0.02) {
    const retrieveNetworkErrors = [
      'Network Error: Failed to load shared code',
      'Network Error: Share service unavailable',
      'Server Error: Share not found or expired (404)',
    ];
    throw new Error(
      retrieveNetworkErrors[
        Math.floor(Math.random() * retrieveNetworkErrors.length)
      ],
    );
  }

  // Mock delay with variation
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 200),
  );

  // In real implementation:
  // return (await api.get(`/share/${shareId}`)).data;

  // Mock retrieval from localStorage
  const stored = localStorage.getItem(`shared_${shareId}`);
  if (stored) {
    return JSON.parse(stored);
  }

  return null;
}

export default api;
