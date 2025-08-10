import axios from 'axios';
import { nanoid } from 'nanoid';
import type {
  ExecuteCodeRequest,
  ExecuteCodeResponse,
  ServerResponse,
  ShareCodeRequest,
  ShareCodeResponse,
} from '../types';
import { formatRuntime, formatTimestamp } from '../utils/formatter.ts';

const API_BASE_URL = 'https://backend.helixmetrics.dev/tinker-pro';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function executePhpCode(
  request: ExecuteCodeRequest,
): Promise<ExecuteCodeResponse> {
  try {
    const response = await api.post<ServerResponse>('/', {
      code: request.code,
    });
    const data = response.data;

    return {
      timestamp: formatTimestamp(data.timestamp),
      runtime: formatRuntime(data.runtime),
      memoryUsage: data.memoryUsage,
      output: data.output,
      outputSize: data.outputSize,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Network Error: ${error.response?.statusText || error.message}`,
      );
    }
    throw error;
  }
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
