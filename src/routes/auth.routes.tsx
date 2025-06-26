import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { WelcomeScreen } from "../screen/WelcomeScreen"
import { SignUpScreen } from "../screen/SignUpScreen"

type AuthRoutes = {
  WelcomeScreen: undefined
  SignUpScreen: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Screen name="SignUpScreen" component={SignUpScreen} />
    </Navigator>
  )
}