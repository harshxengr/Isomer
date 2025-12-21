import { SignOutBtn } from "@/components/auth/signout-btn";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div>
      hi thete
      {JSON.stringify(data)}
      <SignOutBtn/>
    </div>
  );
}
