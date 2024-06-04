import Cardfaq from "./cardfaq";

export default function Faq() {
  return (
    <div>
      <div className="w-[83%] mt- mx-auto">
        <div className="flex justify-between mb-4">
          <div className="">
            <h1 className="font-bold text-xl">Frequently Ask & Questions</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              className="h-[40px] w-[300px] pl-3 placeholder:text-sm border-[1px] border-black rounded-md"
              placeholder="Cari FaQ"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <Cardfaq />
          <Cardfaq />
          <Cardfaq />
          <Cardfaq />
          <Cardfaq />
          <Cardfaq />
          <Cardfaq />
          <Cardfaq />
        </div>
      </div>
    </div>
  );
}
