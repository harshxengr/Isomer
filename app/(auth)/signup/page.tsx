import { SignUpForm } from "@/components/auth/signup-form";
import { requireUnAuth } from "@/lib/auth-utils";

const SignUp = async () => {
    await requireUnAuth();

    return (
        <div>
            <SignUpForm/>
        </div>
    )
}

export default SignUp;