export default function TableHeaderElement({ children, className }: React.ComponentProps<'th'>) {
  return (
    <th className={`text-center border-b-2 border-black ${className}`}>{children}</th>
  );
}