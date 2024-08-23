import Link from "next/link";
import { FaWindowClose } from "react-icons/fa";

interface SidebaradminProps {
  open: any;
  setOpen: (open: any) => void;
  active: any;
}

const Sidebaradmin: React.FC<SidebaradminProps> = ({
  open,
  setOpen,
  active,
}) => {
  return (
    <div className="w-[200px] fixed bg-zinc-200 left-2 top-2 p-3 z-50 rounded-md">
      <FaWindowClose
        onClick={() => setOpen(false)}
        className="absolute right-2"
        size={25}
      />
      <div className=" font-[500] gap-2 rounded-md">
        <Link href={"/"}>
          <h1 className="p-2 bg-white rounded-md mb-2">Home</h1>
        </Link>
        <Link href={"/admin/pelanggan"}>
          <h1 className="p-2 bg-white rounded-md mb-2">Daftar Pengguna</h1>
        </Link>
        <Link href={"/admin/faq"}>
          <h1 className="p-2 bg-white rounded-md">FAQ</h1>
        </Link>
        <Link href={"/admin/dataset"}>
          <h1 className="p-2 bg-white rounded-md mt-2">Dataset AI</h1>
        </Link>
        <Link href={"/admin/chatuser"}>
          <h1 className="p-2 bg-white rounded-md mt-2">Chat User</h1>
        </Link>
      </div>
    </div>
  );
};

export default Sidebaradmin;
