import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const Router = useRouter();

  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between items-center font-bold bg-slate-700 text-white pt-6">
      <div className="text-4xl font-mono">
        <Link href={"/"}>
          <button className="pl-8">Tech Vis</button>
        </Link>
      </div>
      <div className="flex ">
        <div className="pr-10 text-4xl font-mono">
          <Link href={`/docs`}>Documentation</Link>
        </div>
        <div className="pr-12 text-4xl font-mono">
          <Link href={status === "authenticated" ? "/mypage" : "/login"}>
            MyPage
          </Link>
        </div>
      </div>
    </nav>
  );
}
