import { Component, ComponentClass, ComponentType } from "react";

export interface StreamBlockProps<T = any> {
  type: string;
  value: T;
  id: string;
}

export type BlockComponent<T> = ComponentType<StreamBlockProps<T>>;


export interface RenderBlockProps<T=any> {
  lookup(type: string): StreamBlockProps<T>;
}

