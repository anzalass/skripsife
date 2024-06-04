import { useRouter } from "next/router";
import Navbar from "./navbar";
import Footer from "./footer";

type AppShellProps = {
  children: React.ReactNode;
};

const disableNavbar = [
  "/chat",
  "/admin/masuk",
  "/admin/faq",
  "/admin/pelanggan",
  "/admin/dataset",
  "/admin/chatuser",
];

export default function AppShell(props: AppShellProps) {
  const router = useRouter();
  const { children } = props;
  return (
    <div>
      {!disableNavbar.includes(router.pathname) && <Navbar />}
      {children}
      {!disableNavbar.includes(router.pathname) && <Footer />}
    </div>
  );
}
