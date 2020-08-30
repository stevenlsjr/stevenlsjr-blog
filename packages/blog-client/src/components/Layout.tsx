import React, { ReactNode, PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout(props: PropsWithChildren<{}>) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
