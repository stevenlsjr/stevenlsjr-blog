import React, { Component } from "react";
import { StreamBlockProps } from './blocks/';

const blogPageLookup = {
  'rich_text'
}

export default function StreamBlock({ type, value, id }: StreamBlockProps) {
  switch (type) {
    case "rich_text":
      return <div dangerouslySetInnerHTML={{ __html: value as string }}></div>;
    default:
      return (
        <div>
          {id}: Unknown block type {type}
        </div>
      );
  }
}
