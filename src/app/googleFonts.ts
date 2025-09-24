import { Inter, Ubuntu_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: "400",
});

export default function googleFonts() {
  return cn(inter.variable, ubuntuMono.variable);
}
