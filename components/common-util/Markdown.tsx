import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { markdownComponents } from 'styles/globals';

const Markdown = ({
  className,
  children,
}: {
  className?: string;
  children?: string;
}) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    urlTransform={(uri) =>
      uri.startsWith('http') ? uri : `${process.env.NEXT_PUBLIC_API_URL}${uri}`
    }
    components={markdownComponents}
    className={className}
  >
    {children}
  </ReactMarkdown>
);

export default Markdown;
