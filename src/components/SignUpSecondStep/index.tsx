import { Button, ButtonText } from "../ui/button"
import { FormControl, FormControlError, FormControlErrorText } from "../ui/form-control"
import { Box } from "../ui/box"
import { Text } from "../ui/text"
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectScrollView,
} from "../ui/select"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { SignUpFormData } from "@/src/screen/SignUpScreen"

interface SignUpSecondStepProps {
  control: Control<SignUpFormData>
  errors: FieldErrors<SignUpFormData>
  onNext: () => void
}

const roles = [
  "Mom",
  "Dad", 
  "Guardian",
  "Grandfather",
  "Grandmother",
  "Step-dad",
  "Step-mom"
]

export const SignUpSecondStep = ({ control, errors, onNext }: SignUpSecondStepProps) => {
  return (
    <Box className="bg-white rounded-2xl p-8 gap-4 w-full">
      <Controller control={control} name="role" render={({field: {value, onChange}}) => (
      <FormControl isInvalid={!!errors.role?.message}>
        <Select selectedValue={value} onValueChange={onChange}>
          <SelectTrigger className="rounded-lg">
            <SelectInput placeholder="Select your role" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectScrollView>
                {roles.map((role) => (
                  <SelectItem key={role} label={role} value={role} />
                ))}
              </SelectScrollView>
            </SelectContent>
          </SelectPortal>
        </Select>

        <FormControlError>
          <FormControlErrorText>
            <Text className="text-sm text-color-error">{errors.role?.message}</Text>
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      )} />
      <Button className="bg-ginko-accent mt-4 rounded-lg" onPress={onNext}>
        <ButtonText className="text-black">Next</ButtonText>
      </Button>
    </Box>   
  )
} 