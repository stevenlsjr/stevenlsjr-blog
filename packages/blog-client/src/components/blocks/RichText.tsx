import { StreamBlockProps } from './index';
export default function RichTextBlock(props: StreamBlockProps<string>) {
  return <div dangerouslySetInnerHTML={{__html: props.value}}></div>
}