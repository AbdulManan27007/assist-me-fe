// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     dangerouslyAllowSVG: true,
//     contentDispositionType: "attachment",
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//     remotePatterns: [
//       { hostname: "img-cdn.pixlr.com" },
//       { hostname: "www.cribbageguy.com" },
//       { hostname: "golalo-media-content.s3.us-east-1.amazonaws.com" },
//     ],
//     domains: ["s3.us-east-1.amazonaws.com", "golalo-media-content.s3.us-east-1.amazonaws.com"]
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { hostname: "img-cdn.pixlr.com" },
      { hostname: "www.cribbageguy.com" },
      { hostname: "golalo-media-content.s3.us-east-1.amazonaws.com" }, // S3 bucket
      { hostname: "via.placeholder.com" },
    ],
    domains: [
      "golalo-media-content.s3.us-east-1.amazonaws.com",
      "s3.us-east-1.amazonaws.com",
      "via.placeholder.com",
      "res.cloudinary.com", 
    ],
  },
};

export default nextConfig;
