'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import ColorCard from './ColorCard'
import { Brand } from '@/types/brands'
import { Palette, Plus, X } from 'lucide-react'
import CreateColor from './CreateColor'
import { Button } from './ui/button'

interface ColorModalProps {
  isOpen: boolean
  onClose: () => void
  brand: Brand | null
}

export default function ColorModal ({
  isOpen,
  onClose,
  brand
}: ColorModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openCreateColorForm () {
    setIsModalOpen(!isModalOpen)
  }

  const handleCreateColor = () => {
    setIsModalOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) {
          onClose()
          setIsModalOpen(false)
        }
      }}
    >
      <DialogContent
        className='w-11/12 max-w-[90vw] h-[75vh] max-h-[75vh] bg-primary'
        onPointerDownOutside={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-lg'>
            <Palette className='h-4 w-4' />
            {brand?.name}
            <Button
              variant='outline'
              size='sm'
              onClick={openCreateColorForm}
              className='gap-2 ml-4 bg-button'
            >
              {isModalOpen ? (
                <>
                  <X className='h-4 w-4' /> Cancel
                </>
              ) : (
                <>
                  <Plus className='h-4 w-4' /> Create Color
                </>
              )}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className='flex-1 overflow-y-auto'>
          {isModalOpen ? (
            <CreateColor
              onCreateColor={handleCreateColor}

            />
          ) : (
            brand && (
              <ColorCard
                brandId={brand.id}
              />
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
