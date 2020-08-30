import { PageViewProps } from "./PageView";
import { PageFromUrlPath_allPages_edges_node_blogpage } from "../queries/__generated__/PageFromUrlPath";
import UnknownBlock from "./blocks/UnknownBlock";
import HeadingBlock from "./blocks/HeadingBlock";
import RichTextBlock from "./blocks/RichText";

interface Props extends PageViewProps {
  blogPage: PageFromUrlPath_allPages_edges_node_blogpage;
}

const blockLookup = new Map([
  ["rich_text", RichTextBlock],
  ["heading", HeadingBlock],
]);

function getBlockBody(
  type: string
): typeof RichTextBlock | typeof HeadingBlock | typeof UnknownBlock {
  return blockLookup.get(type) || UnknownBlock;
}

export default function BlogPageView({ pageNode, blogPage }: Props) {
  const body = (blogPage.body as any[]).map((block) => {
    const props = { ...block, key: block.id };
    const Component = getBlockBody(block.type);
    return <Component {...props} />;
  });
  return (
    <article>
      <header>
        <h1>{pageNode.title}</h1>
      </header>
      <section className="blog-page-intro">
        <div dangerouslySetInnerHTML={{ __html: blogPage.intro }}></div>
      </section>
      <section className="blog-page-content">{body}</section>
    </article>
  );
}
