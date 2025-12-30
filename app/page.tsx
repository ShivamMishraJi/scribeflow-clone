import Link from "next/link";
import { Header } from "@/components/Header";
import { Play, Mic, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-black dark:text-white sm:text-6xl lg:text-7xl">
              Easy to Use <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Transcription</span> Tool for Web
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              Transform your audio and video content into searchable transcripts, AI summaries, and organized notes in minutes.
            </p>
            <p className="mx-auto mt-4 text-sm text-gray-500 dark:text-gray-400">
              Support for MP3, MP4, M4A, MOV, YouTube, and more.
            </p>
            <div className="mt-10">
              <Link href="/sign-up">
                <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border-2 bg-white px-8 py-4 text-base font-medium text-black transition-all hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                  <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  <span className="absolute inset-[2px] rounded-md bg-white dark:bg-gray-900" />
                  <span className="relative z-10 flex items-center gap-2 text-black dark:text-white">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                    Start transcribing
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-50">
                    <Play className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">YouTube Import</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Paste any YouTube URL and get instant transcriptions with speaker identification.
                  </p>
                </div>
                <div className="rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-50">
                    <Mic className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Browser Recording</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Record audio directly in your browser with our built-in recording tool.
                  </p>
                </div>
                <div className="rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-purple-50">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">AI Summaries</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get intelligent summaries and key insights powered by Gemma 3 AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 py-24">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold text-black dark:text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-300">
                Join thousands of creators who trust BolText AI for their video transcription needs.
              </p>
              <div className="mt-8">
                <Link href="/sign-up">
                  <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border-2 bg-white px-8 py-4 text-base font-medium text-black transition-all hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    <span className="absolute inset-[2px] rounded-md bg-white dark:bg-gray-900" />
                    <span className="relative z-10 text-black dark:text-white">Get started for free</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 py-12">
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
