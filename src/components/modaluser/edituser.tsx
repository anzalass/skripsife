import { RenderTableUser } from "@/context/renderTableUser";
import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";

type PelangganType = {
  no: number;
  id: number;
  name: string;
  status: string;
  alamat: string;
  paket_langganan: string;
  harga_langganan: number;
};

export default function Edituser(props: { setOpen: any; id: any }) {
  const [name, setName] = useState("");
  const [alamat, setalamat] = useState("");
  const [paketLangganan, setPaketLangganan] = useState("");
  const [hargaLangganan, setHargaLangganan] = useState(0);
  const [status, setStatus] = useState("");
  const [pelanggan, setpelanggan] = useState<PelangganType>();
  const { render, setRender } = useContext(RenderTableUser);
  const router = useRouter();
  const EditUser = async (e: any) => {
    setRender(true);
    e.preventDefault();
    if (pelanggan) {
      await axios
        .put(`${server}update-pelanggan/${props.id}`, {
          name: name,
          status: status,
          alamat: alamat,
          paket_langganan: paketLangganan,
          harga_langganan: hargaLangganan,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "mengupdate user",
          });
          setRender(true);
        })
        .catch((err) => {
          console.log(err);

          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "mengupdate user",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Gagal",
      });
    }
    setRender(false);
  };

  useEffect(() => {
    const GetPelangganByID = async () => {
      await axios.get(`${server}pelanggan/${props.id}`).then((res) => {
        setpelanggan(res.data.data);
        setName(res.data.data.name);
        setalamat(res.data.data.alamat);
        setPaketLangganan(res.data.data.paket_langganan);
        setHargaLangganan(res.data.data.harga_langganan);
        setStatus(res.data.data.status);
      });
    };
    GetPelangganByID();
  }, [props.id]);

  return (
    <div className="w-[90%]  fixed left-20 z-10 mx-auto h-screen   top-0 ">
      <div className="w-[50%] shadow-xl p-3 relative rounded-lg bg-slate-200 h-[80vh] z-10 mx-auto mt-10 ">
        <FaWindowClose
          onClick={() => props.setOpen(false)}
          className="absolute right-2"
          size={25}
        />
        <h1 className="text-xl mt-4 font-[500]">Edit Pelanggan {props.id}</h1>

        <div className="w-full p-3 mt-5">
          <div className="mb-5">
            <input
              onChange={(e: any) => setName(e.target.value)}
              type="text"
              value={name}
              className="h-[45px] rounded-lg w-full pl-3"
              placeholder="Nama"
            />
          </div>
          <div className="mb-5">
            <textarea
              onChange={(e: any) => setalamat(e.target.value)}
              value={alamat}
              className="h-[55px] rounded-md w-full pl-2 pt-2"
              placeholder="Alamat"
            />
          </div>
          <div className="mb-5">
            <input
              onChange={(e: any) => setPaketLangganan(e.target.value)}
              type="text"
              value={paketLangganan}
              className="h-[45px] rounded-lg w-full pl-3"
              placeholder="Paket Langganan"
            />
          </div>
          <div className="mb-5">
            <input
              onChange={(e: any) => setHargaLangganan(parseInt(e.target.value))}
              type="number"
              value={hargaLangganan}
              className="h-[45px] rounded-lg w-full pl-3"
              placeholder="Harga Langganan"
            />
          </div>
          <div className="mb-5">
            <select
              name=""
              id=""
              onChange={(e: any) => setStatus(e.target.value)}
              value={status}
            >
              <option value="">Pilih</option>
              <option value="aktif">Aktif</option>
              <option value="non aktif">Non Aktif</option>
              <option value="isolir">Isolir</option>
            </select>
          </div>
          <div className="w-full">
            <button
              onClick={EditUser}
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
