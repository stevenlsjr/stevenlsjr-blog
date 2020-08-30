import { BlogIndex_allPages_edges_node_children_edges_node } from "../queries/__generated__/BlogIndex";
import {
  BlogIndex,
  BlogIndex_allPages_edges_node,
} from "../queries/__generated__/BlogIndex";
import Link from "next/link";

interface Props {
  page: BlogIndex_allPages_edges_node;
}

export function BlogPageLink({
  node,
}: {
  node: BlogIndex_allPages_edges_node_children_edges_node;
}) {
  const path = node.urlPath.split("/").filter((x) => !!x);
  path.unshift("posts");
  const href = "/" + path.join("/");
  return (
    <li>
      <Link href={href}>
        <a>{node.title}</a>
      </Link>
    </li>
  );
}

export default function IndexView({ page }: Props) {
  const blogIndexPage = page.blogindexpage ?? {
    intro: null,
  };
  let intro = <div></div>;
  if (blogIndexPage.intro !== null) {
    const innerHtml = { __html: blogIndexPage.intro };
    intro = <div dangerouslySetInnerHTML={innerHtml}></div>;
  }
  const links = page.children?.edges?.flatMap((edge) => {
    if (!edge || !edge.node) {
      return [];
    } else {
      return [<BlogPageLink key={edge.node.id} node={edge.node}></BlogPageLink>];
    }
  });
  return (
    <div>
      <section>
        <h1>{page.title}</h1>
        {intro}
        <ul>{links}</ul>
      </section>
    </div>
  );
}
