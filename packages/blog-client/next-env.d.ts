/// <reference types="next" />
/// <reference types="next/types/global" />

import { DocumentNode } from "graphql";

declare module '*.graphql' {
  const node: DocumentNode
  export default node
}