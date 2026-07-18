/** @type {import('next').NextConfig} */
const nextConfig = {
    // 输出 standalone 模式
    output: 'standalone',

    // 图片优化配置
    images: {
        domains: ['your-cdn-domain.com'],
        // 禁用优化（使用 CDN 时）
        // unoptimized: true,
    },

    // 静态资源前缀（CDN）
    // assetPrefix: 'https://cdn.yourdomain.com',

    // 压缩配置
    compress: true,

    // 生产环境优化
    productionBrowserSourceMaps: false,

    // 实验性功能
    experimental: {
        // 优化包导入
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    },
};

module.exports = nextConfig;
