import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LaunchScreen from './screens/LaunchScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderStatusScreen from './screens/OrderStatusScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Launch"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6d5dfc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Launch" 
          component={LaunchScreen}
          options={{ title: 'Cafe Connect' }}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{ title: 'Menu' }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ title: 'Your Order' }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
          options={{ title: 'Payment' }}
        />
        <Stack.Screen 
          name="OrderStatus" 
          component={OrderStatusScreen}
          options={{ title: 'Order Status' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

