import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChainsScreen from '../screens/ChainsScreen';
import StatsScreen from '../screens/StatsScreen';
import { AuthContext } from '../contexts/AuthContext';

export type AppDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Chains: undefined;
  Stats: undefined;
};

const Drawer = createDrawerNavigator<AppDrawerParamList>();

function CustomDrawerContent(props: any) {
  const { logout } = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Home" onPress={() => props.navigation.navigate('Home')} />
      <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('Profile')} />
      <DrawerItem label="Cadenas" onPress={() => props.navigation.navigate('Chains')} />
      <DrawerItem label="Estatísticas" onPress={() => props.navigation.navigate('Stats')} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          logout();
          props.navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
      />
    </DrawerContentScrollView>
  );
}
export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Chains" component={ChainsScreen} />
      <Drawer.Screen name="Stats" component={StatsScreen} />
    </Drawer.Navigator>
  );
}

