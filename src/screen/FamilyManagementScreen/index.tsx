import React from 'react'
import { GinkoLogo } from "@/src/components/GinkoLogo"
import { Box } from "@/src/components/ui/box"
import { Fab, FabIcon } from "@/src/components/ui/fab"
import { AddIcon } from "@/src/components/ui/icon"
import { Text } from "@/src/components/ui/text"
import { FlatList } from "react-native"
import { AddFamilyMemberModal } from "@/src/components/AddFamilyMemberModal"
import { DeleteConfirmationModal } from "@/src/components/DeleteConfirmationModal"
import { FamilyMemberCard } from "@/src/components/FamilyMemberCard"
import { useAuth } from "@/src/hooks/useAuth"
import { useFamilyMembers } from "@/src/hooks/useFamilyMembers"
import { useModalState } from "@/src/hooks/useModalState"
import { FamilyMemberDTO } from "@/src/types/family"

const Header = ({ userName }: { userName: string }) => (
  <>
    <Box className="items-center justify-center">
      <GinkoLogo width={300} height={400} />
    </Box>
    <Text className="text-h3 font-bold color-white ml-4 my-6">
      Welcome, {userName}!
    </Text>
  </>
)

const FamilyMembersList = ({ 
  familyMembers, 
  onEdit, 
  onDelete 
}: { 
  familyMembers: FamilyMemberDTO[]
  onEdit: (member: FamilyMemberDTO) => void
  onDelete: (member: FamilyMemberDTO) => void
}) => (
  <FlatList
    data={familyMembers}
    renderItem={({ item }) => (
      <FamilyMemberCard
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )}
    keyExtractor={(item) => item.id?.toString() ?? ""}
    contentContainerStyle={{ paddingBottom: 50 }}
  />
)

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <Fab 
    className="mb-4 mr-4 bg-ginko-accent w-20 h-20" 
    onPress={onPress}
  >
    <FabIcon 
      as={AddIcon} 
      size="lg" 
      color="white" 
      className="w-10 h-10" 
    />
  </Fab>
)

export const FamilyManagementScreen = () => {
  const { user } = useAuth()
  const { 
    familyMembers, 
    isLoading,
    addFamilyMember, 
    updateFamilyMember, 
    deleteFamilyMember 
  } = useFamilyMembers(user.id)
  
  const {
    isModalVisible,
    selectedItem: editingMember,
    openModal,
    closeModal,
    setSelectedItem: setEditingMember
  } = useModalState<FamilyMemberDTO>()

  const {
    isModalVisible: isDeleteModalVisible,
    selectedItem: memberToDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    setSelectedItem: setMemberToDelete
  } = useModalState<FamilyMemberDTO>()

  const handleAddFamilyMember = (newMember: Omit<FamilyMemberDTO, 'id' | 'userId'>) => {
    addFamilyMember(newMember)
    closeModal()
  }

  const handleUpdateFamilyMember = (updatedMember: FamilyMemberDTO) => {
    updateFamilyMember(updatedMember)
    closeModal()
  }

  const handleOpenModal = () => {
    setEditingMember(null)
    openModal()
  }

  const handleEditMember = (member: FamilyMemberDTO) => {
    setEditingMember(member)
    openModal()
  }

  const handleDeleteMember = (member: FamilyMemberDTO) => {
    setMemberToDelete(member)
    openDeleteModal()
  }

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      deleteFamilyMember(memberToDelete.id!)
      closeDeleteModal()
    }
  }

  if (isLoading) {
    return (
      <Box className="flex-1 bg-ginko-primary justify-center items-center">
        <Text className="text-white text-lg">Loading family members...</Text>
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-ginko-primary justify-center pt-20">
      <Header userName={user.name} />

      <Box className="flex-1 bg-white rounded-2xl gap-4 w-full overflow-hidden">
        <FamilyMembersList
          familyMembers={familyMembers}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />

        <AddButton onPress={handleOpenModal} />
      </Box>

      <AddFamilyMemberModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onAdd={handleAddFamilyMember}
        onUpdate={handleUpdateFamilyMember}
        editingMember={editingMember}
      />

      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        memberToDelete={memberToDelete}
      />
    </Box>
  )
}