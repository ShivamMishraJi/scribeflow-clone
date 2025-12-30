import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />
      <div className="flex-1">
        <AuthForm title="Sign in to BolText AI" submitLabel="Sign in with Email" />
      </div>
    </div>
  );
}

