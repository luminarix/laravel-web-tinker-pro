import DOMPurify from 'dompurify';

/**
 * Utility functions for detecting and safely rendering HTML content
 */

/**
 * Checks if a string contains HTML tags
 */
export const isHtmlContent = (content: string): boolean => {
  // Basic HTML detection - looks for opening and closing tags
  const htmlRegex = /<\/?[a-z][\s\S]*>/i;
  return htmlRegex.test(content.trim());
};

/**
 * Sanitizes HTML content using DOMPurify
 * Removes potentially dangerous elements and attributes while preserving safe HTML
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};

/**
 * Creates safe HTML props for React's dangerouslySetInnerHTML
 */
export const createSafeHtmlProps = (html: string) => {
  return {
    __html: sanitizeHtml(html),
  };
};
