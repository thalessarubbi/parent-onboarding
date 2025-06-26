import React from "react"
import { TouchableOpacity } from "react-native"
import { Avatar } from "@/src/components/ui/avatar"
import { Box } from "@/src/components/ui/box"
import { Card } from "@/src/components/ui/card"
import { HStack } from "@/src/components/ui/hstack"
import { CloseIcon, Icon } from "@/src/components/ui/icon"
import { Text } from "@/src/components/ui/text"
import { Button, ButtonText } from "@/src/components/ui/button"
import { GinkoLogo } from "@/src/components/GinkoLogo"
import { FamilyMemberDTO } from "@/src/types/family"

interface FamilyMemberCardProps {
  item: FamilyMemberDTO
  onEdit: (member: FamilyMemberDTO) => void
  onDelete: (member: FamilyMemberDTO) => void
}

const getGuardiansQualityString = (quality: number): string => {
  switch (quality) {
    case 1:
      return "Poor"
    case 2:
      return "Fair"
    case 3:
      return "Good"
    case 4:
      return "Very Good"
    case 5:
      return "Excellent"
    default:
      return "Unknown"
  }
}

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  return (
    <Box className="p-4">
      <TouchableOpacity onPress={() => onEdit(item)}>
        <Card className="flex-1 shadow-sm rounded-2xl gap-2 w-full min-h-40" variant="elevated">
          <Button className="absolute top-0 right-0 w-16 h-16" variant="link" onPress={() => onDelete(item)}>
            <ButtonText>
              <Icon as={CloseIcon} size="lg" className="color-black" />
            </ButtonText>
          </Button>

          <HStack className="gap-4 p-4">
            <Avatar className="w-16 h-16 bg-ginko-primary">
              <GinkoLogo />
            </Avatar>

            <Box className="flex-1">
              <Text className="text-lg font-bold w-full text-center">{item.name}</Text>

              <HStack className="gap-4 flex-1 flex-wrap justify-between mt-4">
                <Box className="gap-2">
                  <Text className="text-sm text-gray-500">Age: </Text>
                  <Text className="font-bold">{item.age}</Text>

                  <Text className="text-sm text-gray-500">Gender: </Text>
                  <Text className="font-bold">{item.genderIdentity}</Text>
                </Box>

                <Box className="gap-2">
                  <Text className="text-sm text-gray-500">Relation: </Text>
                  <Text className="font-bold">{item.relation}</Text>

                  <Text className="text-sm text-gray-500">Relationship Quality: </Text>
                  <Text className="font-bold">{getGuardiansQualityString(item.guardiansRelationshipQuality)}</Text>
                </Box>
              </HStack>
            </Box>
          </HStack>
        </Card>
      </TouchableOpacity>
    </Box>
  )
} 