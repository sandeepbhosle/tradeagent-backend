export default function Eyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p className={`eyebrow ${tone === "dark" ? "text-teal-500" : "text-teal-600"}`}>
      {children}
    </p>
  );
}
