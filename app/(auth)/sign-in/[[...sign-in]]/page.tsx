import { dark } from "@clerk/themes";
import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn appearance={{ baseTheme: dark }} />
    </AuthLayout>
  );
}
