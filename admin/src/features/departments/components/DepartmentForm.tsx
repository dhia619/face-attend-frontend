import { useState, type SubmitEvent } from "react";

import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import Card from "../../../components/Card/Card";

type DepartmentFormValues = {
    departmentName: string;
};

type DepartmentFormProps = {
    mode: "create" | "edit";
    initialValues?: DepartmentFormValues;
    isPending: boolean;
    onSubmit: (values: DepartmentFormValues) => void;
};

function DepartmentForm({
    mode,
    initialValues,
    isPending,
    onSubmit,
}: DepartmentFormProps) {

    const [departmentName, setDepartmentName] = useState(initialValues?.departmentName ?? "");
    const [departmentNameError, setDepartmentNameError] = useState<string>("");

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!departmentName.trim()) {
            setDepartmentNameError("Please enter a department name");
            return;
        } else if (departmentName.trim().length < 2) {
            setDepartmentNameError("Department name must be at least 2 characters long");
            return;
        }

        onSubmit({
            departmentName: departmentName.trim(),
        });
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Department Name"
                    htmlFor="department-name"
                    error={departmentNameError}
                >
                    <Input
                        id="department-name"
                        value={departmentName}
                        placeholder="e.g. IT, HR"
                        onChange={(e) => {
                            setDepartmentName(e.target.value);
                        }}
                    />
                </FormField>
                <Button
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <ButtonLoader />
                    ) : mode === "create" ? (
                        "Create"
                    ) : (
                        "Confirm"
                    )}
                </Button>
            </form>
        </Card>
    );
}

export default DepartmentForm;