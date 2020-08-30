/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageFromUrlPath
// ====================================================

export interface PageFromUrlPath_allPages_edges_node_blogindexpage {
  __typename: "IndexPageNode";
  intro: string;
}

export interface PageFromUrlPath_allPages_edges_node_blogpage {
  __typename: "BlogPageNode";
  intro: string;
  body: any;
}

export interface PageFromUrlPath_allPages_edges_node {
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
  /**
   * The name of the page as it will appear in URLs e.g http: // domain.com/blog/[my-slug]/
   */
  slug: string;
  lastPublishedAt: any | null;
  blogindexpage: PageFromUrlPath_allPages_edges_node_blogindexpage | null;
  blogpage: PageFromUrlPath_allPages_edges_node_blogpage | null;
}

export interface PageFromUrlPath_allPages_edges {
  __typename: "WagtailPageNodeEdge";
  /**
   * The item at the end of the edge
   */
  node: PageFromUrlPath_allPages_edges_node | null;
}

export interface PageFromUrlPath_allPages {
  __typename: "WagtailPageNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (PageFromUrlPath_allPages_edges | null)[];
}

export interface PageFromUrlPath {
  allPages: PageFromUrlPath_allPages | null;
}

export interface PageFromUrlPathVariables {
  path?: string | null;
}
