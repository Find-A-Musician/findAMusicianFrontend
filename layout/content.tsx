type Props = {
  /**Header component */
  Header: JSX.Element;
  children: JSX.Element;
};

export default function ContentLayout({ Header, children }: Props) {
  return (
    <div className="flex flex-col pb-10">
      <div className="sticky top-0">{Header}</div>
      <div className="flex flex-col flex-grow gap-8">{children}</div>
    </div>
  );
}
