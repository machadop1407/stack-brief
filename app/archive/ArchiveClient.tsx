"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Post = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ArchiveClient({ allPosts }: { allPosts: Post[] }) {
  return (
    <div className="bg-background">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Newsletter Archive
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse through all our past issues and discover insights that
              matter.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Grid */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {allPosts.map(({ id, date, title, excerpt, category }) => (
                <motion.article
                  key={id}
                  className="bg-card border border-border rounded-lg p-6"
                  variants={itemVariants}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm text-muted-foreground">
                          {date}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                          {category}
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold mb-3 text-foreground hover:text-primary transition-colors">
                        <Link href={`/archive/${id}`}>{title}</Link>
                      </h2>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {excerpt}
                      </p>

                      <Link
                        href={`/archive/${id}`}
                        className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors"
                      >
                        Read full issue →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
