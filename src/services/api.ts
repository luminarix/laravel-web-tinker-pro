import axios from 'axios';
import { nanoid } from 'nanoid';
import type {
  ExecuteCodeRequest,
  ExecuteCodeResponse,
  ShareCodeRequest,
  ShareCodeResponse,
} from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function executePhpCode(
  request: ExecuteCodeRequest,
): Promise<ExecuteCodeResponse> {
  // Mock delay to simulate network request
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000),
  );

  // Mock different outcomes based on code content
  const { code } = request;

  console.log(code);

  // Simulate syntax error
  if (code.includes('syntax_error')) {
    return {
      output: '',
      error: 'PHP Parse error: syntax error, unexpected token on line 1',
      executionTime: 0,
      memoryUsage: 0,
      exitCode: 1,
    };
  }

  // Simulate runtime error
  if (code.includes('runtime_error')) {
    return {
      output: '',
      error:
        'PHP Fatal error: Call to undefined function undefined_function() on line 1',
      executionTime: 0.012,
      memoryUsage: 1024,
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
  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 500));

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
  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 300));

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
