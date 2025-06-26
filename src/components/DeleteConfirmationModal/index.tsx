import React from "react"
import { Box } from "@/src/components/ui/box"
import { Button, ButtonText } from "@/src/components/ui/button"
import { HStack } from "@/src/components/ui/hstack"
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/src/components/ui/modal"
import { Text } from "@/src/components/ui/text"
import { AlertCircleIcon, Icon } from "@/src/components/ui/icon"

interface FamilyMember {
  id?: number
  name: string
  age: number
  relation: string
  genderIdentity: string
  guardiansRelationshipQuality: number
}

interface DeleteConfirmationModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
  memberToDelete: FamilyMember | null
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  memberToDelete,
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isVisible} onClose={onClose} size="sm">
      <ModalBackdrop />
      <ModalContent className="bg-white rounded-2xl border-0 shadow-lg">
        <ModalHeader className="p-6 pb-0">
          <Box className="items-center gap-3 w-full">
            <Box className="w-12 h-12 bg-red-100 rounded-full items-center justify-center">
              <Icon as={AlertCircleIcon} size="lg" className="color-red-600" />
            </Box>
            <Text className="text-xl font-bold text-center">
              Delete Family Member
            </Text>
          </Box>
        </ModalHeader>

        <ModalBody className="px-6">
          <Box className="gap-4">
            <Text className="text-center text-gray-600">
              Are you sure you want to delete{" "}
              <Text className="font-bold text-gray-800">
                {memberToDelete?.name}
              </Text>
              ?
            </Text>
            <Text className="text-center text-sm text-gray-500">
              This action cannot be undone. All information about this family member will be permanently removed.
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter className="p-6 pt-0">
          <HStack className="gap-3 w-full">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onPress={onClose}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              action="negative"
              size="md"
              className="flex-1 bg-red-600"
              onPress={handleConfirm}
            >
              <ButtonText>Delete</ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 