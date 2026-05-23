import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, PhoneCall, Send } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { AISummaryCard } from './AISummaryCard';
import { ChatBubble } from '../../components/common/ChatBubble';

const TimelineItem = ({
  time,
  title,
  isLast = false,
}: {
  time: string;
  title: string;
  isLast?: boolean;
}) => (
  <View className="flex-row mb-4">
    <View className="items-center mr-4">
      <View className="w-3 h-3 bg-primary rounded-full" />
      {!isLast && <View className="w-0.5 h-8 bg-slate-200 mt-1" />}
    </View>
    <View>
      <Text className="text-sm font-semibold text-slate-800">{title}</Text>
      <Text className="text-xs text-slate-500 mt-1">{time}</Text>
    </View>
  </View>
);

export const ConversationScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-slate-100">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 -ml-2 rounded-full active:bg-slate-50"
          >
            <ChevronLeft size={24} color="#0066cc" />
          </TouchableOpacity>
          <View className="flex-1 ml-2">
            <Text className="text-lg font-bold text-slate-800">Sarah M.</Text>
            <Text className="text-xs text-slate-500">WhatsApp - Online</Text>
          </View>
          <TouchableOpacity className="p-2 rounded-full active:bg-slate-50">
            <PhoneCall size={20} color="#0066cc" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <AISummaryCard />

          <Text className="text-sm font-bold text-slate-600 mb-4 mt-2">Conversation</Text>
          <ChatBubble message="Hi, I'm unhappy with your pricing!" sender="customer" time="10:30 AM" />
          <ChatBubble message="I understand. Let me help you find a better plan." sender="agent" time="10:32 AM" />
          <ChatBubble message="Can I speak to a manager?" sender="customer" time="10:35 AM" />

          <Text className="text-sm font-bold text-slate-600 mb-4 mt-6">Activity Timeline</Text>
          <TimelineItem time="10:30 AM" title="Issue reported" />
          <TimelineItem time="10:32 AM" title="Agent responded" />
          <TimelineItem time="10:40 AM" title="Escalated to manager" isLast />
        </ScrollView>

        <View className="px-4 py-3 bg-white border-t border-slate-100">
          <View className="flex-row items-center bg-slate-100 px-4 py-3 rounded-2xl">
            <TextInput
              placeholder="Type message..."
              placeholderTextColor="#94a3b8"
              className="flex-1 text-slate-800"
            />
            <TouchableOpacity className="p-2 -mr-2">
              <Send size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
