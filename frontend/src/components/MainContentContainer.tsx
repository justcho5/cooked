interface Props {
  children: React.ReactNode;
}

export function MainContentContainer({ children }: Props) {
  return <div className="max-w-screen-md w-[100%] px-10 py-5">{children}</div>;
}
