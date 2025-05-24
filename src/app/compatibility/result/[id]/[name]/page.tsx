import { CompatibilityResult, getUser, getUserInfo } from "@/app/lib/actions";
import ZSignClient from "./zSignClient";

type Props = {
  params: Promise<{ id: string; name: string }>;
};

const Page = async ({ params }: Props) => {
  const { id, name } = await params;
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

  return <ZSignClient name={name} info={info} comp={compatibility} />;
};

export default Page;
