import {
  ShieldCheck,
  Lock,
  Globe2,
  Captions,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "lock-shield": Lock,
  globe: Globe2,
  captions: Captions,
};

export default function ServiceIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = iconMap[icon] ?? ShieldCheck;
  return <Icon className={className} />;
}
