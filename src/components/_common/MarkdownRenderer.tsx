import React, { CSSProperties, useContext } from "react";
import TeX from "@matejmazur/react-katex";
import math from "remark-math";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { DarkModeContext } from "../../contexts";
import "./MarkdownRenderer.css";

interface Props {
  text: string;
  height?: string;
  style?: CSSProperties;
}

export const MarkdownRenderer = (props: Props) => {
  const { darkMode } = useContext(DarkModeContext);

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
