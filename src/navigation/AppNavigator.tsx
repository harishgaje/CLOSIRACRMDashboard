import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Users, AlertTriangle, CalendarCheck } from 'lucide-react-native';

// Import Screens
import { DashboardScreen } from '../screens/Dashboard/DashboardScreen';
import { LeadsScreen } from '../screens/Leads/LeadsScreen';
import { EscalationsScreen } from '../screens/Escalations/EscalationsScreen';
import { FollowupsScreen } from '../screens/Followups/FollowupsScreen';
import { ConversationScreen } from '../screens/Conversation/ConversationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// The Tab Navigator (Bottom Bar)
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          borderTopColor: '#e2e8f0',
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Escalations"
        component={EscalationsScreen}
        options={{
          tabBarIcon: ({ color }) => <AlertTriangle size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Followups"
        component={FollowupsScreen}
        options={{
          tabBarIcon: ({ color }) => <CalendarCheck size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// The Root Stack Navigator
export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};
