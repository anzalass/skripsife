import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Navbar() {
  const { data } = useSession();
  const [logout, setLogout] = useState(false);
  return (
    <div className="border-[1px border-\ w-full  h-[80px] border-l-0 border-r-0 border-t-0">
      <div className="w-11/12 flex items-center mx-auto justify-between my-auto h-[90%]">
        <Link href={"/"}>
          <div className="font-medium">
            <img src="/grasi.png" className="w-[100px] h-full" alt="" />
          </div>
        </Link>
        {data ? (
          <div className="">
            <button
              onClick={() => setLogout(!logout)}
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-black focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 xl:px-5 lg:px-5 md:px-5  py-2.5 text-center inline-flex items-center "
              type="button"
            >
              {data?.user?.image ? (
                <Image
                  width={25}
                  height={25}
                  className="mr-2 w-[30px] rounded-full"
                  src={data.user?.image!}
                  alt=""
                />
              ) : null}
              <span className="hidden md:block lg:block xl:block">
                {data && data.user?.name}{" "}
              </span>
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {logout ? (
              <div
                id="dropdownHover"
                className="z-10 absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li onClick={() => signOut()}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              onClick={() => signIn("google")}
              className="text-white bg-white border-[1px] hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm xl:px-5 lg:px-5 md:px-5 px-2 py-2.5 text-center dark:text-black inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-blue-300"
              type="button"
            >
              <span className="hidden xl:block md:block lg:block sm:hidden">
                {" "}
                Masuk Dengan Google{" "}
              </span>{" "}
              <FcGoogle className="lg:ml-2 xl:ml-2 " size={25} />
              {data ? (
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              ) : null}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
