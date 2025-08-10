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

export async function executePhpCode(
  request: ExecuteCodeRequest,
): Promise<ExecuteCodeResponse> {
  try {
    const response = await axios.post<ServerResponse>('/tinker-pro', {
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
  // In real implementation:
  // return (await api.get(`/share/${shareId}`)).data;

  // Mock retrieval from localStorage
  const stored = localStorage.getItem(`shared_${shareId}`);
  if (stored) {
    return JSON.parse(stored);
  }

  return null;
}
