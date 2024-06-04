import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

import axios from "axios";
import { server } from "@/server";
import Swal from "sweetalert2";
import { RenderTableUser } from "@/context/renderTableUser";
import CreateDataset from "./createdataset";
import UpdateDataset from "./updatedataset";
type DatasetType = {
  id: number;
  role: string;
  content: string;
};

export default function TabelDataset({ dataset }: { dataset: DatasetType[] }) {
  const [gridKey, setGridKey] = useState(0);
  const [rows, setRows] = useState<DatasetType[]>([]);
  const [edit, setEdit] = useState(false);
  const [idfaq, setIdfaq] = useState(0);
  const { render, setRender } = useContext(RenderTableUser);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "content",
      headerName: "Content",
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
        let id: any;
        if (params.id % 2 !== 0) {
          id = params.id + 1;
        } else {
          id = params.id;
        }
        return (
          <div className="flex">
            {params.id % 2 !== 0 ? null : (
              <div className="">
                <button className="mr-4">
                  <BsTrash3
                    color="red"
                    size={20}
                    onClick={() => HandleTrigerDelete(id)}
                  />
                </button>

                <button className="">
                  <BiEditAlt
                    onClick={() => HandleTrigerEdit(id)}
                    color="blue"
                    size={20}
                  />
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const HandleTrigerEdit = (id: any) => {
    setEdit(true);
    setAddDataset(false);
    setIdfaq(id);
  };

  const HandleTrigerDelete = (id: any) => {
    setRender(false);
    axios
      .delete(`${server}dataset/${id}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Menghapus Dataset",
        });
        setRender(true);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Menghapus Dataset",
        });
      });
    axios
      .delete(`${server}dataset/${id - 1}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Menghapus Dataset",
        });
        setRender(true);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Menghapus Dataset",
        });
      });
    setRender(false);
  };

  const InsertData = () => {
    const data: any = dataset?.map((p, index) => ({
      no: index + 1,
      id: p.id,
      role: p.role,
      content: p.content,
    }));
    setRows(data); // Mengatur rows menggunakan setRows
  };

  useEffect(() => {
    InsertData();
  }, [dataset]);
  const [adddataset, setAddDataset] = useState<any>(false);
  return (
    <>
      {adddataset ? (
        <div className=" w-full mx-auto ">
          <CreateDataset setOpen={setAddDataset} />
        </div>
      ) : null}
      {edit ? (
        <div className=" w-full mx-auto ">
          <UpdateDataset setOpen={setEdit} id={idfaq} />
        </div>
      ) : null}
      <div className=""></div>
      <div className="w-full relative">
        <div className="flex justify-between w-full ">
          <div className="flex justify-between w-full">
            <div className="flex ">
              <div className="">
                <button
                  onClick={() => setAddDataset(true)}
                  className="border-2 h-[40px] px-2 rounded-md"
                >
                  Buat Dataset {"+"}
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
            getRowId={(rows) => rows?.id}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
}
