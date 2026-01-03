import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import {
    WorkflowsContainer,
    WorkflowsErrorView,
    WorkflowsList,
    WorkflowsLoadingView
} from "@/workflows/components/workflows";
import { workflowsParamsLoader } from "@/workflows/server/params-loader";
import { prefetchWorkflows } from "@/workflows/server/prefetch";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
    searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflows(params);

    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<WorkflowsErrorView />}>
                    <Suspense fallback={<WorkflowsLoadingView />}>
                        <WorkflowsList />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    )
}

export default Page;