"use client";

import { ErrorView, LoadingView } from "@/components/custom/entity-components";
import { useSuspenseWorkflow } from "@/workflows/hooks/use-workflows";

export const Editor = ({ workflowId }: { workflowId: string }) => {
	const { data: workflow } = useSuspenseWorkflow(workflowId);

	return <p>{JSON.stringify(workflow, null, 2)}</p>;
};

export const EditorLoading = () => {
    return <LoadingView message="Loading editor..."/>
};

export const EditorError = () => {
    return <ErrorView message="Error Loading editor"/>
}
