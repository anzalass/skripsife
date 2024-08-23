import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";


export function mainmiddleware(req: NextRequest) {
    const res = NextResponse.next();
    return res
}


export default withAuth(mainmiddleware, [ "/admin/home", "/admin/masuk", "/pembayaran","/chat", "/pengaduan", "/pengaduan/riwayat-pengaduan", "/admin/pelanggan", "/admin/pembayaran", "/admin/detailpengguna/[slug]", "/admin/faq", "/admin/tagihan", "/admin/pengaduan", "/admin/dataset", "/admin/chatuser"])