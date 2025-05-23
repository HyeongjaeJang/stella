export const dynamic = "force-dynamic";

import { getToday, getUser, getUserInfo } from "@/app/lib/actions";
import ProfileClient from "./profileClient";

interface PageProps {
  params: Promise<{ id: string }>;
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

  if (!info) return <div>Not found</div>;

  return <ProfileClient user={res.user} today={today} info={info} />;
};

export default Page;
