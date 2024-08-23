import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { server } from "@/server";
import AddUser from "../modaluser";
import Edituser from "../modaluser/edituser";
import Swal from "sweetalert2";
import { RenderTableUser } from "@/context/renderTableUser";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useRouter } from "next/router";

type PelangganType = {
  no: number;
  id: number;
  name: string;
  status: string;
  alamat: string;
  paket_langganan: string;
  harga_langganan: any;
  created_at: string;
};

export let edit = false;

export default function TabelUser({
  pelanggan,
}: {
  pelanggan: PelangganType[];
}) {
  const [gridKey, setGridKey] = useState(0);
  const [row, setRows] = useState<PelangganType[]>([]);
  const [open, setOpen] = useState<any>(false);
  const [edit, setEdit] = useState<any>(false);
  const { push } = useRouter();

  const [id, setId] = useState<any>(0);
  const { render, setRender } = useContext(RenderTableUser);

  const HandleTrigerEdit = (id: any) => {
    setEdit(true);
    setId(id);
  };

  const HandleTrigerDelete = (ida: any) => {
    setRender(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!" + ida,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${server}delete-pelanggan/${ida}`)
          .then((result) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setRender(true);
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal!",
              text: "deleted.",
              icon: "error",
            });
            console.log(err);
          });
      }
    });
    setRender(false);
  };
  const columns = [
    {
      field: "no",
      headerName: "No",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "id",
      headerName: "ID User",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Nama",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "alamat",
      headerName: "Alamat",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "paket_langganan",
      headerName: "Paket Langganan",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "harga_langganan",
      headerName: "Harga Langganan",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "created_at",
      headerName: "Tanggal Gabung",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "aksi",
      headerName: "Aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      flex: 0.7,
      minWidth: 150,

      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className="flex">
            <button className="mr-4">
              <BsTrash3
                color="red"
                size={20}
                onClick={() => HandleTrigerDelete(params.id)}
              />
            </button>
            <button className="">
              <BiEditAlt
                onClick={() => HandleTrigerEdit(params.id)}
                color="blue"
                size={20}
              />
            </button>
            {/* <button className="ml-2">
              <IoArrowForwardCircle
                onClick={() => push(`/admin/detailpengguna/${params?.id}`)}
                color="blue"
                size={20}
              />
            </button> */}
          </div>
        );
      },
    },
  ];

  const InsertData = () => {
    const data = pelanggan?.map((p, index) => ({
      no: index + 1,
      id: p.id,
      name: p.name,
      status: p.status,
      alamat: p.alamat,
      paket_langganan: p.paket_langganan,
      harga_langganan: p.harga_langganan.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      created_at: p.created_at,
    }));
    setRows(data); // Mengatur rows menggunakan setRows
  };

  useEffect(() => {
    InsertData();
  }, [render, pelanggan]);

  // Change `row` to `rows` in the DataGrid component
  return (
    <>
      {open ? (
        <div className=" w-full mx-auto ">
          <AddUser open={open} setOpen={setOpen} />
        </div>
      ) : null}
      {edit ? (
        <div className=" w-full mx-auto ">
          <Edituser id={id} setOpen={setEdit} />
        </div>
      ) : null}

      <div className="w-full relative">
        <div className="flex justify-between w-full ">
          <div className="flex justify-between w-full">
            <div className="flex ">
              <div className="">
                <button
                  onClick={() => setOpen(true)}
                  className="border-2 h-[40px] px-2 rounded-md"
                >
                  Tambah Pelanggan {"+"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7">
          <DataGrid
            key={gridKey}
            disableRowSelectionOnClick
            autoHeight
            columns={columns}
            getRowId={(row) => row?.id}
            rows={row}
          />
        </div>
      </div>
    </>
  );
}
