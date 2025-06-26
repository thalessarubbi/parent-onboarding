import { Button, ButtonText } from "../ui/button"
import { FormControl, FormControlError, FormControlErrorText } from "../ui/form-control"
import { Box } from "../ui/box"
import { Input } from "../ui/input"
import { InputField } from "../ui/input"
import { Text } from "../ui/text"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { SignUpFormData } from "@/src/screen/SignUpScreen"

interface SignUpThirdStepProps {
  control: Control<SignUpFormData>
  errors: FieldErrors<SignUpFormData>
  onSubmit: () => void
}

export const SignUpThirdStep = ({ control, errors, onSubmit }: SignUpThirdStepProps) => {

  const handleSignUpComplete = () => {
    onSubmit()
  }

  return (
    <Box className="bg-white rounded-2xl p-8 gap-2 w-full">
      <Controller control={control} name="familyGoals" render={({field: {value, onChange}}) => (
      <FormControl isInvalid={!!errors.familyGoals?.message} className="mt-4 min-h-20">
        <Input className="rounded-lg p-4 flex-1">
          <InputField
            type="text"
            placeholder="What are your goals for your family?"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={3}
          />
        </Input>

        <FormControlError>
          <FormControlErrorText>
            <Text className="text-sm text-color-error">{errors.familyGoals?.message}</Text>
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      )} />
      <Controller control={control} name="familyValues" render={({field: {value, onChange}}) => (
      <FormControl isInvalid={!!errors.familyValues?.message} className="mt-4 min-h-20">
        <Input className="rounded-lg p-4 flex-1">
          <InputField
            type="text"
            placeholder="What values are important to your family?"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={3}
          />
        </Input>

        <FormControlError>
          <FormControlErrorText>
            <Text className="text-sm text-color-error">{errors.familyValues?.message}</Text>
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      )} />

      
      <Button className="bg-ginko-accent mt-4 rounded-lg" onPress={handleSignUpComplete}>
        <ButtonText className="text-black">Complete</ButtonText>
      </Button>
    </Box>   
  )
} 