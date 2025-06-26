import { useState, useCallback, useEffect } from 'react'
import { FamilyMemberDTO } from '@/src/types/family'
import { getFamilyMembers, addFamilyMember as apiAddFamilyMember, updateFamilyMember as apiUpdateFamilyMember, deleteFamilyMember as apiDeleteFamilyMember } from '@/src/services/local-api'

export const useFamilyMembers = (userId: string) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFamilyMembers = () => {
      setIsLoading(true)
      const members = getFamilyMembers(userId)
      setFamilyMembers(members)
      setIsLoading(false)
    }

    if (userId) {
      loadFamilyMembers()
    }
  }, [userId])

  const addFamilyMember = useCallback((newMember: Omit<FamilyMemberDTO, 'id' | 'userId'>) => {
    const memberWithId = apiAddFamilyMember(userId, newMember)
    setFamilyMembers(prev => [...prev, memberWithId])
  }, [userId])

  const updateFamilyMember = useCallback((updatedMember: FamilyMemberDTO) => {
    const updated = apiUpdateFamilyMember(userId, updatedMember)
    if (updated) {
      setFamilyMembers(prev => 
        prev.map(member => 
          member.id === updatedMember.id ? updated : member
        )
      )
    }
  }, [userId])

  const deleteFamilyMember = useCallback((id: number) => {
    const success = apiDeleteFamilyMember(userId, id)
    if (success) {
      setFamilyMembers(prev => prev.filter(member => member.id !== id))
    }
  }, [userId])

  return {
    familyMembers,
    isLoading,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember
  }
} 