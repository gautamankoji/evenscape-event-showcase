import { dark } from "@clerk/themes";
import { SignUp } from "@clerk/nextjs";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp appearance={{ baseTheme: dark }} />
    </AuthLayout>
  );
}
