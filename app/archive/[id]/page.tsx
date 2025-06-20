import Link from "next/link";
import { getPostData, getAllPostIds } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CSSProperties } from "react";

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link
                href="/archive"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Archive
              </Link>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {postData.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{postData.date}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-primary/20 text-primary text-sm rounded-full">
                {postData.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Content */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-h2:text-foreground prose-h3:text-foreground prose-strong:to-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus as any}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {postData.content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
