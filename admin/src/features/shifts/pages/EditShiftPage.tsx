import { useParams } from "react-router";
import { useGetShift, useUpdateShift } from "../hooks/useShifts";

import styles from "../../../styles/ManagementPage.module.css";

import Loader from "../../../components/Loader/Loader";
import Toast from "../../../components/Toast/Toast";
import Card from "../../../components/Card/Card";
import ShiftForm from "../components/ShiftForm";
import PageError from "../../../components/PageError/PageError";

function EditShiftPage() {
    const { id } = useParams();
    const shiftId = Number(id);

    const { data: shift, isLoading: shiftLoading } = useGetShift(shiftId);

    const updateShift = useUpdateShift();

    if (shiftLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        );
    }

    if (!shift) {
        return (
            <div className={styles.main}>
                <PageError message="Shift not found :(" />
            </div>
        );
    }

    return (
        <div className={styles.main}>
            {updateShift.isSuccess && (
                <Toast message="Shift updated successfully" />
            )}

            {updateShift.isError && (
                <Toast
                    type="error"
                    message={
                        updateShift.error?.response?.status === 422
                            ? updateShift.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            updateShift.error?.response?.data?.detail?.[0]?.message
                            : updateShift.error?.response?.data?.detail ??
                            "An error occurred while updating shift"
                    }
                />
            )}

            <p className={styles.title}>Edit Shift</p>

            <Card>
                <ShiftForm
                    mode="edit"
                    initialValues={{
                        shiftName: shift.name,
                        startTime: shift.start_time,
                        endTime: shift.end_time,
                    }}
                    isPending={updateShift.isPending}
                    onSubmit={(values) =>
                        updateShift.mutate({
                            id: shiftId,
                            payload: {
                                name: values.shiftName,
                                start_time: values.startTime,
                                end_time: values.endTime,
                            },
                        })
                    }
                />
            </Card>
        </div>
    );
}

export default EditShiftPage;