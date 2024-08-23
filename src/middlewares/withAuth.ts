import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";


const onlyAdmin = ["/admin/home", "/admin/pengguna", "/admin/pembayaran", "/admin/pengaduan", "/admin/pelanggan", "/admin/faq", "/admin/dataset" ,"/admin/chatuser" ]
const wasLogin = ["/admin/masuk"]



export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        if (requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXT_AUTH_SECRET
            });

            if (token && token.role !== "admin" && onlyAdmin.includes(pathname) ) {
                return NextResponse.redirect(new URL("/", req.url));
            }


            // Jika pengguna sudah login dan mencoba mengakses rute "/auth/masuk", redirect ke rute beranda ("/")
            if (pathname === "/admin/masuk" && token && token.role === "admin") {
                return NextResponse.redirect(new URL("/admin/pelanggan", req.url));
            }

            // Jika rute membutuhkan autentikasi dan pengguna belum login
            if (requireAuth.includes(pathname) && !token && pathname !== "/admin/masuk") {
                const url = new URL("/", req.url);
                url.searchParams.set("callbackUrl", encodeURI(req.url));
                return NextResponse.redirect(url);
            }

            if (!token && pathname === "/admin/detailpengguna/:slug") {
                const url = new URL("/", req.url);
                url.searchParams.set("callbackUrl", encodeURI(req.url));
                return NextResponse.redirect(url);
            }

            // Jika pengguna sudah login dan mencoba mengakses rute yang hanya untuk admin, redirect ke rute beranda ("/")
         
      
            // Jika pengguna sudah login dan mencoba mengakses rute yang hanya untuk pengguna yang belum login, redirect ke rute beranda ("/")
            if (token && wasLogin.includes(pathname)) {
                return NextResponse.redirect(new URL("/", req.url));
            }
            

        }
        return middleware(req, next)
        }
}


// export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
//     return async (req: NextRequest, next: NextFetchEvent) => {
//         const pathname = req.nextUrl.pathname;

//         // Jika rute membutuhkan autentikasi
//         if (requireAuth.includes(pathname)) {
//             const token = await getToken({
//                 req,
//                 secret: process.env.NEXT_AUTH_SECRET
//             });

//             // Jika pengguna sudah login dan mencoba mengakses rute "/auth/masuk", redirect ke rute beranda ("/")
//             if (pathname === "/auth/masuk" && token && token.role === "admin") {
//                 return NextResponse.redirect(new URL("/admin/home", req.url));
//             }

//             // Jika pengguna belum login dan mencoba mengakses rute yang membutuhkan autentikasi, redirect ke rute beranda dengan menyertakan callbackUrl
//             if (!token && pathname !== "/auth/masuk") {
//                 const url = new URL("/", req.url);
//                 url.searchParams.set("callbackUrl", encodeURI(req.url));
//                 return NextResponse.redirect(url);
//             }
//         }

//         // Jika pengguna sudah login tetapi bukan admin dan mencoba mengakses rute yang hanya untuk admin, redirect ke rute beranda ("/")
//         const token = await getToken({
//             req,
//             secret: process.env.NEXT_AUTH_SECRET
//         });
//         if (token && token.role !== "admin" && onlyAdmin.includes(pathname)) {
//             return NextResponse.redirect(new URL("/", req.url));
//         }

//         // Jika pengguna sudah login dan mencoba mengakses rute yang hanya untuk pengguna yang belum login, redirect ke rute beranda ("/")
//         if (token && wasLogin.includes(pathname)) {
//             return NextResponse.redirect(new URL("/", req.url));
//         }

//         // Lanjutkan ke middleware jika tidak ada kondisi yang cocok
//         return middleware(req, next);
//     };
// }
