"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "../../_components/Navbar";
import Image from "next/image";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";

const blogs = [
  {
    id: 0,
    slug: "demystifying-cap-theorem-for-qa-engineers",
    coverImage: "/blog1.png",

    title: {
      en: "Demystifying the CAP Theorem: A Guide for QA and Testing Engineers",
    },

    description: {
      en: "Think the CAP theorem is just for system architects? Think again. Here is how understanding Consistency, Availability, and Partition Tolerance changes how you design your test suites.",
    },

    content: {
      en: `## Why QA Engineers Need to Care About the CAP Theorem

When testing distributed systems, you aren't just checking if a button works or if an API returns a \`200 OK\`. You are testing how data flows across multiple servers, data centers, and networks. 

At the heart of every distributed system lies the **CAP Theorem** (Brewer's Theorem). It states that a distributed data store can simultaneously provide at most two of the following three guarantees:

* **Consistency (C):** Every read receives the most recent write or an error.
* **Availability (A):** Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
* **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

Because networks are inherently imperfect, network partitions **will** happen. Therefore, in production, a system must choose between **Consistency** or **Availability**.


## Designing Tests for the CAP Theorem

How do you actually inject this into your test suites? Here are three practical approaches:

### 1. Chaos Engineering & Network Partition Injection
You cannot test CAP guarantees under normal network conditions. You need to simulate a network split (the "P"). Tools like **Chaos Mesh**, **Toxiproxy**, or **LitmusChaos** allow you to introduce network latency or block communication between specific database nodes entirely.

### 2. Validating CP Systems (The Strict Test)
If your application is financial or transactional, it likely favors Consistency.
* **The Test:** Partition Node A from Node B. Write data to Node A. 
* **The Expected Result:** Attempting to read from Node B should result in a timeout, an error, or a blocked request until the partition is resolved. It should **never** return old data.

### 3. Validating AP Systems (The Eventual Consistency Test)
If your application is a social media feed or a shopping cart, it likely favors Availability.
* **The Test:** Split the network. Update a user profile on Node A. Query the same profile on Node B.
* **The Expected Result:** Node B should successfully return the old profile details (proving it is Available). Heal the network split. Wait a designated time window, then query Node B again. It should now show the updated details (proving Eventual Consistency).


## Summary

Don't leave CAP testing to the DevOps team. By understanding the trade-offs your system makes, you can write intentional, destructive test cases that ensure your application fails gracefully when the network inevitably breaks.`,
    },

    tags: [
      "Testing",
      "CAP Theorem",
      "Distributed Systems",
      "QA",
      "Chaos Engineering",
    ],
    category: "Software Testing",

    publishedAt: 1778943600,
  },
];
const MarkdownInitialStatePlugin = ({ markdown }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (markdown) {
      editor.update(() => {
        $convertFromMarkdownString(markdown, TRANSFORMERS);
      });
    }
  }, [editor, markdown]);

  return null;
};

// Lexical Editor Configuration
const initialConfig = {
  namespace: "BlogReader",
  editable: false,
  theme: {
    paragraph:
      "mb-4 text-base md:text-lg text-muted-foreground leading-relaxed",
    heading: {
      h1: "text-3xl font-semibold text-foreground mt-8 mb-4",
      h2: "text-2xl font-semibold text-foreground mt-8 mb-3 border-b border-muted pb-2",
      h3: "text-xl font-medium text-foreground mt-6 mb-2",
    },
    text: {
      bold: "font-semibold text-foreground",
      italic: "italic",
      code: "font-mono text-sm px-1.5 py-0.5 bg-muted rounded text-foreground",
    },
    list: {
      ul: "list-disc pl-6 mb-4 space-y-2 text-foreground",
      ol: "list-decimal pl-6 mb-4 space-y-2 text-foreground",
      nested: {
        listitem: "list-none",
      },
    },
    listitem: "text-base md:text-lg",
    quote: "border-l-4 border-primary pl-4 italic my-4 text-muted-foreground",
    table: "w-full my-6 border-collapse text-sm",
    tableRow: "border-b border-muted",
    tableCell: "p-3 text-left border border-muted text-foreground",
    tableCellHeader:
      "p-3 text-left font-semibold border border-muted bg-muted/50 text-foreground",
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    TableNode,
    TableCellNode,
    TableRowNode,
  ],
  onError: (error) => {
    console.error("Lexical Error:", error);
  },
};

const BlogDetailsPage = () => {
  const params = useParams();

  const blogId = Number(params.id);
  const blog = blogs[blogId];

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center font-mono text-muted-foreground">
          Article not found.
        </div>
      </>
    );
  }

  // Format the Unix timestamp into a readable date string
  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <Navbar />
      <article className="md:max-w-3xl md:mx-auto px-5 lg:px-0 pt-20 md:pt-28 pb-20">
        {/* Header Section */}
        <header className="space-y-4 mb-8">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-4 text-xl md:text-3xl font-semibold">
            {blog.title.en}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            {formattedDate && <span>{formattedDate}</span>} •
            <span>5 min read</span>
          </div>

          <p className="md:text-lg text-muted-foreground leading-relaxed">
            {blog.description.en}
          </p>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={blog.coverImage}
              alt={blog.title.en}
              className="w-full h-auto object-cover max-h-[400px]"
              width={500}
              height={300}
            />
          </div>
        )}

        {/* Main Content Body (Lexical Reader) */}
        <div className="mt-16 max-w-none">
          <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="outline-none" />}
              placeholder={null}
            />
            <MarkdownInitialStatePlugin markdown={blog.content.en} />
          </LexicalComposer>
        </div>
      </article>
    </>
  );
};

export default BlogDetailsPage;
