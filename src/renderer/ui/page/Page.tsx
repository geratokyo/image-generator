export type PageProps = React.HTMLProps<HTMLDivElement>;

export const Page: React.FC<PageProps> = (props) => {

  return <div {...props}>{props.children}</div>;
}
