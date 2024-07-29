'use client'

import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useState } from 'react'
import AdminProductForm from '@/src/componentsAdmin/products/AdminProductForm';
import AdminProductList from './components/AdminProductList'

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin')
    },
  })

  const [activeTab, setActiveTab] = useState('add') // 'add' o 'list'

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (!session?.user?.isAdmin) {
    return <p>Access Denied</p>
  }

  return (
    <div>
      <div className="mb-4">
        <button 
          onClick={() => setActiveTab('add')} 
          className={`mr-2 px-4 py-2 ${activeTab === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Agregar Producto
        </button>
        <button 
          onClick={() => setActiveTab('list')} 
          className={`px-4 py-2 ${activeTab === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Ver Productos
        </button>
      </div>
      {activeTab === 'add' ? <AdminProductForm /> : <AdminProductList />}
    </div>
  )
}