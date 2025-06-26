import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { RubikDirt_400Regular, useFonts } from '@expo-google-fonts/rubik-dirt';
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";

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
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
