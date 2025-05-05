"use server";

import { getToday, getUser, getUserInfo } from "@/app/lib/actions";
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

  const today = await getToday(res.user.email);
  const info = await getUserInfo(id);

  return <ProfileClient user={res.user} today={today} info={info} />;
};

export default Page;
