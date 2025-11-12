import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider, MD3DarkTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

// Pantallas
import DashboardScreen from './src/screens/DashboardScreen';
import SignalDetailScreen from './src/screens/SignalDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#22c55e',
    secondary: '#ef4444',
    background: '#0f172a',
    surface: '#1e293b',
    error: '#ef4444',
  },
};

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#1e293b'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{title: 'Trading Signals'}}
      />
      <Stack.Screen
        name="SignalDetail"
        component={SignalDetailScreen}
        options={{title: 'Detalle de Señal'}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#22c55e',
            tabBarInactiveTintColor: '#64748b',
            tabBarStyle: {
              backgroundColor: '#1e293b',
              borderTopColor: '#334155',
            },
            headerShown: false,
          })}>
          <Tab.Screen
            name="Home"
            component={DashboardStack}
            options={{title: 'Señales'}}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{title: 'Ajustes'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
