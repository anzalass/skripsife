import { server } from "@/server";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Modalinsertid() {
  const [idpelanggan, setIdPelanggan] = useState("");
  const { data } = useSession();
  const InsertIdPelanggan = () => {
    axios
      .post(`${server}insertidakun`, {
        email: data?.user?.email,
        id_user: idpelanggan,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-[#040404] flex items-center justify-center">
      <div className="w-[30%] h-[25%] bg-white rounded-md">
        <div className="pt-4 px-6">
          <h1 className="text-md font-[500]">ID Pelanggan</h1>
          <input
            type="text"
            onChange={(e) => setIdPelanggan(e.target.value)}
            value={idpelanggan}
            className="h-[40px] pl-2 w-full border-[1px] rounded-md border-black"
            placeholder="Masukan ID Pelanggan"
          />
          <button
            onClick={InsertIdPelanggan}
            className="p-2 mt-3 border-[1px] border-black rounded-md"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
