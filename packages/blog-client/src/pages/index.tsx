import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { gql } from "@apollo/client";
import client from "../services/apollo-client";
import blogIndex from "../queries/blog-index.graphql";
import { BlogIndex } from "../queries/__generated__/BlogIndex";
import { useRouter } from "next/dist/client/router";
import IndexView from '../components/IndexView';
export interface IndexPageProps {}

const rootSlug = "steves-blog";

interface Props {
  blogIndexData: BlogIndex | undefined;
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const { data } = await client.query<BlogIndex>({
    query: blogIndex,
    variables: {
      indexPath: `/${rootSlug}/`,
    },
  });
  ctx.res.statusCode = 404
  return {
    props: {
      blogIndexData: data,
    },
  };
}

export default function IndexPage({ blogIndexData }: Props) {
  const router = useRouter();
  const indexPageNode = blogIndexData?.allPages?.edges[0]?.node
  if (indexPageNode === null || indexPageNode === undefined) {
    return <div>Erorr! not found</div>
  }
  return (
    <IndexView page={indexPageNode}></IndexView>
  );
}
