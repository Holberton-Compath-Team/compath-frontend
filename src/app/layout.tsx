import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";

import { Providers } from "@/app/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "COMPATH",
  description:
    "Tələbənin problemini avtomatik doğru universitet xidmətinə yönləndirən platforma.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="az" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

