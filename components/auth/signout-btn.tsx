"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export function SignOutBtn() {
	const router = useRouter();

	const signout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/signin");
				},
			},
		});
	};

	return <Button onClick={() => signout()}>Sign out</Button>;
}
