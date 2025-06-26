import { useState, useCallback } from 'react'

export const useModalState = <T,>() => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const openModal = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    setSelectedItem(null)
  }, [])

  return {
    isModalVisible,
    selectedItem,
    openModal,
    closeModal,
    setSelectedItem
  }
} 