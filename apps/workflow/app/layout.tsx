// import { GlobalHeader } from '@/components/global-header'

import './globals.css';

import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="h-screen flex flex-col">
                    {/* 全局顶部导航 */}
                    {/* <GlobalHeader /> */}
                    <div>header</div>

                    {/* 主内容区 */}
                    <main className="flex-1 overflow-auto bg-[#f4f6fb]">{children}</main>
                    <Toaster richColors position="top-center" />
                </div>
            </body>
        </html>
    );
}
