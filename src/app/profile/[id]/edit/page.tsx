import { editUser, getUserInfo } from "@/app/lib/actions";
import EditClient from "./editClient";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const info = await getUserInfo(id);
  if (!info) return <div>Not found</div>;

  const action = editUser.bind(null, info.id);

  return <EditClient editAction={action} info={info} />;
};

export default Page;
