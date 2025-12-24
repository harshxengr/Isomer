"use client"

import { SignOutBtn } from "@/components/auth/signout-btn";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Home() {
  // await requireAuth();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // const data = await caller.getUsers();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job queued");
    }
  }));

  const textAi = useMutation(trpc.textAi.mutationOptions({
    onSuccess: () => {
      toast.success("TextAi job queued");
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  }));

  return (
    <div>
      hi thete
      {JSON.stringify(data)}
      <SignOutBtn />
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <Button disabled={textAi.isPending} onClick={() => textAi.mutate()}>
        Test Ai
      </Button>
    </div>
  );
}
