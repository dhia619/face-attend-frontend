import { useParams } from "react-router";
import { type SubmitEvent, useState } from "react";

import { useAddmployeeFace, useGetEmployee } from "../hooks/useEmployees";
import { useImageUpload } from "../hooks/useUploadImage";

import styles from "../../../styles/ManagementPage.module.css";

import Loader from "../../../components/Loader/Loader";
import Toast from "../../../components/Toast/Toast";
import PageError from "../../../components/PageError/PageError";
import Card from "../../../components/Card/Card";
import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

function UpdateEmployeeFacePage() {
    const { id } = useParams();
    const employeeId = Number(id);

    const { data: employee, isLoading: employeeLoading } = useGetEmployee(employeeId);
    const addEmployeeFace = useAddmployeeFace();

    const [faceImageError, setFaceImageError] = useState<string>("");

    const { image: faceImage, handleImageChange: handleFaceImageChange } = useImageUpload();

    if (employeeLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        );
    }

    if (!employee) {
        return (
            <div className={styles.main}>
                <PageError message="Employee not found :(" />
            </div>
        );
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        setFaceImageError("");
        e.preventDefault();
        if (!faceImage) {
            setFaceImageError("Please choose a face image");
            return;
        }
        addEmployeeFace.mutate({
            id: employeeId,
            payload: {
                face_image: faceImage
            }
        })
    }

    return (
        <div className={styles.main}>
            {addEmployeeFace.isSuccess && (
                <Toast message="Employee face added successfully" />
            )}

            {addEmployeeFace.isError && (
                <Toast
                    type="error"
                    message={
                        addEmployeeFace.error?.response?.status === 422
                            ? addEmployeeFace.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            addEmployeeFace.error?.response?.data?.detail?.[0]?.message
                            : addEmployeeFace.error?.response?.data?.detail ??
                            "An error occurred while adding employee face"
                    }
                />
            )}

            <p className={styles.title}>Add Employee Face</p>
            <p className={styles.brief}>The more faces you add, the more the recognition is accurate.</p>
            <Card>
                <form onSubmit={handleSubmit}>
                    <FormField
                        label="Face Image"
                        htmlFor="faceImage"
                        error={faceImageError}
                    >
                        <Input
                            id="faceImage"
                            type="file"
                            accept="image/*"
                            onChange={handleFaceImageChange}
                        />
                        <div className={styles.main}>
                            {faceImage && (
                                <img
                                    className={styles.imagePreview}
                                    src={faceImage}
                                    alt="Employee preview"
                                />
                            )}
                        </div>
                    </FormField>
                    <Button
                        type="submit"
                        disabled={addEmployeeFace.isPending}
                    >
                        {addEmployeeFace.isPending ? <ButtonLoader /> : "Add"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default UpdateEmployeeFacePage;