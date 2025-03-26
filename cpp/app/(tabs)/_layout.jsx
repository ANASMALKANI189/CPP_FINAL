import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen name = 'index'
            options={{
              tabBarLabel:'Home',
              tabBarIcon:({color,size})=>(
                <Entypo name="home" size={size} color="blue" />
              )
            }}
            />
        
        <Tabs.Screen name='Profile'
          options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color,size})=>(
              <FontAwesome name="user" size={size} color="blue" />
            )
          }}
          />
        <Tabs.Screen name='Reminder'
          options={{
            tabBarLabel:'Reminder',
            tabBarIcon:({color,size})=>(
              <MaterialIcons name="schedule" size={size} color="blue" />
            )
          }}
        />
        <Tabs.Screen name='Chatbot'
         options={{
           tabBarLabel:'Chatbot',
           tabBarIcon:({color,size})=>(
             <Ionicons name="chatbubbles-sharp" size={size} color="blue" />
      )
    }}
  />

    </Tabs>

    
    
  )
}