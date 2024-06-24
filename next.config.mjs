import path from "path";
/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(process.cwd(), "./public/scss")],
    },
};
export default nextConfig;
