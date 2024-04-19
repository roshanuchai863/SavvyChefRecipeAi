import { createNativeStackNavigator } from '@react-navigation/native-stack';



import ImageUpload from '../UploadImage';
import CameraCapture from '../Camera/CameraCapture';
import TabNavigator from './TabNavigator';
import PaymentScreen from '../../../PaymentGateway/PaymentScreen';

const Stack = createNativeStackNavigator();

// Define a Stack Navigator as a separate component
function SettingStackScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    // initialRouteName='RecipeDetails'
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="imageUpload" component={ImageUpload} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraCapture}  />
     

    </Stack.Navigator>
  );
}

export default SettingStackScreen;

