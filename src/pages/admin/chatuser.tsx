import Sidebaradmin from "@/components/layout/sidebaradmin";
import { RenderTableUser } from "@/context/renderTableUser";
import { server } from "@/server";
import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Chatuser() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(6);
  const { render, setRender } = useContext(RenderTableUser);
  const [chat, setchat] = useState<any>([]);
  const [searchres, setsearchres] = useState<any>([]);
  const [cari, setCari] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}allchat`);
      const response = await res.json();
      setchat(response.data);
    }
    fetchData();
  }, [render]);

  useEffect(() => {
    if (cari !== "") {
      const res = chat.filter((f: any) => {
        return f.text.toLowerCase().includes(cari.toLocaleLowerCase());
      });
      setsearchres(res);
    } else {
      setsearchres(chat);
    }
    console.log(cari);
  }, [cari, chat]);
  return (
    <div className="w-full">
      {/*  Template admin*/}
      {open ? null : (
        <div className="relative z-50">
          <RxHamburgerMenu
            onClick={() => setOpen(true)}
            className="absolute left-3 top-3 z-50"
            size={25}
          />
        </div>
      )}

      {open ? (
        <Sidebaradmin open={open} setOpen={setOpen} active={active} />
      ) : null}
      {/* Template Admin */}
      <div className="w-[94%] mx-auto  min-h-screen pt-3">
        <div className="w-[97%] mx-auto  h-[70px]  p-3  border-b-[1px] border-black">
          <h1 className="text-xl font-[500] pl-3 mt-2">Chat User</h1>
          <div className="w-full mt-[60px]">
            <div className="w-auto mx-auto">
              <input
                className="mb-3 h-[40px] border-black pl-2 border-[1px] rounded-md "
                type="text"
                placeholder="cari topik"
                onChange={(e: any) => setCari(e.target.value)}
                value={cari}
              />
              <div className=" h-fit pb-[100px] grid grid-cols-3 mx-auto gap-3">
                {searchres &&
                  searchres.map((c: any, index: any) => (
                    <div
                      key={index}
                      className="w-[400px] p-3 mt-2 mb-4 border-[1px] rounded-md"
                    >
                      <h1 className="text-[17px] font-medium">{c.text}</h1>
                      <div className="underline">balas</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
