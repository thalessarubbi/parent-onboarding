import { Button, ButtonText } from "../ui/button"
import { FormControl, FormControlError, FormControlErrorText } from "../ui/form-control"
import { Box } from "../ui/box"
import { Input } from "../ui/input"
import { InputField } from "../ui/input"
import { Text } from "../ui/text"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { SignUpFormData } from "@/src/screen/SignUpScreen"

interface SignUpFirstStepProps {
  control: Control<SignUpFormData>
  errors: FieldErrors<SignUpFormData>
  onNext: () => void
}

export const SignUpFirstStep = ({ control, errors, onNext }: SignUpFirstStepProps) => {
  return (
    <Box className="bg-white rounded-2xl p-8 gap-4 w-full">
      <Controller control={control} name="name" render={({field: {value, onChange}}) => (
        <FormControl isInvalid={!!errors.name?.message} >
          <Input className="rounded-lg">
            <InputField
              type="text"
              placeholder="Enter your name"
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
      )} />
      <Controller control={control} name="email" render={({field: {value, onChange}}) => (
        <FormControl isInvalid={!!errors.email?.message} >
          <Input className="rounded-lg">
            <InputField
              type="text"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
            />
          </Input>

          <FormControlError>
            <FormControlErrorText>
              <Text className="text-sm text-color-error">{errors.email?.message}</Text>
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      )} />
      <Controller control={control} name="phone" render={({field: {value, onChange}}) => (
        <FormControl isInvalid={!!errors.phone?.message} >
          <Input className="rounded-lg">
            <InputField
              type="text"
              placeholder="Enter your phone number"
              value={value}
              onChangeText={onChange}
            />
          </Input>

          <FormControlError>
            <FormControlErrorText>
              <Text className="text-sm text-color-error">{errors.phone?.message}</Text>
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