import { RenderTableUser } from "@/context/renderTableUser";
import { server } from "@/server";
import axios from "axios";
import { useContext, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CreateDataset(props: { setOpen: any }) {
  const [user, setUser] = useState("");
  const [asisstant, setAsisstant] = useState("");
  const { render, setRender } = useContext(RenderTableUser);
  const [data, setdata] = useState<any>([]);

  const CreateDataset = async () => {
    setRender(false);
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Ingin membuat dataset ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${server}dataset`, {
            request: data,
          })
          .then((response) => {
            Swal.fire({
              title: "Berhasil!",
              text: "membuat dataset .",
              icon: "success",
            });
            props.setOpen(false);
            setRender(true);
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal!",
              text: "Membuat dataset ini",
              icon: "error",
            });
          });
      }
    });

    setRender(false);
  };

  const Add = () => {
    if (data.length < 2) {
      setdata((prev: any) => [
        ...prev,
        {
          role: "user",
          tipe: "Pertanyaan",
          content: user,
        },
      ]);
    } else {
      console.log("error");
    }
  };

  console.log(data);

  const Add2 = () => {
    if (data.length < 2) {
      setdata((prev: any) => [
        ...prev,
        {
          role: "assistant",
          tipe: "Jawaban",
          content: asisstant,
        },
      ]);
    } else {
      console.log("error");
    }
  };

  const Deletedata = (role: any) => {
    const del = data.filter((d: any) => d.role !== role);
    setdata([]);
  };

  return (
    <div className="w-[90%]  fixed left-20 z-10 mx-auto h-screen  top-0 ">
      <div className="w-[80%] shadow-xl p-3 relative rounded-lg bg-slate-200 h-[80vh] overflow-y-auto z-10 mx-auto mt-[20px] ">
        <div className="backdrop-blur-lg fixed pl-3 w-[70%] ">
          <FaWindowClose
            onClick={() => props.setOpen(false)}
            className="absolute right-2"
            size={25}
          />
          <h1 className="text-xl mt-4 font-[500] ">Buat Dataset </h1>
          <hr />
        </div>
        <h1>{}</h1>
        <div className="w-full p-3 mt-10">
          {data.map((d: any, i: any) => (
            <div
              className="flex w-full text-[15px] justify-between mb-2"
              key={i}
            >
              <div className="">
                <h1 className="font-medium">{d?.tipe}</h1>
                <p className="text-sm">{d?.content}</p>
              </div>
            </div>
          ))}
          {data.length > 0 ? (
            <button className="underline text-red-500" onClick={Deletedata}>
              hapus
            </button>
          ) : null}

          <div className="mb-5 mt-5">
            <textarea
              onChange={(e: any) => setUser(e.target.value)}
              value={user}
              className="h-[100px] rounded-md w-full pl-2 pt-2"
              placeholder="User..."
            />
            <button
              className="px-2 border-[1px] rounded-md border-black"
              onClick={Add}
            >
              +
            </button>
          </div>
          <div className="mb-5">
            <textarea
              onChange={(e: any) => setAsisstant(e.target.value)}
              value={asisstant}
              className="h-[100px] rounded-md w-full pl-2 pt-2"
              placeholder="Asisstant..."
            />
            <button
              className="px-2 border-[1px] rounded-md border-black"
              onClick={Add2}
            >
              +
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={CreateDataset}
              className="p-3 rounded-md border-2 bg-white border-black"
            >
              Tambahkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
