import React from 'react';
import { View, Text } from 'react-native';
import { Sparkles, AlertTriangle } from 'lucide-react-native';

export const AISummaryCard = () => {
  return (
    <View
      className="bg-white rounded-2xl p-4 mb-4 border border-blue-100 overflow-hidden"
      style={{
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.12,
        shadowRadius: 22,
        elevation: 5,
      }}
    >
      <View className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-blue-100" />
      <View className="flex-row items-center mb-3">
        <View className="bg-blue-50 p-2 rounded-xl border border-blue-100">
          <Sparkles size={20} color="#0066cc" />
        </View>
        <View className="ml-2">
          <Text className="text-lg font-black text-slate-900">AI Analysis</Text>
          <Text className="text-xs text-slate-500 font-semibold">Conversation intelligence</Text>
        </View>
      </View>

      <Text className="text-sm text-slate-600 mb-4 leading-5">
        Customer is unhappy with recent pricing. Requested manager callback. Threatening to cancel subscription.
      </Text>

      <View className="flex-row items-center bg-red-50 px-3 py-2 rounded-lg mb-3">
        <AlertTriangle size={16} color="#ef4444" />
        <Text className="text-sm font-bold text-red-700 ml-2">High Churn Risk</Text>
      </View>

      <View className="flex-row items-center bg-blue-50 px-3 py-2 rounded-lg">
        <Text className="text-xs font-bold text-blue-700">Pricing Escalation SOP Matched</Text>
      </View>
    </View>
  );
};
