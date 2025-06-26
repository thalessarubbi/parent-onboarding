import { FamilyMemberDTO } from "../types/family";

const familyMembersByUser: Record<string, FamilyMemberDTO[]> = {}

export const initializeUserFamilyMembers = (userId: string): void => {
  const familyMemberTemplate = [
    {
      name: "John Doe",
      age: 40,
      relation: "Child",
      genderIdentity: "Male",
      guardiansRelationshipQuality: 1
    },
    {
      name: "Jane Doe",
      age: 38,
      relation: "Spouse",
      genderIdentity: "Female",
      guardiansRelationshipQuality: 4
    },
    {
      name: "Mike Doe",
      age: 15,
      relation: "Child",
      genderIdentity: "Male",
      guardiansRelationshipQuality: 3
    },
    {
      name: "Sarah Doe",
      age: 12,
      relation: "Child",
      genderIdentity: "Female",
      guardiansRelationshipQuality: 5
    },
    {
      name: "Robert Doe",
      age: 65,
      relation: "Parent",
      genderIdentity: "Male",
      guardiansRelationshipQuality: 2
    },
    {
      name: "Mary Doe",
      age: 62,
      relation: "Parent",
      genderIdentity: "Female",
      guardiansRelationshipQuality: 4
    },
    {
      name: "Tom Doe",
      age: 35,
      relation: "Sibling",
      genderIdentity: "Male",
      guardiansRelationshipQuality: 3
    },
  ]
  
  const initialMembers: FamilyMemberDTO[] = familyMemberTemplate.map((member, index) => ({
    ...member,
    id: Date.now() + index + 1,
    userId
  }))
  
  familyMembersByUser[userId] = initialMembers
}

export const getFamilyMembers = (userId: string): FamilyMemberDTO[] => {
  return familyMembersByUser[userId] || []
}

export const addFamilyMember = (userId: string, familyMember: Omit<FamilyMemberDTO, 'id' | 'userId'>): FamilyMemberDTO => {
  const newMember: FamilyMemberDTO = {
    ...familyMember,
    id: Date.now(),
    userId
  }
  
  if (!familyMembersByUser[userId]) {
    familyMembersByUser[userId] = []
  }
  
  familyMembersByUser[userId].push(newMember)
  return newMember
}

export const updateFamilyMember = (userId: string, familyMember: FamilyMemberDTO): FamilyMemberDTO  | null => {
  const userMembers = familyMembersByUser[userId]
  if (!userMembers) return null
  
  const index = userMembers.findIndex(member => member.id === familyMember.id)
  if (index === -1) return null
  
  userMembers[index] = { ...familyMember, userId }
  return userMembers[index]
}

export const deleteFamilyMember = (userId: string, memberId: number): boolean => {
  const userMembers = familyMembersByUser[userId]
  if (!userMembers) return false
  
  const index = userMembers.findIndex(member => member.id === memberId)
  if (index === -1) return false
  
  userMembers.splice(index, 1)
  return true
} 