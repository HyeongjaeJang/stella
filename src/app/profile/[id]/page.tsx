"use server";

import { getUser, getUserInfo } from "@/app/lib/actions";
import ProfileClient from "./profileClient";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const res = await getUser();
  if (!res?.user) {
    console.error("❌ User not found");
    return;
  }

  const info = await getUserInfo(res.user.id);
  console.log(info?.birth_date?.toISOString().slice(0, 10));
  console.log(info?.birth_time?.toISOString().slice(11, 16));

  return <ProfileClient user={res.user} />;
};

export default Page;
