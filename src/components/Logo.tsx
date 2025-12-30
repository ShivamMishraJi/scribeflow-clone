import Link from "next/link";
import { FileText } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
        <FileText className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-semibold text-black dark:text-white">BolText AI</span>
    </Link>
  );
}

