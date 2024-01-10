/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds:true
    },
    images:{
        remotePatterns:[
           
            {
                protocol:'https',
                hostname:"ksports.s3.us-east-2.amazonaws.com",
            }
        ]
    }
}

module.exports = nextConfig
