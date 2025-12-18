import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/db"

export default async function Home() {

  let something = true;
  const users = await prisma.user.findMany();

  return (
    <div className={cn("text-red-500 font-bold", something === true && "bg-green-500")}>
      harsh
      <Button>harsh</Button>
      {users.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
