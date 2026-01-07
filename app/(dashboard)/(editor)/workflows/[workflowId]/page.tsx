import { Editor, EditorError, EditorLoading } from "@/editor/components/editor";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { prefetchWorkflow } from "@/workflows/server/prefetch";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
	params: Promise<{
		workflowId: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	await requireAuth();

	const { workflowId } = await params;
	prefetchWorkflow(workflowId);

	return (
		<HydrateClient>
			<ErrorBoundary fallback={<EditorError />}>
				<Suspense fallback={<EditorLoading />}>
					<Editor workflowId={workflowId} />
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	);
};

export default Page;
