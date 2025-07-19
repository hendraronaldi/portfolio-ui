import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: false,
    mangle: false,
  });

  // Custom renderer for better styling
  const renderer = new marked.Renderer();
  
  // Override link rendering to open in new tab and add security
  renderer.link = (href, title, text) => {
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">${text}</a>`;
  };

  // Override code block rendering
  renderer.code = (code, language) => {
    const lang = language || '';
    return `<pre class="bg-gray-800 rounded-lg p-3 my-2 overflow-x-auto border border-gray-600"><code class="text-sm text-gray-100 language-${lang}">${code}</code></pre>`;
  };

  // Override inline code rendering
  renderer.codespan = (code) => {
    return `<code class="bg-gray-700 px-2 py-1 rounded text-sm text-blue-300 font-mono">${code}</code>`;
  };

  // Override blockquote rendering
  renderer.blockquote = (quote) => {
    return `<blockquote class="border-l-4 border-blue-500 pl-4 my-2 italic text-gray-300 bg-gray-800/50 py-2 rounded-r">${quote}</blockquote>`;
  };

  // Override list rendering
  renderer.list = (body, ordered) => {
    const tag = ordered ? 'ol' : 'ul';
    const className = ordered ? 'list-decimal list-inside space-y-1 my-2 ml-4' : 'list-disc list-inside space-y-1 my-2 ml-4';
    return `<${tag} class="${className}">${body}</${tag}>`;
  };

  // Override list item rendering
  renderer.listitem = (text) => {
    return `<li class="text-gray-200">${text}</li>`;
  };

  // Override heading rendering
  renderer.heading = (text, level) => {
    const sizes = {
      1: 'text-xl font-bold text-white mb-3 mt-4',
      2: 'text-lg font-semibold text-white mb-2 mt-3',
      3: 'text-base font-medium text-white mb-2 mt-2',
      4: 'text-sm font-medium text-gray-200 mb-1 mt-2',
      5: 'text-sm font-normal text-gray-300 mb-1 mt-1',
      6: 'text-xs font-normal text-gray-400 mb-1 mt-1'
    };
    const className = sizes[level as keyof typeof sizes] || sizes[3];
    return `<h${level} class="${className}">${text}</h${level}>`;
  };

  // Override paragraph rendering
  renderer.paragraph = (text) => {
    return `<p class="text-gray-200 mb-2 leading-relaxed">${text}</p>`;
  };

  // Override strong (bold) rendering
  renderer.strong = (text) => {
    return `<strong class="font-bold text-white">${text}</strong>`;
  };

  // Override emphasis (italic) rendering
  renderer.em = (text) => {
    return `<em class="italic text-gray-100">${text}</em>`;
  };

  // Override horizontal rule rendering
  renderer.hr = () => {
    return `<hr class="border-gray-600 my-4" />`;
  };

  // Override table rendering
  renderer.table = (header, body) => {
    return `<div class="overflow-x-auto my-4"><table class="min-w-full border border-gray-600 rounded-lg">${header}${body}</table></div>`;
  };

  renderer.tablerow = (content) => {
    return `<tr class="border-b border-gray-600">${content}</tr>`;
  };

  renderer.tablecell = (content, flags) => {
    const tag = flags.header ? 'th' : 'td';
    const className = flags.header 
      ? 'px-4 py-2 bg-gray-700 text-white font-semibold text-left' 
      : 'px-4 py-2 text-gray-200';
    return `<${tag} class="${className}">${content}</${tag}>`;
  };

  // Set the custom renderer
  marked.setOptions({ renderer });

  // Parse markdown and sanitize HTML
  const parseMarkdown = (markdown: string): string => {
    try {
      const html = marked(markdown);
      // Sanitize HTML but allow our custom classes and attributes
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's',
          'a', 'ul', 'ol', 'li',
          'blockquote', 'code', 'pre',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'hr', 'div', 'span'
        ],
        ALLOWED_ATTR: [
          'href', 'title', 'target', 'rel', 'class',
          'id', 'data-*'
        ],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|xxx):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
      });
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return content; // Fallback to original content
    }
  };

  const htmlContent = parseMarkdown(content);

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;