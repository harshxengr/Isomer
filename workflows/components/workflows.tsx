"use client";

import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
	EmptyView,
	EntityContainer,
	EntityHeader,
	EntityItem,
	EntityList,
	EntityPagination,
	EntitySearch,
	ErrorView,
	LoadingView,
} from "@/components/custom/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import type { Workflow } from "@/lib/generated/prisma/client";
import { useEntitySearch } from "../hooks/use-entity-search";
import {
	useCreateWorkflow,
	useRemoveWorkflow,
	useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

export const WorkflowsSearch = () => {
	const [params, setParams] = useWorkflowsParams();
	const { searchValue, onSearchChange } = useEntitySearch({
		params,
		setParams,
	});

	return (
		<EntitySearch
			value={searchValue}
			onChange={onSearchChange}
			placeholder="Search workflows"
		/>
	);
};

export const WorkflowsList = () => {
	const workflows = useSuspenseWorkflows();

	return (
		<EntityList
			items={workflows.data.items}
			getKey={(workflow) => workflow.id}
			renderItem={(workflow) => <WorkflowItem data={workflow} />}
			emptyView={<WorkflowsEmptyView />}
		/>
	);
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
	const createWorkflow = useCreateWorkflow();
	const router = useRouter();
	const { handleError, modal } = useUpgradeModal();

	const handleCreate = () => {
		createWorkflow.mutate(undefined, {
			onSuccess: (data) => {
				router.push(`/workflows/${data.id}`);
			},
			onError: (error) => {
				handleError(error);
			},
		});
	};
	return (
		<>
			{modal}
			<EntityHeader
				title="Workflows"
				description="Create and manage your workflows"
				onNew={handleCreate}
				newButtonLabel="New workflow"
				disabled={disabled}
				isCreating={createWorkflow.isPending}
			/>
		</>
	);
};

export const WorkflowsPagination = () => {
	const workflows = useSuspenseWorkflows();
	const [params, setParams] = useWorkflowsParams();

	return (
		<EntityPagination
			disabled={workflows.isFetching}
			totalPages={workflows.data.totalPages}
			page={workflows.data.page}
			onPageChange={(page) => setParams({ ...params, page })}
		/>
	);
};

export const WorkflowsContainer = ({ children }: { children: ReactNode }) => {
	return (
		<EntityContainer
			header={<WorkflowsHeader />}
			search={<WorkflowsSearch />}
			pagination={<WorkflowsPagination />}
		>
			{children}
		</EntityContainer>
	);
};

export const WorkflowsLoadingView = () => {
	return <LoadingView message="Loading workflows..." />;
};

export const WorkflowsErrorView = () => {
	return <ErrorView message="Error loading workflows..." />;
};

export const WorkflowsEmptyView = () => {
	const createWorkflow = useCreateWorkflow();
	const { handleError, modal } = useUpgradeModal();
	const router = useRouter();

	const handleCreate = () => {
		createWorkflow.mutate(undefined, {
			onSuccess: (data) => {
				router.push(`/workflows/${data.id}`);
			},
			onError: (error) => {
				handleError(error);
			},
		});
	};
	return (
		<>
			{modal}
			<EmptyView message="No workflows found..." onNew={handleCreate} />
		</>
	);
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
	const removeWorkflow = useRemoveWorkflow();

	const handleRemove = () => {
		removeWorkflow.mutate({ id: data.id });
	};

	return (
		<EntityItem
			href={`/workflows/${data.id}`}
			title={data.name}
			subtitle={
				<>
					Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
					&bull; Created{" "}
					{formatDistanceToNow(data.createdAt, { addSuffix: true })}
				</>
			}
			image={
				<div className="size-8 flex items-center justify-center">
					<WorkflowIcon className="size-5 text-muted-foreground" />
				</div>
			}
			onRemove={handleRemove}
			isRemoving={removeWorkflow.isPending}
		/>
	);
};
