import { requireAuth } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await requireAuth();
  
  // Redirect authenticated users to workflows
  if (session) {
    redirect("/workflows");
  }
  
  // This should not be reached due to requireAuth redirecting unauthenticated users
  redirect("/signin");
}

