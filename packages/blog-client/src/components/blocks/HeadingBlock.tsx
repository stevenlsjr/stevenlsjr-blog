
import { StreamBlockProps } from './index';
export default function HeadingBlock(props: StreamBlockProps<string>) {
  return <h1>{props.value}</h1>
}