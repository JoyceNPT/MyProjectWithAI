"use client"

import { MobileSidebar } from "@/components/layout/mobile-sidebar"

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <div className="flex items-center p-4 border-b">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                {/* Add UserButton or Profile here later */}
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                    User
                </div>
            </div>
        </div>
    )
}
