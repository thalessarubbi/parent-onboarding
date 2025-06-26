import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FamilyManagementScreen } from "../screen/FamilyManagementScreen"

type AppRoutes = {
  FamilyManagementScreen: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="FamilyManagementScreen" component={FamilyManagementScreen} />
    </Navigator>
  )
}