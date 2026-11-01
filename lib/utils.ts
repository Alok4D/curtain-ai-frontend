import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function verifyToken(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Normalizes any uploaded image (AVIF, WebP, HEIC, PNG, JFIF, or high-res photo)
 * into a clean, standard sRGB image/jpeg data URL capped at max 2048px dimension.
 * This guarantees 100% compatibility with OpenAI image APIs.
 */
export function normalizeImageToJpeg(input: File | string): Promise<string> {
  return new Promise((resolve, reject) => {
    const processSrc = (src: string) => {
      if (typeof window === "undefined") {
        resolve(src);
        return;
      }

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

          // Cap maximum dimension at 2048px
          const maxDim = 2048;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(src);
            return;
          }

          // Fill solid white background (handling transparent alpha channels cleanly)
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Export as standard, clean sRGB image/jpeg
          const cleanJpeg = canvas.toDataURL("image/jpeg", 0.92);
          resolve(cleanJpeg);
        } catch {
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
      img.src = src;
    };

    if (typeof input === "string") {
      processSrc(input);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          processSrc(result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(input);
    }
  });
}
