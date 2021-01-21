import React, { CSSProperties } from "react";
import TeX from "@matejmazur/react-katex";
import math from "remark-math";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import "./MarkdownRenderer.css";

interface Props {
  text: string;
  height?: string;
  style?: CSSProperties;
}

export const MarkdownRenderer = (props: Props) => {
  const renderers = {
    inlineMath: ({ value }: any) => <TeX math={value} />,
    math: ({ value }: any) => <TeX math={value} block />,
  };

  return (
    <div
      className="markdown-renderer"
      style={{ minHeight: props.height, ...props.style }}
    >
      <ReactMarkdown
        plugins={[math, remarkGfm]}
        renderers={renderers}
        children={props.text}
        allowDangerousHtml={false}
      />
    </div>
  );
};
