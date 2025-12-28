import { useSuspenseWorkflows } from "../hooks/use-workflows"

const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <p>
            {JSON.stringify(workflows.data, null, 2)}
        </p>
    )
}

export default WorkflowsList