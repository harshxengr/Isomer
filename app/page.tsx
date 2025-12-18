import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {

  let something = true;

  return (
    <div className={cn("text-red-500 font-bold", something === true && "bg-green-500")}>
      harsh
      <Button>harsh </Button>
    </div>
  );
}
