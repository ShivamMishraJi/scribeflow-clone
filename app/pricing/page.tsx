import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect for discovering BolText AI",
    features: [
      "Convert audio files to text",
      "Edit Transcripts",
      "Single audio file at once",
      "Limited to 250 minutes of audio processing",
      "Limited to 1GB of storage",
    ],
    cta: "Get started",
    ctaLink: "/sign-up",
    popular: false,
  },
  {
    name: "Personal",
    price: "$9.99",
    period: "/month",
    description: "Perfect for individuals",
    features: [
      "All free tier features",
      "Edit Transcripts",
      "Multiple audio files at once",
      "Limited to 5000 minutes of audio processing",
      "Limited to 10GB of storage",
      "Basic support with 72 hours response time",
    ],
    cta: "Get started",
    ctaLink: "/sign-up",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29.99",
    period: "/month",
    description: "Ideal for power users",
    features: [
      "All personal tier features",
      "Unlimited audio files",
      "Limited to 5,000 minutes of audio processing",
      "Limited to 100GB of storage",
      "Priority support with 48 hours response time",
    ],
    cta: "Get started",
    ctaLink: "/sign-up",
    popular: true,
  },
  {
    name: "Business",
    price: "$99.99",
    period: "/month",
    description: "Adapter for users who required big quotas",
    features: [
      "All pro tier features",
      "Limited to 25,000 minutes of audio processing",
      "Limited to 1TB of storage",
      "Priority support with 24 hours response time",
    ],
    cta: "Get started",
    ctaLink: "/sign-up",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
              Simple <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              Choose the plan that's right for you. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="relative rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 right-4">
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-3 py-1 text-xs font-medium text-white">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-black dark:text-white">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-4xl font-semibold text-black dark:text-white">{plan.price}</span>
                      {plan.period && (
                        <span className="ml-1 text-lg text-gray-600 dark:text-gray-400">{plan.period}</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.ctaLink} className="block w-full">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ or Additional Info Section */}
        <section className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl font-semibold text-black dark:text-white sm:text-3xl">
                Questions about pricing?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
                Contact us at{" "}
                <a href="mailto:support@scribeflow.io" className="text-black dark:text-white hover:underline">
                  support@scribeflow.io
                </a>{" "}
                for custom enterprise plans.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 BolText AI</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

