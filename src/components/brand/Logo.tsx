import type { ComponentProps, ImgHTMLAttributes } from "react";
import logoWhite from "@/assets/amnay-logo-white.png.asset.json";
import logoDark from "@/assets/amnay-logo-dark.png.asset.json";
import emblem from "@/assets/amnay-emblem.png.asset.json";

type Theme = "dark" | "light";

const LOGOS: Record<Theme, string> = {
  dark: logoWhite.url, // white wordmark — for dark backgrounds
  light: logoDark.url, // navy wordmark — for light backgrounds
};

type LogoProps = ImgHTMLAttributes<HTMLImageElement> & { theme?: Theme };

/**
 * Official logo files, used exactly as provided.
 * theme="dark"  → white wordmark, for dark backgrounds (default on this site)
 * theme="light" → navy wordmark, for light backgrounds
 */
export function Logo({ theme = "dark", className, alt = "Amnay by IZEMX", ...rest }: LogoProps) {
  return (
    <img
      src={LOGOS[theme]}
      alt={alt}
      className={className}
      draggable={false}
      {...rest}
    />
  );
}

/** Emblem only — favicon, tight spaces, decorative use. */
export function Emblem({
  className,
  alt = "Emblème Amnay",
  ...rest
}: ComponentProps<"img">) {
  return (
    <img src={emblem.url} alt={alt} className={className} draggable={false} {...rest} />
  );
}
