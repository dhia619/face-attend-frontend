import Toast from "../../../components/Toast/Toast";
import Card from "../../../components/Card/Card";
import ShiftForm from "../components/ShiftForm";

import styles from "../../../styles/ManagementPage.module.css";

import { useCreateShift } from "../hooks/useShifts";

function CreateShiftPage() {
    const createShift = useCreateShift();

    return (
        <div className={styles.main}>
            {createShift.isSuccess && (
                <Toast message="Shift created successfully" />
            )}

            {createShift.isError && (
                <Toast
                    type="error"
                    message={
                        createShift.error?.response?.status === 422
                            ? createShift.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            createShift.error?.response?.data?.detail?.[0]?.message
                            : createShift.error?.response?.data?.detail ??
                            "An error occurred while creating shift"
                    }
                />
            )}

            <p className={styles.title}>Create new Shift</p>

            <Card>
                <ShiftForm
                    mode="create"
                    isPending={createShift.isPending}
                    onSubmit={(values) =>
                        createShift.mutate({
                            name: values.shiftName,
                            department_id: values.departmentId,
                            start_time: values.startTime,
                            end_time: values.endTime,
                        })
                    }
                />
            </Card>
        </div>
    );
}

export default CreateShiftPage;