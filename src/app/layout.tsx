import type { Metadata, Viewport } from "next";
import AuthProvider from "@/components/AuthProvider";
import InstallPrompt from "@/components/InstallPrompt";
import MobileNav from "@/components/MobileNav";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: "Informatique | Readi.fr",
  description: "Réparation traceurs, imprimante, création site web, dépannage électronique, affichage dynamique",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/images/readi27-140x43.png",
    apple: "/assets/images/readi27-140x43.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/assets/flag-icons/css/flag-icon.min.css" />
        <link rel="stylesheet" href="/assets/web/assets/mobirise-icons/mobirise-icons.css" />
        <link rel="stylesheet" href="/assets/simple-line-icons/simple-line-icons.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-grid.min.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-reboot.min.css" />
        <link rel="stylesheet" href="/assets/animatecss/animate.min.css" />
        <link rel="stylesheet" href="/assets/dropdown/css/style.css" />
        <link rel="stylesheet" href="/assets/theme/css/style.css" />
        <link rel="stylesheet" href="/assets/mobirise/css/mbr-additional.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,500,600,700&display=swap" />
      </head>
      <body>
        <AuthProvider>
            <InstallPrompt />
            {children}
            <MobileNav />
        </AuthProvider>
        <script src="/assets/web/assets/jquery/jquery.min.js"></script>
        <script src="/assets/popper/popper.min.js"></script>
        <script src="/assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="/assets/smoothscroll/smooth-scroll.js"></script>
        <script src="/assets/viewportchecker/jquery.viewportchecker.js"></script>
        <script src="/assets/parallax/jarallax.min.js"></script>
        <script src="/assets/mbr-switch-arrow/mbr-switch-arrow.js"></script>
        <script src="/assets/formstyler/jquery.formstyler.js"></script>
        <script src="/assets/formstyler/jquery.formstyler.min.js"></script>
        <script src="/assets/datepicker/jquery.datetimepicker.full.js"></script>
        <script src="/assets/popup-plugin/script.js"></script>
        <script src="/assets/popup-overlay-plugin/script.js"></script>
        <script src="/assets/dropdown/js/nav-dropdown.js"></script>
        <script src="/assets/dropdown/js/navbar-dropdown.js"></script>
        <script src="/assets/touchswipe/jquery.touch-swipe.min.js"></script>
        <script src="/assets/theme/js/script.js"></script>
        <script src="/assets/formoid.min.js"></script>
      </body>
    </html>
  );
}
