'use client'

import React, { useEffect, useState } from 'react'
import queryAllDocument from '@/helpers/firebase/queryAllDocument'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, Palette, Trash } from "lucide-react"
import { Brand } from '@/types/brands'
import { Button } from '@/components/ui/button'
import ColorModal from './ColorModal'

interface BrandCardProps {
  initialBrands?: Brand[]
}
import deleteDocument from "@/helpers/firebase/deleteDocument";

export default function BrandCard ({ initialBrands = [] }: BrandCardProps) {
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState<Brand[]>(initialBrands)
  const [error, setError] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchBrands = async () => {
    setLoading(true)
    setError(null)

    try {
      const fetchedBrands = (await queryAllDocument('brands')) as Brand[]
      setBrands(fetchedBrands)

      if (fetchedBrands.length === 0) {
        setError('No brands found.')
      }
    } catch (err) {
      setError('Error fetching brands: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBrands()
  }, [])

  useEffect(() => {
    if (initialBrands.length > 0) {
      setBrands(prevBrands => {
        const newBrands = initialBrands.filter(
          newBrand =>
            !prevBrands.some(existingBrand => existingBrand.id === newBrand.id)
        )
        return [...prevBrands, ...newBrands]
      })
    }
  }, [initialBrands])

  const openColorModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument("brands", id);
      console.log("Brand deleted successfully");
      fetchBrands();
    } catch (err) {
      setError("Error deleting brand: " + (err as Error).message);
    }
  };

  if (loading) {
    return (
      <div className='grid gap-6 sm:grid-cols-2'>
        {[...Array(4)].map((_, index) => (
          <Card key={index} className='relative overflow-hidden'>
            <CardHeader className='pb-4'>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-24 w-full rounded-lg' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant='destructive' className='max-w-md mx-auto'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <div className='grid gap-6 sm:grid-cols-2'>
        {brands.map(brand => (
          <Card
            key={brand.id}
            className="relative overflow-hidden transition-all hover:shadow-md bg-primary border-b border-secondary "
          >
            <CardHeader className="pb-1 border-b border-secondary">
              <CardTitle className="flex items-center justify-between px-4 py-0">
                <div className="flex items-center">
                  <Palette className="h-4 w-4" />
                  <span className="ml-2">{brand.name}</span>
                </div>
                <Button
                  onClick={() => handleDelete(brand.id)}
                  className="bg-transparent hover:bg-transparent p-0"
                >
                  <Trash className="text-red-500 h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-10'>
              <Button
                onClick={() => openColorModal(brand)}
                className="w-full text-secondary bg-button hover:bg-white"
                variant="outline"
              >
                View Colors
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <ColorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={selectedBrand}
      />
    </>
  )
}
