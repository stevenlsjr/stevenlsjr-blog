import React, { Component } from "react";
import { BlogIndex_allPages_edges_node } from "../queries/__generated__/BlogIndex";
import { PageFromUrlPath_allPages_edges_node } from "../queries/__generated__/PageFromUrlPath";
import BlogPageView from "./BlogPageView";

export interface PageViewProps {
  pageNode: PageFromUrlPath_allPages_edges_node;
}
export default function PageView({ pageNode }: PageViewProps) {
  if (!pageNode) {
    throw new Error("pageNode is null");
  }
  if (pageNode.blogpage) {
    return <BlogPageView pageNode={pageNode} blogPage={pageNode.blogpage} />;
  } else {
    return <div></div>;
  }
}
