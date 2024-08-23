import { server } from "@/server";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

interface ModalInsertIdProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalInsertId: React.FC<ModalInsertIdProps> = ({ open, setOpen }) => {
  const [idpelanggan, setIdPelanggan] = useState("");
  const { data } = useSession();
  const InsertIdPelanggan = () => {
    axios
      .post(`${server}insertidakun`, {
        email: data?.user?.email,
        id_user: idpelanggan,
      })
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        Swal.fire("ID Pelanggan ga valid");
      });
  };
  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 bg-[#040404] flex items-center justify-center">
      <div className="w-[50%] h-[35%] bg-white rounded-md  px-4 py-4">
        <h1 className="text-md font-[500] w-[70%] mx-auto mt-4">
          ID Pelanggan
        </h1>
        <div className="px-8 w-full mb-4">
          <div className="w-[70%] mx-auto">
            <input
              type="text"
              onChange={(e) => setIdPelanggan(e.target.value)}
              value={idpelanggan}
              className="h-[40px] pl-2 w-[80%] mx-auto border-[1px] rounded-md border-black"
              placeholder="Masukan ID Pelanggan"
            />
            <button
              onClick={InsertIdPelanggan}
              className="p-2 mt-3 h-[40px] border-[1px] border-black rounded-md"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInsertId;
