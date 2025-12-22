import { SignInForm } from "@/components/auth/signin-form";
import { requireUnAuth } from "@/lib/auth-utils";

const Page = async () => {
    await requireUnAuth();
    
    return  <SignInForm/>;
}

export default Page;