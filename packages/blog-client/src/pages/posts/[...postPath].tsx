import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import React from "react";
import client from "../../services/apollo-client";
import pageFromUrlPath  from "../../queries/page-from-url-path.graphql";
import { PageFromUrlPath } from "../../queries/__generated__/PageFromUrlPath";
import ErrorPage from "../_error";
import PageView from '../../components/PageView'

const rootSlug = ["steve-blog"];

interface Props {
  postPath: string[];
  urlPath: string;
  pageFromUrlPath: PageFromUrlPath | undefined;
  status: number
  statusMessage: string
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props> | void> {
  let postPath = ctx.query.postPath;
  if (typeof postPath === "string") {
    postPath = [postPath];
  }
  postPath = postPath.filter((x) => !!x);
  let status = 200
  let statusMessage = 'Ok'
  const urlPath = postPath.length > 1 ? "/" + postPath.join("/") + "/" : "/";
  const { data } = await client.query<PageFromUrlPath>({
    query: pageFromUrlPath,
    variables: { path: urlPath },
  });
  const nEdges = data?.allPages?.edges?.length ?? 0;
  if (nEdges < 1) {
    status = 404
    statusMessage = 'Not Found'
  }
  if (nEdges > 1){
    status = 500
    console.error('too many pages found:', nEdges)
    statusMessage = 'Server Error'
  }

  console.log(data);
  return {
    props: { postPath, urlPath, pageFromUrlPath: data, status, statusMessage },
  };
}

export default function PostPathPage({ postPath, urlPath, pageFromUrlPath , status, statusMessage} : Props) {
  if (status >= 300 || status <200){
    const props = {status, statusMessage}
    return <ErrorPage {...props} />
  }
  const pageNode = (pageFromUrlPath?.allPages?.edges[0]?.node ?? null)
  if (pageNode === null) {
    throw new Error('programming error, pageNode is null')
  }
  return (
    <div>
      <PageView pageNode={pageNode} />
    </div>
  );
}
