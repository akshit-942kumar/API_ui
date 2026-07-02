import "./globals.css";

import { Toaster } from "react-hot-toast";
import Providers from "./components/Provider";
export const metadata = {
  title: "API Monitoring System",
  description: "Monitor your APIs in real time",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
      </Providers>
    </html>
  );
}