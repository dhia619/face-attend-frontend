import { useState, type SubmitEvent } from "react";

import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import Card from "../../../components/Card/Card";

import styles from "../../../styles/ManagementPage.module.css";
import { useGetDepartments } from "../../departments/hooks/useDepartments";
import Loader from "../../../components/Loader/Loader";
import { useImageUpload } from "../hooks/useUploadImage";

type EmployeeFormValues = {
    fullName: string;
    email: string;
    phoneNumber: string;
    departmentId?: number;
    hireDate?: string;
    faceImage?: string;
};

type EmployeeFormProps = {
    mode: "create" | "edit";
    initialValues?: EmployeeFormValues;
    isPending: boolean;
    onSubmit: (values: EmployeeFormValues) => void;
};

type FormErrors = {
    fullName: string;
    email: string;
    phoneNumber: string;
    faceImage: string
};

function EmployeeForm({
    mode,
    initialValues,
    isPending,
    onSubmit,
}: EmployeeFormProps) {

    const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
    const [email, setEmail] = useState(initialValues?.email ?? "");
    const [phoneNumber, setPhoneNumber] = useState(initialValues?.phoneNumber ?? "");
    const [departmentId, setDepartmentId] = useState(initialValues?.departmentId ?? 0);
    const [hireDate, setHireDate] = useState(initialValues?.hireDate ?? "");
    const [formIndex, setFormIndex] = useState(0);
    const [errors, setErrors] = useState<FormErrors>({
        fullName: "",
        email: "",
        phoneNumber: "",
        faceImage: ""
    });

    const { data: departments, isLoading } = useGetDepartments();
    const { image: faceImage, handleImageChange: handleFaceImageChange } = useImageUpload();
    
    function validatePersonalInfo() {
        
        const validationErrors: FormErrors = {
            fullName: "",
            email: "",
            phoneNumber: "",
            faceImage: ""
        };

        if (!fullName.trim()) {
            validationErrors.fullName = "Please enter a full name";
        } else if (fullName.trim().length < 4) {
            validationErrors.fullName =
                "Full name must be at least 4 characters long";
        }

        if (!email.trim()) {
            validationErrors.email = "Please enter an email address";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            validationErrors.email =
                "Please enter a valid email address";
        }

        if (mode === "create") {
            if (!phoneNumber.trim()) {
                validationErrors.phoneNumber =
                    "Please enter a phone number";
            } else if (!/^\d{8}$/.test(phoneNumber.trim())) {
                validationErrors.phoneNumber =
                    "Phone number must be 8 digits";
            }
        }

        setErrors(validationErrors);

        return !Object.values(validationErrors).some(Boolean);
    }

    function handlePersonalInfoNext() {
        const isValid = validatePersonalInfo();

        if (!isValid) {
            return;
        }

        setFormIndex(1);
    }

    function handleDepartmentNext() {
        if (mode === "create") {
            setFormIndex(2);
            return;
        }
        onSubmit({
            fullName: fullName.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            departmentId: departmentId || undefined,
            hireDate: hireDate || undefined,
        });
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors((prev) => ({
            ...prev,
            faceImage: "",
        }));
        if (mode === "create" && !faceImage) {
            setErrors((prev) => ({
                ...prev,
                faceImage: "Please upload the employee face image",
            }));

            return;
        }

        onSubmit({
            fullName: fullName.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            departmentId: departmentId || undefined,
            hireDate: hireDate || undefined,
            faceImage: faceImage || undefined,
        });
    }

    if (isLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        )
    }

    return (
        <>
            {formIndex === 0 && (
                <Card>
                    <FormField
                        label="Full Name"
                        htmlFor="full-name"
                        error={errors.fullName}
                    >
                        <Input
                            id="full-name"
                            value={fullName}
                            placeholder="Joe Doe"
                            onChange={(e) => {
                                setFullName(e.target.value);

                                if (errors.fullName) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        fullName: "",
                                    }));
                                }
                            }}
                        />
                    </FormField>

                    <FormField
                        label="Email"
                        htmlFor="email"
                        error={errors.email}
                    >
                        <Input
                            id="email"
                            type="email"
                            placeholder="joedoe@gmail.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);

                                if (errors.email) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        email: "",
                                    }));
                                }
                            }}
                        />
                    </FormField>

                    <FormField
                        label="Phone Number"
                        htmlFor="phoneNumber"
                        error={errors.phoneNumber}
                    >
                        <Input
                            id="phoneNumber"
                            type="tel"
                            value={phoneNumber}
                            placeholder="99999999"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);

                                if (errors.phoneNumber) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        phoneNumber: "",
                                    }));
                                }
                            }}
                        />
                    </FormField>

                    <Button
                        type="button"
                        onClick={handlePersonalInfoNext}
                    >
                        Next
                    </Button>
                </Card>
            )}

            {formIndex === 1 && (
                <Card>
                    <FormField
                        label="Department"
                        htmlFor="department"
                    >
                        <Select
                            id="department"
                            value={departmentId}
                            onChange={(e) =>
                                setDepartmentId(
                                    Number(e.target.value)
                                )
                            }
                        >
                            <option value={-1}>
                                Select a Department
                            </option>
                            {departments?.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </Select>
                    </FormField>

                    <FormField
                        label="Hire Date"
                        htmlFor="hireDate"
                    >
                        <Input
                            id="hireDate"
                            type="date"
                            value={hireDate}
                            onChange={(e) =>
                                setHireDate(e.target.value)
                            }
                        />
                    </FormField>

                    <div className={styles.formButtonsContainer}>
                        <Button
                            type="button"
                            onClick={() => setFormIndex(0)}
                        >
                            Back
                        </Button>

                        <Button
                            type="button"
                            onClick={handleDepartmentNext}
                        >
                            {mode === "create" ? "Next" : "Confirm"}
                        </Button>
                    </div>
                </Card>
            )}

            {(formIndex === 2 && mode === "create" ) &&(
                <Card>
                    <form onSubmit={handleSubmit}>
                        <FormField
                            label="Face Image"
                            htmlFor="faceImage"
                            error={errors.faceImage}
                        >
                            <Input
                                id="faceImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFaceImageChange}
                            />
                        </FormField>
                        <div className={styles.main}>
                            {faceImage && (
                                <img
                                    className={styles.imagePreview}
                                    src={faceImage}
                                    alt="Employee preview"
                                />
                            )}
                        </div>
                        <div className={styles.formButtonsContainer}>
                            <Button
                                type="button"
                                onClick={() => setFormIndex(1)}
                            >
                                Back
                            </Button>

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
                        </div>
                    </form>
                </Card>
            )}
        </>
    );
}

export default EmployeeForm;