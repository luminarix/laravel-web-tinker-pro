import { useCallback, useEffect, useState } from 'react';
import { getSharedCode, shareCode } from '../services/api';
import type { ShareCodeRequest } from '../types';

export const useCodeSharing = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleShare = useCallback(
    async (code: string, title?: string) => {
      if (isSharing) return;

      setIsSharing(true);
      setShareError(null);
      setShareUrl(null);

      try {
        const request: ShareCodeRequest = {
          code: code.trim(),
          title,
        };

        const response = await shareCode(request);
        setShareUrl(response.url);

        // Copy to clipboard
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(response.url);
          alert(
            `Code shared successfully!\nURL copied to clipboard: ${response.url}`,
          );
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = response.url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert(`Code shared successfully!\nURL: ${response.url}`);
        }
      } catch (error) {
        console.error('Failed to share code:', error);
        setShareError(
          error instanceof Error ? error.message : 'Failed to share code',
        );
      } finally {
        setIsSharing(false);
      }
    },
    [isSharing],
  );

  const loadSharedCode = useCallback(async (shareId: string) => {
    try {
      const sharedData = await getSharedCode(shareId);
      return sharedData;
    } catch (error) {
      console.error('Failed to load shared code:', error);
      return null;
    }
  }, []);

  const getShareIdFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('share');
  }, []);

  const clearShareUrl = useCallback(() => {
    setShareUrl(null);
    setShareError(null);
  }, []);

  useEffect(() => {
    const shareId = getShareIdFromUrl();
    if (shareId) {
      loadSharedCode(shareId).then((sharedData) => {
        if (sharedData) {
          // The parent component will handle updating the code
          // This is just for loading detection
          console.log('Loaded shared code:', sharedData);
        }
      });
    }
  }, [getShareIdFromUrl, loadSharedCode]);

  return {
    isSharing,
    shareError,
    shareUrl,
    handleShare,
    loadSharedCode,
    getShareIdFromUrl,
    clearShareUrl,
  };
};
