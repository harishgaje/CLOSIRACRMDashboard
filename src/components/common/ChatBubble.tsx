import React from 'react';
import { View, Text } from 'react-native';

interface ChatBubbleProps {
  message: string;
  sender: 'customer' | 'agent';
  time: string;
}

export const ChatBubble = ({ message, sender, time }: ChatBubbleProps) => {
  const isAgent = sender === 'agent';
  
  return (
    <View className={`flex-row mb-3 ${isAgent ? 'justify-start' : 'justify-end'}`}>
      <View
        className={`max-w-xs px-4 py-3 rounded-2xl ${
          isAgent
            ? 'bg-white border border-slate-100 rounded-tl-none'
            : 'bg-primary rounded-tr-none'
        }`}
        style={
          isAgent
            ? {
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 2,
              }
            : undefined
        }
      >
        <Text className={`text-sm leading-5 ${isAgent ? 'text-slate-800' : 'text-white'}`}>
          {message}
        </Text>
        <Text className={`text-xs mt-1 ${isAgent ? 'text-slate-400' : 'text-blue-200'}`}>
          {time}
        </Text>
      </View>
    </View>
  );
};
