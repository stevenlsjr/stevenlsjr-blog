/// <reference types="react-scripts" />
declare module 'babel-plugin-relay/macro' {
  export default function graphql(strings: TemplateStringsArray, ...args: any[])
}