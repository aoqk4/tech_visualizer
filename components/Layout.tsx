import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const Router = useRouter();

  return (
    <nav className="flex justify-between items-center font-bold bg-slate-700 text-white pt-6">
      <div className="text-4xl font-mono">
        <Link href={"/"}>
          <button className="pl-8">TITLE</button>
        </Link>
      </div>
      <div className="flex ">
        <div className="pr-10 text-4xl font-mono">
          <Link href={`/login`}>Documentation</Link>
        </div>
        <div className="pr-12 text-4xl font-mono">
          <Link href={`/login`}>My Page</Link>
        </div>
      </div>
    </nav>
  );
}
