export function MainContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-screen-md w-[100%] px-10 py-5">{children}</div>;
}
