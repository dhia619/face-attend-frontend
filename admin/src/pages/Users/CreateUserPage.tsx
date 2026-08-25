import { useState, type SubmitEvent } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import FormField from "../../components/FormField/FormField";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { useGetRoles } from "../../features/rbac/hooks/useRoles";
import { useCreateUser } from "../../features/users/hooks/useUsers";
import Loader from "../../components/Loader/Loader";

import styles from "./UserManagement.module.css";
import FormError from "../../components/FormError/FormError";

function CreateUserPage() {

    const [email, setEmail] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<number>(0);
    const [emailError, setEmailError] = useState<string>("");
    const [fullNameError, setFullNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [roleError, setRoleError] = useState<string>("");

    const { data: roles = [], isLoading } = useGetRoles();

    const createUser = useCreateUser();

    if (isLoading) return <Loader />

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFullNameError("");
        setEmailError("");
        setPasswordError("");
        setRoleError("");

        if (!fullName.trim()){
            setFullNameError("Please enter a full name");
            return;
        }

        if (fullName.length <= 4) {
            setFullNameError("Full name must be at least 4 characters long");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        if (!password.trim()){
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 5) {
            setPasswordError("Password must be at least 5 characters long");
            return;
        }

        if (!role) {
            setRoleError("Please choose a role");
            return;
        }

        createUser.mutate({
            full_name: fullName,
            email: email,
            password: password,
            role_id: role,
        });
    };

    return (
        <div className={styles.main}>
            <p className={styles.title}>Create new user</p>
            <Card>
                <form onSubmit={handleSubmit}>
                    <FormField label="Full Name" htmlFor="full-name" error={fullNameError}>
                        <Input
                            id="full-name"
                            type="text"
                            placeholder="Joe Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </FormField>
                    <FormField label="Email" htmlFor="email" error={emailError}>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormField>
                    <FormField label="Password" htmlFor="password" error={passwordError}>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormField>
                    <FormField label="Role" htmlFor="role" error={roleError}>
                        <Select id="role" value={role} onChange={(e) => setRole(Number(e.target.value))}>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name.replace("_", " ").toUpperCase()}
                                </option>
                            ))}
                        </Select>
                    </FormField>
                    <Button type="submit">
                        {createUser.isPending ? "Adding..." : "Add"}
                    </Button>
                    {createUser.isError &&
                        <FormError message={createUser?.error?.response?.data?.detail || "An error occured while creating user"} />
                    }
                </form>
            </Card>
        </div>
    )
}

export default CreateUserPage;