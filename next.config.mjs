/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "mediagrasi.net",
      "subsystem.indihome.co.id",
      "lh3.googleusercontent.com",
      "images.tokopedia.net",
    ], // Tambahkan domain yang sesuai dengan host gambar Anda
  },
};

export default nextConfig;
