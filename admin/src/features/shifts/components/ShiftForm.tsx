import { useState, type SubmitEvent } from "react";

import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import Loader from "../../../components/Loader/Loader";

import { useGetAllDepartments } from "../../departments/hooks/useDepartments";

type ShiftFormValues = {
    shiftName: string;
    departmentId?: number;
    startTime: string;
    endTime: string;
};

type ShiftFormProps = {
    mode: "create" | "edit";
    initialValues?: ShiftFormValues;
    isPending: boolean;
    onSubmit: (values: ShiftFormValues) => void;
};

function ShiftForm({
    mode,
    initialValues,
    isPending,
    onSubmit,
}: ShiftFormProps) {
    const [shiftName, setShiftName] = useState(initialValues?.shiftName ?? "");
    const [departmentId, setDepartmentId] = useState(initialValues?.departmentId ?? 0);
    const [startTime, setStartTime] = useState(initialValues?.startTime ?? "");
    const [endTime, setEndTime] = useState(initialValues?.endTime ?? "");

    const [errors, setErrors] = useState({
        shiftName: "",
        departmentId: "",
        startTime: "",
        endTime: "",
    });

    const { data: departments=[], isLoading: departmentsLoading } = useGetAllDepartments();

    if (departmentsLoading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationErrors = {
            shiftName: "",
            departmentId: "",
            startTime: "",
            endTime: "",
        };

        if (!shiftName.trim()) {
            validationErrors.shiftName = "Please enter a shift name";
        } else if (shiftName.trim().length < 4) {
            validationErrors.shiftName =
                "Shift name must be at least 4 characters long";
        }

        if (mode === "create") {
            if (!departmentId) {
                validationErrors.departmentId = "Please choose a department"
            }
        }

        if (!startTime) {
            validationErrors.startTime = "Please choose a start time"
        }

        if (!endTime) {
            validationErrors.endTime = "Please choose an end time"
        }

        if (startTime >= endTime) {
            validationErrors.startTime = "Start time must be before end time";
            validationErrors.endTime = "End time must be after start time";
        }

        setErrors(validationErrors);

        if (Object.values(validationErrors).some(Boolean)) {
            return;
        }

        onSubmit({
            shiftName,
            departmentId: mode === "create" ? departmentId : 0,
            startTime,
            endTime,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Shift Name"
                htmlFor="shift-name"
                error={errors.shiftName}
            >
                <Input
                    id="shift-name"
                    value={shiftName}
                    onChange={(e) => setShiftName(e.target.value)}
                />
            </FormField>

            {mode === "create" && (
                <FormField
                    label="Department"
                    htmlFor="department"
                    error={errors.departmentId}
                >
                    <Select
                        id="department"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(Number(e.target.value))}
                    >
                        <option value={0}>Select a department</option>

                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name.replace("_", " ").toUpperCase()}
                            </option>
                        ))}
                    </Select>
                </FormField>
            )}

            <FormField
                label="Start time"
                htmlFor="start-time"
                error={errors.startTime}
            >
                <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </FormField>

            <FormField
                label="End time"
                htmlFor="end-time"
                error={errors.endTime}
            >
                <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </FormField>

            <Button type="submit">
                {isPending ? (
                    <ButtonLoader />
                ) : mode === "create" ? (
                    "Create"
                ) : (
                    "Confirm"
                )}
            </Button>
        </form>
    );
}

export default ShiftForm;