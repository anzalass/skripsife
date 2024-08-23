import { RenderTableUser } from "@/context/renderTableUser";
import { server } from "@/server";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UpdateDataset(props: { setOpen: any; id: any }) {
  const [user, setUser] = useState("");
  const [asisstant, setAsisstant] = useState("");
  const { render, setRender } = useContext(RenderTableUser);

  const GetDatasetById = () => {
    axios.get(`${server}dataset/${props.id}`).then((res) => {
      setUser(res.data.data2.content);
      setAsisstant(res.data.data.content);
      console.log(res);
    });
  };

  useEffect(() => {
    GetDatasetById();
  }, [props.id]);

  const UpdatePertanyaan = async () => {
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
          .put(`${server}dataset/${props.id - 1}`, {
            content: user,
          })
          .then((response) => {
            Swal.fire({
              title: "Berhasil!",
              text: "mengupdate dataset .",
              icon: "success",
            });
            setRender(true);
            props.setOpen(false);
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal!",
              text: "mengupdate faq ini",
              icon: "error",
            });
          });
      }
    });
    setRender(false);
  };
  const UpdateJawaban = async () => {
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
          .put(`${server}dataset/${props.id}`, {
            content: asisstant,
          })
          .then((response) => {
            Swal.fire({
              title: "Berhasil!",
              text: "mengupdate dataset .",
              icon: "success",
            });
            setRender(true);
            props.setOpen(false);
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal!",
              text: "mengupdate faq ini",
              icon: "error",
            });
          });
      }
    });
    setRender(false);
  };

  return (
    <div className="w-[90%]  fixed left-20 z-10 mx-auto h-screen   top-0 ">
      <div className="w-[80%] shadow-xl p-3 relative rounded-lg bg-slate-200 h-[70vh] z-10 mx-auto mt-[150px] ">
        <FaWindowClose
          onClick={() => props.setOpen(false)}
          className="absolute right-2"
          size={25}
        />
        <h1 className="text-xl mt-4 font-[500]">Update Dataset </h1>
        <h1>{}</h1>
        <div className="w-full p-3 mt-5">
          <div className="mb-5">
            <textarea
              onChange={(e: any) => setUser(e.target.value)}
              value={user}
              className="h-[100px] rounded-md w-full pl-2 pt-2"
              placeholder="User..."
            />
            <div className="w-full">
              <button
                onClick={UpdatePertanyaan}
                className="p-3 rounded-md border-2 bg-white border-black"
              >
                Simpan
              </button>
            </div>
          </div>
          <div className="mb-5">
            <textarea
              onChange={(e: any) => setAsisstant(e.target.value)}
              value={asisstant}
              className="h-[100px] rounded-md w-full pl-2 pt-2"
              placeholder="Asisstant..."
            />
            <div className="w-full">
              <button
                onClick={UpdateJawaban}
                className="p-3 rounded-md border-2 bg-white border-black"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
