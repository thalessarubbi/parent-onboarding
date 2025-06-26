import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"
import { useAuth } from "../hooks/useAuth"

export function Routes() {
  const { user } = useAuth()

  const theme = DefaultTheme

  return (
    <NavigationContainer theme={theme}>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}