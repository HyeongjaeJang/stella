import { getUser, getUserInfo } from "@/app/lib/actions";
import React from "react";
import CompatibilityClient from "./compatibilityClient";

interface Props {
  params: { id: string };
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

  return <CompatibilityClient info={info} />;
};

export default Page;
