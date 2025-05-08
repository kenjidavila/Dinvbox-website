"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Globe, Settings, LogOut, Home, Shield, Menu, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navigationItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Mapa Mundial", href: "/admin/mapa-mundial", icon: Globe },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Calendario Fiscal", href: "/admin/calendario-fiscal", icon: Calendar },
    { name: "Estadísticas", href: "/admin/estadisticas", icon: BarChart3 },
    { name: "Configuración", href: "/admin/configuracion", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/admin" className="flex items-center">
              <Image src="/images/dinvbox-logo.png" alt="DINVBOX" width={150} height={50} className="h-8 w-auto" />
              <span className="ml-2 font-semibold text-navy-900 bg-gray-100 px-2 py-1 rounded text-sm">Admin</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Shield className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Administrador</p>
                <p className="text-xs text-gray-500">admin@dinvbox.es</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-navy-50 text-navy-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? "text-navy-600" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Button variant="ghost" className="w-full justify-start text-gray-500 hover:text-gray-700">
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </Button>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 flex z-40">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setIsMobileSidebarOpen(false)}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Image src="/images/dinvbox-logo.png" alt="DINVBOX" width={150} height={50} className="h-8 w-auto" />
                  <span className="ml-2 font-semibold text-navy-900 bg-gray-100 px-2 py-1 rounded text-sm">Admin</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-navy-50 text-navy-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-4 h-6 w-6 ${
                          isActive(item.href) ? "text-navy-600" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Button variant="ghost" className="w-full justify-start text-gray-500 hover:text-gray-700">
                  <LogOut className="mr-3 h-6 w-6" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 w-14"></div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
