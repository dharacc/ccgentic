import Image from "next/image";
import { PROJECT_NAME } from "@/lib/project";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/cc-logo.svg"
      alt={PROJECT_NAME}
      width={67}
      height={56}
      unoptimized
      priority={priority}
      className={className}
    />
  );
}
