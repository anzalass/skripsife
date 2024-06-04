import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Jumbotron() {
  const { data }: any = useSession();
  return (
    <div className="h-[80vh] w-11/12 mx-auto">
      <div className="flex justify-between w-[90%] mx-auto h-full items-center">
        <div className="shadow-  p- rounded-lg flex flex-col w-[60%] justify-center items-start">
          <h1 className=" text-4xl font-bold w-[90%] mb-4">
            Customer Service Pelanggan PT. Media Grasi Internet
          </h1>
          <div className="flex">
            <Link href={"/chat"}>
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Chat AI
              </button>
            </Link>
            <Link href={"/faq"}>
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                FaQ{" "}
              </button>
            </Link>
            {data?.user.role === "admin" ? (
              <Link href={"/admin/pelanggan"}>
                <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Dashboard Admin
                </button>
              </Link>
            ) : null}{" "}
          </div>
        </div>
        <div className="flex justify-center items-center w-[40%]">
          <img
            src="/ai.png"
            className="w-[400px] h-[400px] object-contain"
            alt="AI"
          />
        </div>
      </div>
    </div>
  );
}
