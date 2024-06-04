import Image from "next/image";
import { Inter } from "next/font/google";
import Jumbotron from "@/components/jumbotron";
import Faq from "@/components/faq";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full">
      <Jumbotron />
      {/* <Faq /> */}
    </div>
  );
}
