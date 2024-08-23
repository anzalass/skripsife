import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

import axios from "axios";
import { server } from "@/server";
import Swal from "sweetalert2";
import { RenderTableUser } from "@/context/renderTableUser";
import Createfaq from "./createfaq";
import Updatefaq from "./updatefaq";
type FaqType = {
  no: number;
  id: number;
  question: string;
  answer: string;
  view: number;
  created_at: string;
};
export default function TabelFaq({ faq }: { faq: FaqType[] }) {
  const [gridKey, setGridKey] = useState(0);
  const [rows, setRows] = useState<FaqType[]>([]);
  const [edit, setEdit] = useState(false);
  const [idfaq, setIdfaq] = useState(0);
  const { render, setRender } = useContext(RenderTableUser);
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
      headerName: "ID",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "question",
      headerName: "Question",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "answer",
      headerName: "Answer",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "view",
      headerName: "View",
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
          </div>
        );
      },
    },
  ];

  const HandleTrigerEdit = (id: any) => {
    setEdit(true);
    setAddFaq(false);
    setIdfaq(id);
  };

  const HandleTrigerDelete = (id: any) => {
    setRender(false);
    axios
      .delete(`${server}faq/${id}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Menghapus FAQ",
        });
        setRender(true);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Menghapus FAQ",
        });
      });
    setRender(false);
  };

  const InsertData = () => {
    const data: any = faq?.map((p, index) => ({
      no: index + 1,
      id: p.id,
      question: p.question,
      answer: p.answer,
      view: p.view,
      created_at: p.created_at,
    }));
    setRows(data); // Mengatur rows menggunakan setRows
  };

  useEffect(() => {
    InsertData();
  }, [faq]);
  const [addfaq, setAddFaq] = useState<any>(false);
  return (
    <>
      {addfaq ? (
        <div className=" w-full mx-auto ">
          <Createfaq setOpen={setAddFaq} />
        </div>
      ) : null}
      {edit ? (
        <div className=" w-full mx-auto ">
          <Updatefaq setOpen={setEdit} id={idfaq} />
        </div>
      ) : null}
      <div className=""></div>
      <div className="w-full relative">
        <div className="flex justify-between w-full ">
          <div className="flex justify-between w-full">
            <div className="flex ">
              <div className="">
                <button
                  onClick={() => setAddFaq(true)}
                  className="border-2 h-[40px] px-2 rounded-md"
                >
                  Buat Faq {"+"}
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
