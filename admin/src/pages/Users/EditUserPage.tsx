import { useEffect, useState, type SubmitEvent } from "react";
import { useParams } from "react-router";

import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import FormField from "../../components/FormField/FormField";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Loader from "../../components/Loader/Loader";
import styles from "./UserManagement.module.css";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import FormError from "../../components/FormError/FormError";

import { useGetRoles } from "../../features/rbac/hooks/useRoles";
import { useGetUser, useUpdateUser } from "../../features/users/hooks/useUsers";

function EditUserPage() {
    
    const [email, setEmail] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [role, setRole] = useState<number>(0);
    const [emailError, setEmailError] = useState<string>("");
    const [fullNameError, setFullNameError] = useState<string>("");
    const [roleError, setRoleError] = useState<string>("");

    const { id } = useParams();
    const userId = Number(id);

    const { data: roles = [], isLoading: rolesLoading } = useGetRoles();
    const { data: user, isLoading: userLoading } = useGetUser(userId);   

    useEffect(() => {
        if (user) {
            setFullName(user.full_name);
            setEmail(user.email);
            setRole(user.role.id);
        }
    }, [user]);

    const updateUser = useUpdateUser();

    if (rolesLoading || userLoading) return <Loader />


    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFullNameError("");
        setEmailError("");
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

        if (!role) {
            setRoleError("Please choose a role");
            return;
        }
        console.log("userId:", userId);

        updateUser.mutate({
            id: userId,
            payload: {
                full_name: fullName,
                email: email,
                role_id: role,
            }
        });
    };

    return (
        <div className={styles.main}>
            <p className={styles.title}>Edit user</p>
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
                    <FormField label="Role" htmlFor="role" error={roleError}>
                        <Select id="role" value={role} onChange={(e) => setRole(Number(e.target.value))}>
                            <option value={0}>Select a role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name.replace("_", " ").toUpperCase()}
                                </option>
                            ))}
                        </Select>
                    </FormField>
                    <Button type="submit">
                        {updateUser.isPending ? <ButtonLoader /> : "Confirm"}
                    </Button>
                    {updateUser.isError &&
                        <FormError message={updateUser?.error?.response?.data?.detail || "An error occured while updating user"} />
                    }
                </form>
            </Card>
        </div>
    )
}

export default EditUserPage;