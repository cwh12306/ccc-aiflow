'use client';

import { BookOpenIcon, SettingsIcon, WrenchIcon, ZapIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
    id: string;
    email: string;
    name: string | null;
    avatar: string | null;
}

const navItems = [
    { title: '工作室', url: '/', icon: ZapIcon, color: '#06B6D4' },
    { title: '知识库', url: '/knowledge', icon: BookOpenIcon, color: '#8B5CF6' },
    { title: '工具', url: '/tools', icon: WrenchIcon, color: '#F59E0B' },
];

export function GlobalHeader() {
    const pathname = usePathname();
    const [user] = useState<User | null>({
        name: 'ccc',
        email: 'ccc@example.com',
        id: '1',
        avatar: null,
    });

    const isNavActive = (item: (typeof navItems)[0]) => {
        return pathname === item.url;
    };

    const getUserInitial = () => {
        if (user?.name) return user.name.charAt(0).toUpperCase();
        if (user?.email) return user.email.charAt(0).toUpperCase();
        return 'U';
    };

    return (
        <header className="h-12 border-b border-b-muted-foreground/10 bg-[#F3F4FA] flex items-center px-4 gap-4 shrink-0">
            {/* Logo and Workspace */}
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-linear-to-r from-[#4F46E5] to-[#8B5CF6] rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-sm">W</span>
                    </div>
                    <span className="font-semibold text-lg">AI 引擎</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex items-center justify-center gap-1">
                {navItems.map(item => {
                    const isActive = isNavActive(item);
                    return (
                        <Link
                            key={item.url}
                            href={item.url}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                isActive ? 'bg-white font-bold shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                            style={{
                                color: isActive ? item.color : undefined,
                            }}
                        >
                            <item.icon size={16} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            {/* User Area */}
            <div className="flex items-center justify-end gap-2 w-[200px]">
                {user && <span className="text-sm text-muted-foreground truncate max-w-[120px]">{user.name || user.email}</span>}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                            <Avatar className="w-7 h-7">
                                <AvatarImage src={user?.avatar || undefined} />
                                <AvatarFallback className="bg-blue-600 text-white text-xs">{getUserInitial()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {user && (
                            <>
                                <div className="px-2 py-1.5 text-sm">
                                    <p className="font-medium">{user.name || '未设置姓名'}</p>
                                    <p className="text-muted-foreground text-xs">{user.email}</p>
                                </div>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuItem>
                            <SettingsIcon size={14} className="mr-2" />
                            设置
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>退出登录</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
