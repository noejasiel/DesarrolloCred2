/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MY_SES_ACCESS_KEY_ID: process.env.MY_SES_ACCESS_KEY_ID,
        MY_SES_SECRET_ACCESS_KEY: process.env.MY_SES_SECRET_ACCESS_KEY,
      },
};

export default nextConfig;
