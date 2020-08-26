import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {  gql } from "@apollo/client";
import client from '../services/apollo-client'
import {blogIndex} from '../queries/blog-index'
export interface IndexPageProps {}



export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<{ props: IndexPageProps }> {
  const {data} = await client.query({query: blogIndex})
  
  return { props: {} };
}


export default function IndexPage({data}: any) {
  
  return <div>Hi {JSON.stringify(data)}</div>;
}
