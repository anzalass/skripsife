import TabelDataset from "@/components/dataset/tabeldataset";
import TabelFaq from "@/components/faq/tabelfaq";
import Sidebaradmin from "@/components/layout/sidebaradmin";
import { RenderTableUser } from "@/context/renderTableUser";

import { server } from "@/server";
import { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

type DatasetType = {
  id: number;
  role: string;
  content: string;
};

export default function Dataset(props: { dataset: DatasetType[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(6);
  const { render, setRender } = useContext(RenderTableUser);
  const [dataset, setAllDataset] = useState(props.dataset);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}dataset`);
      const response = await res.json();
      setAllDataset(response.data);
    }
    fetchData();
  }, [render]);
  return (
    <div className="w-full">
      {/*  Template admin*/}
      {open ? null : (
        <div className="relative z-50">
          <RxHamburgerMenu
            onClick={() => setOpen(true)}
            className="absolute left-3 top-3 z-50"
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
          <h1 className="text-xl font-[500] pl-3 mt-2">Dataset</h1>
          <div className="w-full mt-[60px]">
            {dataset ? <TabelDataset dataset={dataset} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
