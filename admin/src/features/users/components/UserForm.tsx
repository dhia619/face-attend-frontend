import { useState, type SubmitEvent } from "react";

import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

import type { Role } from "../../rbac/types";

type UserFormValues = {
    fullName: string;
    email: string;
    password?: string;
    roleId: number;
};

type UserFormProps = {
    mode: "create" | "edit";
    initialValues?: UserFormValues;
    roles: Role[];
    isPending: boolean;
    onSubmit: (values: UserFormValues) => void;
};

function UserForm({
    mode,
    initialValues,
    roles,
    isPending,
    onSubmit,
}: UserFormProps) {
    const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
    const [email, setEmail] = useState(initialValues?.email ?? "");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(initialValues?.roleId ?? 0);

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "",
    });

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationErrors = {
            fullName: "",
            email: "",
            password: "",
            role: "",
        };

        if (!fullName.trim()) {
            validationErrors.fullName = "Please enter a full name";
        } else if (fullName.trim().length < 4) {
            validationErrors.fullName =
                "Full name must be at least 4 characters long";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "Please enter a valid email address";
        }

        if (mode === "create") {
            if (!password.trim()) {
                validationErrors.password = "Please enter a password";
            } else if (password.length < 5) {
                validationErrors.password =
                    "Password must be at least 5 characters long";
            }
        }

        if (!roleId) {
            validationErrors.role = "Please choose a role";
        }

        setErrors(validationErrors);

        if (Object.values(validationErrors).some(Boolean)) {
            return;
        }

        onSubmit({
            fullName,
            email,
            password: mode === "create" ? password : undefined,
            roleId,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Full Name"
                htmlFor="full-name"
                error={errors.fullName}
            >
                <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormField>

            {mode === "create" && (
                <FormField
                    label="Password"
                    htmlFor="password"
                    error={errors.password}
                >
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormField>
            )}

            <FormField
                label="Role"
                htmlFor="role"
                error={errors.role}
            >
                <Select
                    id="role"
                    value={roleId}
                    onChange={(e) => setRoleId(Number(e.target.value))}
                >
                    <option value={0}>Select a role</option>

                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name.replace("_", " ").toUpperCase()}
                        </option>
                    ))}
                </Select>
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

export default UserForm;