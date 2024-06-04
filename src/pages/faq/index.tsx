import { server } from "@/server";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function FAQpage() {
  const [faq, setFaq] = useState<any>([]);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const GetAllFaq = () => {
      axios
        .get(`${server}faq`)
        .then((res) => {
          setFaq(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    GetAllFaq();
  }, []);

  const [active, setActive] = useState(-1);
  const OpenFaq = (i: any) => {
    setActive(i === active ? null : i);
    console.log(active);
  };

  useEffect(() => {
    if (search !== "") {
      const res = faq.filter((f: any) => {
        return f.question.toLowerCase().includes(search.toLocaleLowerCase());
      });
      setSearchResult(res);
    } else {
      setSearchResult(faq);
    }
  }, [search, faq]);
  return (
    <div className="min-h-screen">
      <div className="w-[90%] mx-auto items-end justify-end flex">
        <form className="w-[300px] mt-3 ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search FAQ...."
              required
            />
            {/* <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </form>
      </div>
      <div className="w-[90%] mx-auto mt-10">
        {searchResult &&
          searchResult.map((f: any, i: any) => (
            <div
              key={i}
              className="border-[1px] border-r-0 mt-1 border-t-0 w-full border-l-0 p-2 mb-3"
            >
              <h1
                onClick={() => OpenFaq(i)}
                className="font-[700] text-xl cursor-pointer"
              >
                {f.question}
              </h1>
              <p
                className={`${active === i ? "block" : "hidden"} text-lg mt-3`}
              >
                {f.answer}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
