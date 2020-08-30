/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogIndex
// ====================================================

export interface BlogIndex_allPages_edges_node_blogindexpage {
  __typename: "IndexPageNode";
  /**
   * The ID of the object.
   */
  id: string;
  intro: string;
}

export interface BlogIndex_allPages_edges_node_children_edges_node {
  __typename: "WagtailPageNode";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The page title as you'd like it to be seen by the public
   */
  title: string;
  /**
   * Optional. 'Search Engine Friendly' title. This will appear at the top of the browser window.
   */
  seoTitle: string;
  urlPath: string;
  pageType: string | null;
}

export interface BlogIndex_allPages_edges_node_children_edges {
  __typename: "PageEdge";
  /**
   * The item at the end of the edge
   */
  node: BlogIndex_allPages_edges_node_children_edges_node | null;
}

export interface BlogIndex_allPages_edges_node_children {
  __typename: "PageConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (BlogIndex_allPages_edges_node_children_edges | null)[];
}

export interface BlogIndex_allPages_edges_node {
  __typename: "WagtailPageNode";
  /**
   * The ID of the object.
   */
  id: string;
  urlPath: string;
  pageType: string | null;
  /**
   * The name of the page as it will appear in URLs e.g http: // domain.com/blog/[my-slug]/
   */
  slug: string;
  /**
   * Optional. 'Search Engine Friendly' title. This will appear at the top of the browser window.
   */
  seoTitle: string;
  /**
   * The page title as you'd like it to be seen by the public
   */
  title: string;
  blogindexpage: BlogIndex_allPages_edges_node_blogindexpage | null;
  children: BlogIndex_allPages_edges_node_children | null;
}

export interface BlogIndex_allPages_edges {
  __typename: "WagtailPageNodeEdge";
  /**
   * The item at the end of the edge
   */
  node: BlogIndex_allPages_edges_node | null;
}

export interface BlogIndex_allPages {
  __typename: "WagtailPageNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (BlogIndex_allPages_edges | null)[];
}

export interface BlogIndex {
  allPages: BlogIndex_allPages | null;
}

export interface BlogIndexVariables {
  indexPath?: string | null;
}
