import { Box } from "../../components/ui/box"
import { Text } from "../../components/ui/text"
import { Button } from "../../components/ui/button"

export const WelcomeScreen = () => {
  return (
    <Box className='flex-1 items-center justify-center bg-ginko-primary px-10 gap-4'>
      <Text className='text-h1 font-heading text-center color-white'>Welcome to Ginko!</Text>
      <Text className='text-h4 font-body text-center color-black'>Ready to make your family's life safer?</Text>

      <Button className='bg-ginko-accent mt-16'>
        <Text className='text-h4 font-body text-center color-black'>Get Started</Text>
      </Button>
    </Box>
  )
}