import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { Box } from './src/components/ui/box';
import { Text } from './src/components/ui/text';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { RubikDirt_400Regular, useFonts } from '@expo-google-fonts/rubik-dirt';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    RubikDirt_400Regular
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <GluestackUIProvider mode="light">
      <Box className='flex-1 items-center justify-center bg-ginko-primary px-16'>
        <Text className='text-h1 font-heading text-center color-black fill-black'>Welcome to Ginko!</Text>
        <StatusBar style="auto" />
      </Box>
    </GluestackUIProvider>
  );
}
