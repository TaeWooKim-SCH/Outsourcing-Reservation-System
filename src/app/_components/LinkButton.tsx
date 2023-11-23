import Link from "next/link";

interface PropsType {
  children: React.ReactNode;
  href: string;
  className: string;
}

export default function LinkButton({ children, href, className }: PropsType) {
  return (
    <div>
      <Link className={`text-white bg-[#1891C3] py-1 px-4 ${className}`} href={href}>{children}</Link>
    </div>
  );
}