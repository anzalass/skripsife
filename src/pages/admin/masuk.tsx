import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Masuk() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const LoginAdmin = async (e: any) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (!res?.error) {
        setLoading(false);
        Swal.fire({
          title: "Berhasil",
          showConfirmButton: false,
          timer: 1000,
          icon: "success",
        });
        push("/admin/pelanggan");
      } else {
        setLoading(false);
        Swal.fire({
          title: "Login gagal",
          text: "email atau password salah",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
        });
        setErr("Email or Password incorrect");
      }
    } catch (error: any) {
      setLoading(false);
      setErr("Email or password incorrect");
    }
  };
  return (
    <div className="w-full ">
      <div className="w-[46%] mt-[7%] mx-auto ">
        <Link href={"/"}>
          <button className="px-3 border-2 mb-3 rounded-xl py-2">
            Kembali
          </button>
        </Link>
        <div className="w-[full]  mx-auto flex items-center my-auto justify-center  border-[1px] border-black rounded-md py-10">
          <div className="w-[85%]">
            <h1 className="font-[500]">Masuk sebagai admin</h1>
            <div className="mt-2">
              <input
                type="text"
                className="w-full h-[40px] border-[1px] rounded-md pl-3 placeholder:text-sm placeholder:font-medium"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <input
                type="password"
                className="w-full placeholder:text-sm placeholder:font-medium h-[40px] border-[1px] rounded-md pl-3"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4 w-[70%] mx-auto">
              <button
                onClick={LoginAdmin}
                disabled={loading ? true : false}
                className="w-[100%] hover:bg-white font-medium hover:text-black bg-black border-black text-white mx-auto h-[40px] border-2 rounded-md pl-3"
              >
                {loading ? "Loading..." : "Masuk"}
              </button>
            </div>
            {/* <div className="w-[50%] mx-auto text-center mt-3">
              <h1>
                Belum punya akun?{" "}
                <Link href={"/auth/daftar"}>
                  <span className="underline text-blue-500 hover:font-[500] cursor-pointer">
                    Daftar
                  </span>
                </Link>
              </h1>
              <h1 className="hover:font-[500]">Lupa Password?</h1>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
