import type React from 'react';
import { createSafeHtmlProps, isHtmlContent } from '../utils/htmlRenderer';

interface OutputRendererProps {
  content: string;
  className?: string;
}

const OutputRenderer: React.FC<OutputRendererProps> = ({
  content,
  className = 'output-text',
}) => {
  // Check if content contains HTML
  if (isHtmlContent(content)) {
    return (
      <div
        className={`${className} html-output`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: We sanitize HTML content before rendering
        dangerouslySetInnerHTML={createSafeHtmlProps(content)}
      />
    );
  }

  // Render as plain text
  return <pre className={className}>{content}</pre>;
};

export default OutputRenderer;
