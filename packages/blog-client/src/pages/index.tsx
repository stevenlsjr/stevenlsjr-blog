import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export interface IndexPageProps {}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<{ props: IndexPageProps }> {
  return { props: {} };
}

export default function IndexPage({}: IndexPageProps) {
  const data = [{}]
  return <div>{JSON.stringify(data)}</div>;
}
