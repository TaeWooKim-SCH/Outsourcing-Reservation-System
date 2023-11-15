export default function Title({ children, className }: React.ComponentProps<'h1'>) {
  return (
    <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>
  );
}