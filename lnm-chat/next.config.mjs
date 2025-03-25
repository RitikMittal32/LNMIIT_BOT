/** @type {import('next').NextConfig} */
const nextConfig = {
          output: 'export',
          images: {
                    unoptimized: true // Disable Image Optimization API
                  }
};
        
export default nextConfig;
        