import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />
      <div className="flex-1">
        <AuthForm title="Sign up for BolText AI" submitLabel="Sign up with Email" />
      </div>
    </div>
  );
}

