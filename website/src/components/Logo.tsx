import Link from "next/link";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M96,58 L96,28 L72,4 L28,4 L4,28 L4,72 L28,96 L72,96 L88,80"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58,58 L84,58"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = "mark",
  className = "",
}: {
  variant?: "mark" | "lockup";
  className?: string;
}) {
  return (
    <Link href="/" className={`inline-flex flex-col ${className}`}>
      <span className="inline-flex items-center gap-2">
        <LogoMark className="h-7 w-7 text-teal-500" />
        <span className="font-display text-xl font-semibold leading-none text-ink-soft">
          INFO
          <span className="ml-0.5 bg-teal-50 px-1 text-teal-600">esearch</span>
        </span>
      </span>
      {variant === "lockup" && (
        <span className="font-script mt-0.5 pl-9 text-base leading-none text-amber-500">
          Complexity to Clarity
        </span>
      )}
    </Link>
  );
}
