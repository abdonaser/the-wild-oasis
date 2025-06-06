/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'featncaaaojbbiuubtlu.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/cabin-images/**',
        }]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
