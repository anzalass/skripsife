import { RenderTableUser } from "@/context/renderTableUser";
import { server } from "@/server";
import axios from "axios";
import { useContext, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Createfaq(props: { setOpen: any }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { render, setRender } = useContext(RenderTableUser);

  const CreateFaq = async () => {
    setRender(false);
    Swal.fire({
      title: "Are you sure?",
      text: "Ingin membuat invoice bulan  ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${server}create-faq`, {
            question: question,
            answer: answer,
          })
          .then((response) => {
            Swal.fire({
              title: "Berhasil!",
              text: "membuat faq .",
              icon: "success",
            });
            setRender(true);
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal!",
              text: "Membuat faq ini",
              icon: "error",
            });
          });
      }
    });
    setRender(false);
  };

  return (
    <div className="w-[90%]  fixed left-20 z-10 mx-auto h-screen   top-0 ">
      <div className="w-[80%] shadow-xl p-3 relative rounded-lg bg-slate-200 h-[50vh] z-10 mx-auto mt-[150px] ">
        <FaWindowClose
          onClick={() => props.setOpen(false)}
          className="absolute right-2"
          size={25}
        />
        <h1 className="text-xl mt-4 font-[500]">Buat Faq </h1>
        <h1>{}</h1>
        <div className="w-full p-3 mt-5">
          <div className="mb-5">
            <input
              onChange={(e: any) => setQuestion(e.target.value)}
              type="text"
              value={question}
              className="h-[45px] rounded-lg w-full pl-3"
              placeholder="Question..."
            />
          </div>
          <div className="mb-5">
            <textarea
              onChange={(e: any) => setAnswer(e.target.value)}
              value={answer}
              className="h-[100px] rounded-md w-full pl-2 pt-2"
              placeholder="Answer..."
            />
          </div>

          <div className="w-full">
            <button
              onClick={CreateFaq}
              className="p-3 rounded-md border-2 bg-white border-black"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
