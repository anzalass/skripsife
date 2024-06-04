import Sidebaradmin from "@/components/layout/sidebaradmin";
import TabelUser from "@/components/tabeluser";
import { RenderTableUser } from "@/context/renderTableUser";
import { server } from "@/server";
import { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

type PelangganType = {
  no: number;
  id: number;
  name: string;
  status: string;
  alamat: string;
  paket_langganan: string;
  harga_langganan: number;
  created_at: string;
};

export default function Pelanggan(props: { pengguna: PelangganType[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(3);
  const { render, setRender } = useContext(RenderTableUser);
  const [pengguna, setPengguna] = useState(props.pengguna);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}all-pelanggan`);
      const response = await res.json();
      setPengguna(response.data);
    }
    fetchData();
  }, [render]);

  return (
    <div className="w-full">
      {/*  Template admin*/}
      {open ? null : (
        <div className="relative">
          <RxHamburgerMenu
            onClick={() => setOpen(true)}
            className="absolute left-3 top-3 "
            size={25}
          />
        </div>
      )}

      {open ? (
        <Sidebaradmin open={open} setOpen={setOpen} active={active} />
      ) : null}
      {/* Template Admin */}

      <div className="w-[94%] mx-auto  h-[100vh] pt-3">
        <div className="w-[97%] mx-auto  h-[70px]  p-3  border-b-[1px] border-black">
          <h1 className="text-xl font-[500] pl-3 mt-2">Pengguna</h1>
          <div className="w-full mt-[40px]">
            {pengguna ? (
              <TabelUser pelanggan={pengguna} />
            ) : (
              <p>Tidak ada data pengguna.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:8000/all-pelanggan");
//   const response = await res.json();

//   return {
//     props: {
//       pengguna: response.data,
//     },
//   };
// }
