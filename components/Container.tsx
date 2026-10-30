export default function Container({ children }: React.PropsWithChildren) {
  return <div className="container mx-auto px-6">{children}</div>;
}
