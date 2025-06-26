import React, { useEffect } from "react"
import { Box } from "@/src/components/ui/box"
import { Button, ButtonText } from "@/src/components/ui/button"
import { HStack } from "@/src/components/ui/hstack"
import { Input, InputField } from "@/src/components/ui/input"
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/src/components/ui/modal"
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@/src/components/ui/select"
import { Text } from "@/src/components/ui/text"
import { FormControl, FormControlError, FormControlErrorText } from "@/src/components/ui/form-control"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FamilyMemberDTO } from "@/src/types/family"

interface AddFamilyMemberModalProps {
  isVisible: boolean
  onClose: () => void
  onAdd: (member: Omit<FamilyMemberDTO, 'id' | 'userId'>) => void
  onUpdate?: (member: FamilyMemberDTO) => void
  editingMember?: FamilyMemberDTO | null
}

const familyMemberSchema = z.object({
  name: z.string().min(1, { message: 'Please enter the family member name' }),
  age: z.number().min(1, { message: 'Please enter a valid age' }).max(120, { message: 'Age must be between 1 and 120' }),
  relation: z.string().min(1, { message: 'Please select a relation' }),
  genderIdentity: z.string().min(1, { message: 'Please select a gender identity' }),
  guardiansRelationshipQuality: z.number().min(1).max(5),
})

type FamilyMemberFormData = z.infer<typeof familyMemberSchema>

const relationOptions = [
  { label: "Child", value: "Child" },
  { label: "Spouse", value: "Spouse" },
  { label: "Parent", value: "Parent" },
  { label: "Sibling", value: "Sibling" },
  { label: "Other", value: "Other" },
]

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary", value: "Non-binary" },
  { label: "Prefer not to say", value: "Prefer not to say" },
]

const relationshipQualityOptions = [
  { label: "1 - Poor", value: 1 },
  { label: "2 - Fair", value: 2 },
  { label: "3 - Good", value: 3 },
  { label: "4 - Very Good", value: 4 },
  { label: "5 - Excellent", value: 5 },
]

export const AddFamilyMemberModal: React.FC<AddFamilyMemberModalProps> = ({
  isVisible,
  onClose,
  onAdd,
  onUpdate,
  editingMember,
}) => {
  const isEditing = !!editingMember

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FamilyMemberFormData>({
    defaultValues: {
      name: "",
      age: 0,
      relation: "",
      genderIdentity: "",
      guardiansRelationshipQuality: 1,
    },
    resolver: zodResolver(familyMemberSchema),
  })

  // Reset form when editing member changes
  useEffect(() => {
    if (editingMember) {
      reset({
        name: editingMember.name,
        age: editingMember.age,
        relation: editingMember.relation,
        genderIdentity: editingMember.genderIdentity,
        guardiansRelationshipQuality: editingMember.guardiansRelationshipQuality,
      })
    } else {
      reset({
        name: "",
        age: 0,
        relation: "",
        genderIdentity: "",
        guardiansRelationshipQuality: 1,
      })
    }
  }, [editingMember, reset])

  const onSubmit = (data: FamilyMemberFormData) => {
    if (isEditing && editingMember) {
      onUpdate?.({
        ...editingMember,
        ...data,
      })
    } else {
      onAdd(data)
    }
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isVisible} onClose={handleClose} size="md">
      <ModalBackdrop />
      <ModalContent className="bg-white rounded-2xl border-0 shadow-lg">
        <ModalHeader className="p-6 pb-0">
          <Text className="text-2xl font-bold">
            {isEditing ? "Edit Family Member" : "Add Family Member"}
          </Text>
        </ModalHeader>

        <ModalBody className="px-6">
          <Box className="gap-4">
            <Controller 
              control={control} 
              name="name" 
              render={({field: {value, onChange}}) => (
                <FormControl isInvalid={!!errors.name?.message}>
                  <Text className="text-sm font-semibold text-gray-700">Name</Text>
                  <Input variant="outline" size="md">
                    <InputField
                      placeholder="Enter full name"
                      value={value}
                      onChangeText={onChange}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      <Text className="text-sm text-color-error">{errors.name?.message}</Text>
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )} 
            />

            <Controller 
              control={control} 
              name="age" 
              render={({field: {value, onChange}}) => (
                <FormControl isInvalid={!!errors.age?.message}>
                  <Text className="text-sm font-semibold text-gray-700">Age</Text>
                  <Input variant="outline" size="md">
                    <InputField
                      placeholder="Enter age"
                      value={value > 0 ? value.toString() : ""}
                      onChangeText={(text) => {
                        const age = parseInt(text) || 0
                        onChange(age)
                      }}
                      keyboardType="numeric"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      <Text className="text-sm text-color-error">{errors.age?.message}</Text>
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )} 
            />

            <Controller 
              control={control} 
              name="relation" 
              render={({field: {value, onChange}}) => (
                <FormControl isInvalid={!!errors.relation?.message}>
                  <Text className="text-sm font-semibold text-gray-700">Relation</Text>
                  <Select
                    selectedValue={value}
                    onValueChange={onChange}
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {relationOptions.map((option) => (
                          <SelectItem key={option.value} label={option.label} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <FormControlError>
                    <FormControlErrorText>
                      <Text className="text-sm text-color-error">{errors.relation?.message}</Text>
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )} 
            />

            <Controller 
              control={control} 
              name="genderIdentity" 
              render={({field: {value, onChange}}) => (
                <FormControl isInvalid={!!errors.genderIdentity?.message}>
                  <Text className="text-sm font-semibold text-gray-700">Gender Identity</Text>
                  <Select
                    selectedValue={value}
                    onValueChange={onChange}
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Select gender identity" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} label={option.label} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <FormControlError>
                    <FormControlErrorText>
                      <Text className="text-sm text-color-error">{errors.genderIdentity?.message}</Text>
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )} 
            />

            <Controller 
              control={control} 
              name="guardiansRelationshipQuality" 
              render={({field: {value, onChange}}) => (
                <FormControl isInvalid={!!errors.guardiansRelationshipQuality?.message}>
                  <Text className="text-sm font-semibold text-gray-700">Relationship Quality</Text>
                  <Select
                    selectedValue={value.toString()}
                    onValueChange={(val) => onChange(parseInt(val))}
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Select relationship quality" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {relationshipQualityOptions.map((option) => (
                          <SelectItem key={option.value} label={option.label} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <FormControlError>
                    <FormControlErrorText>
                      <Text className="text-sm text-color-error">{errors.guardiansRelationshipQuality?.message}</Text>
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )} 
            />
          </Box>
        </ModalBody>

        <ModalFooter className="p-6 pt-0">
          <HStack className="gap-3 w-full">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onPress={handleClose}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              action="primary"
              size="md"
              className="flex-1 bg-ginko-accent"
              onPress={handleSubmit(onSubmit)}
            >
              <ButtonText>{isEditing ? "Update" : "Add"}</ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 