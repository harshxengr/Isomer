import { SignInForm } from "@/components/auth/signin-form";
import { requireUnAuth } from "@/lib/auth-utils";

const SignIn = async () => {
    await requireUnAuth();
    
    return (
        <div>
            <SignInForm/>
        </div>
    )
}

export default SignIn;