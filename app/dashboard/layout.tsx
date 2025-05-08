"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  FileText,
  Users,
  FileCheck,
  Settings,
  LogOut,
  PlusCircle,
  Globe,
  Home,
  Bell,
  Search,
  User,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useState, Suspense } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-50 md:hidden ${isMobileSidebarOpen ? "block" : "hidden"}`}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-white">
            <DashboardSidebar mobile onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden mr-2"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Buscar..." className="pl-8 bg-gray-50 border-gray-200 focus:bg-white" />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-orange-500">
                        <span className="text-[10px]">3</span>
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-auto">
                      {[1, 2, 3].map((i) => (
                        <DropdownMenuItem key={i} className="py-3 cursor-pointer">
                          <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <FileText className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Nueva factura creada</p>
                              <p className="text-xs text-gray-500 mt-1">Factura F{i} emitida correctamente</p>
                              <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/abstract-geometric-shapes.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">Juan Díaz</p>
                        <p className="text-xs text-gray-500">Administrador</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <Suspense>{children}</Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function DashboardSidebar({ mobile = false, onClose = () => {} }) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-gray-200 h-full">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <Image src="/images/dinvbox-logo.png" alt="DINVBOX" width={150} height={50} className="h-8 w-auto" />
          </Link>
          {mobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/facturas">
                    <FileText className="h-5 w-5" />
                    <span>Facturas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/facturas-recibidas">
                    <FileCheck className="h-5 w-5" />
                    <span>Facturas Recibidas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/clientes">
                    <Users className="h-5 w-5" />
                    <span>Clientes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/informes">
                    <BarChart3 className="h-5 w-5" />
                    <span>Informes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/ajustes">
                    <Settings className="h-5 w-5" />
                    <span>Ajustes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/integraciones">
                    <Globe className="h-5 w-5" />
                    <span>Integraciones</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button className="w-full justify-start bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white mb-4 rounded-full shadow-md">
          <PlusCircle className="mr-2 h-5 w-5" />
          <span>Nueva Factura</span>
        </Button>
        <Button variant="outline" className="w-full justify-start text-gray-700 border-gray-300">
          <LogOut className="mr-2 h-5 w-5" />
          <span>Cerrar Sesión</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
