import Image from "next/image";

type LogoProps = {
  src?: string;
  alt?: string;
  legalName?: string;
  width?: number;
  height?: number;
  className?: string;
  preload?: boolean;
};

export default function Logo({
  src,
  alt,
  legalName,
  width,
  height,
  className,
  preload = false,
}: LogoProps) {
  const imageWidth = width && width > 0 ? width : 221;
  const imageHeight = height && height > 0 ? height : 35;

  return (
    <span className={`flex flex-col ${className ?? ""}`}>
      {src ? (
        <span className="relative block h-[28px] w-[176px] overflow-clip sm:h-[35px] sm:w-[221px]">
          <Image
            src={src}
            alt={alt ?? ""}
            width={imageWidth}
            height={imageHeight}
            unoptimized
            preload={preload}
            className="h-full w-full object-contain object-left"
          />
        </span>
      ) : null}
      {legalName ? (
        <span className="mt-0.5 max-w-[176px] text-[10px] leading-[14px] text-primary sm:max-w-none sm:text-[12px] sm:leading-[17px]">
          {legalName}
        </span>
      ) : null}
    </span>
  );
}
