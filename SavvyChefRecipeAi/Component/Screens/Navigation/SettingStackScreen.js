import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';



import ProfileScreen from '../User/ProfileScreen';
import EditProfile from '../User/EditProfile';
import ImageUpload from '../UploadImage';
import CameraCapture from '../Camera/CameraCapture';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

// Define a Stack Navigator as a separate component
function SettingStackScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}

    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="editProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="imageUpload" component={ImageUpload} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraCapture} options={{ headerShown: false }} />
      {/* <Stack.Screen name="recipe" component={RecipeSearch} options={{ headerShown: false }} /> */}

    </Stack.Navigator>
  );
}

export default SettingStackScreen;

