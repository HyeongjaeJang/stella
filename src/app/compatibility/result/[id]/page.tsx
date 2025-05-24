import { CompatibilityResult, getUser, getUserInfo } from "@/app/lib/actions";
import React from "react";
import ResultClient from "./resultClient";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await getUser();
  if (!res?.user) {
    console.log("❌ User not found");
    return;
  }

  const info = await getUserInfo(id);
  if (!info) return <div>Not Found</div>;

  const compatibility = await CompatibilityResult(info.id);
  if (!compatibility) {
    return <div>Not Found</div>;
  }

  return <ResultClient info={info} comp={compatibility} />;
};

export default Page;
