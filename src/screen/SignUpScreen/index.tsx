import { Box } from "@/src/components/ui/box"
import { GinkoLogo } from "@/src/components/GinkoLogo"
import { SignUpFirstStep } from "@/src/components/SignUpFirstStep"
import { SignUpSecondStep } from "@/src/components/SignUpSecondStep"
import { SignUpThirdStep } from "@/src/components/SignUpThirdStep"
import PagerView from "react-native-pager-view"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useRef } from "react"
import { useAuth } from "@/src/hooks/useAuth"

const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name' }),
  email: z.string().min(1, { message: 'Please enter your email' }).regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, { message: 'Invalid email' }),
  phone: z.string().min(1, { message: 'Please enter your phone number' }),
  role: z.enum([
    "Mom",
    "Dad",
    "Guardian",
    "Grandfather",
    "Grandmother",
    "Step-dad",
    "Step-mom"
  ], { message: 'Please select your role' }),
  familyGoals: z.string().min(1, { message: 'Please enter your family goals' }),
  familyValues: z.string().min(1, { message: 'Please enter your family values' }),
})

export type SignUpFormData = z.infer<typeof signUpSchema>

export const SignUpScreen = () => {
  const pagerRef = useRef<PagerView>(null)
  const { signUp } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: undefined,
      familyGoals: '',
      familyValues: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpFormData) => {
    signUp({
      id: new Date().getTime().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      familyGoals: data.familyGoals,
      familyValues: data.familyValues,
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Box className="flex-1 bg-ginko-primary justify-center">
          <Box className="items-center justify-center">
            <GinkoLogo width={300} height={400} />
          </Box>

          <PagerView style={{ flex: 0.7 }} ref={pagerRef} initialPage={0} >
            <Box className="flex-1 items-center justify-center bg-ginko-primary px-10 gap-16" key="1">
              <SignUpFirstStep control={control} errors={errors} onNext={() => pagerRef.current?.setPage(1)} />
            </Box>

            <Box className="flex-1 items-center justify-center bg-ginko-primary px-10 gap-16" key="2">
              <SignUpSecondStep control={control} errors={errors} onNext={() => pagerRef.current?.setPage(2)} />
            </Box>

            <Box className="flex-1 items-center justify-center bg-ginko-primary px-10 gap-16" key="3">
              <SignUpThirdStep control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />
            </Box>
          </PagerView>
        </Box>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
