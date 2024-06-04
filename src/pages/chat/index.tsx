import Modalinsertid from "@/chat/modalinsertid";
import { server } from "@/server";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { IoSendSharp } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

export default function Chat() {
  const { data } = useSession();
  const [chat, setChat] = useState<any>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputref = useRef<HTMLInputElement>(null);
  const [sendChat, setSendChat] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [render, setRender] = useState(false);
  const [render2, setRender2] = useState(false);
  const [modalinsertid, setModalInsertid] = useState(false);
  const GetChatByEmail = async () => {
    await axios
      .get(`${server}chat/${data?.user?.email}`)
      .then((response: any) => {
        setChat(response.data.data);
      });
  };
  const CheckIdUser = async () => {
    const datas = await axios.get(`${server}cekiduser/${data?.user?.email}`);
    if (datas.data.data !== "") {
      setModalInsertid(false);
    } else {
      setModalInsertid(true);
    }
    console.log(datas.data.data);
    console.log(datas.data.data);
  };
  const Scroll = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    Scroll();
  }, [chat]);
  useEffect(() => {
    inputref.current?.focus();
  }, [chat]);

  useEffect(() => {
    CheckIdUser();
  }, [data?.user?.email]);

  const SendChat = async (e: any) => {
    e.preventDefault();
    if (sendChat !== "") {
      setDisabled(true);
      const res1 = await axios.post(`${server}question`, {
        email: data?.user?.email,
        text: sendChat,
        name: data?.user?.name,
      });
      setRender(true);

      if (res1.data.data !== null) {
        const res2 = await axios.post(`${server}answergroqai`, {
          email: data?.user?.email,
          text: res1.data?.data?.text || "",
          name: data?.user?.name,
          // const res2 = await axios.post(`${server}answer`, {
          //   email: data?.user?.email,
          //   text: res1.data?.data?.text || "",
          //   name: data?.user?.name,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: " Yahh",
          text: "Kesempatan hari ini sudah habis silahkan kembali lagi esok hari, jika masih ada pertanyaan silahkan klik tombol whatsapp di pojok kanan atas",
        });
      }
      setRender2(true);
      setSendChat("");
      setDisabled(false);
      setRender(false);
      setRender2(true);
    }
  };

  useEffect(() => {
    GetChatByEmail();
  }, [data?.user?.email, render, render2]);

  return (
    <>
      {modalinsertid ? (
        <Modalinsertid />
      ) : (
        <div className="w-[80%] mx-auto relative">
          <div className="h-[80px] backdrop:rounded-lg p-2 w-[80%] rounded-lg backdrop-blur-xl fixed border-b-[1px] justify-between items-center flex">
            <div className="flex gap-2">
              <button className="border-[1px] p-2 text-sm font-medium rounded-md bg-black text-white">
                Kembali
              </button>
              <h1 className="font-medium text-lg mt-1">Asisstant</h1>
            </div>
            <button className="flex border-[1px] p-2 text-sm font-medium rounded-md bg-black text-white">
              WhatsApp Admin
              <FaWhatsapp className="ml-2 mt-0" size={20} />
            </button>
          </div>
          <div className="w-full  px-3 h-[88vh] overflow-y-auto">
            <div className="mt-[80px] overflow-y-auto  mb-2 ">
              {chat &&
                chat.map((c: any, i: any) => (
                  <div
                    key={i}
                    className={` mt-[20px] w-fit ${
                      c.role === "answer" ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <div
                      className={`${
                        c.role === "answer"
                          ? "text-white bg-slate-700 rounded-lg p-2"
                          : "text-black bg-white border-[1px] border-black  rounded-lg p-2"
                      } p-3`}
                    >
                      {c.text}
                    </div>
                  </div>
                ))}
            </div>
            <div className="" ref={chatContainerRef}></div>
          </div>
          <div className="h-[80px] flex p-2 w-[80%] rounded-lg backdrop-blur-xl fixed bottom-0 left-1/2 transform -translate-x-1/2 border-t-[1px] justify-between items-center ">
            <input
              value={sendChat}
              disabled={disabled}
              ref={inputref}
              onChange={(e: any) => setSendChat(e.target.value)}
              type="text"
              className="w-[95%] border-[1px] p-2 h-full rounded-md"
              placeholder="Type a message..."
            />
            <button
              onClick={SendChat}
              className={` ${
                disabled === true ? "bg-red-800" : "bg"
              } h-full w-[5%] font-bold `}
            >
              <IoSendSharp className="ml-4" size={30} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
