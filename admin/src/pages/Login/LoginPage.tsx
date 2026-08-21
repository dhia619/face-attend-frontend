import { useState, type SubmitEvent } from "react";

import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import Input from "../../components/Input/Input";

import { useLogin } from "../../features/auth/hooks/useLogin";
import FormError from "../../components/FormError/FormError";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = useLogin();

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(email);
		login.mutate({
			email,
			password,
		});
	};

	return (
		<Card>
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<FormField label="Email" htmlFor="email">
					<Input
						id="email"
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormField>

				<FormField label="Password" htmlFor="password">
					<Input
						id="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormField>

				<Button type="submit" disabled={login.isPending}>
					{login.isPending ? "Logging in..." : "Login"}
				</Button>

				{login.isError && <FormError message={login.error.response.data.detail} />}
			</form>
		</Card>
	);
}

export default LoginPage;