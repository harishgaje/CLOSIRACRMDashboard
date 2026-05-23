import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle2, Circle, Clock, MessageSquare } from 'lucide-react-native';
import { Followup } from '../../types';
import { useCRMStore } from '../../store/crmStore';
import { Shadows } from '../../theme/tokens';

export const FollowupCard = ({ followup }: { followup: Followup }) => {
  const { completeFollowup } = useCRMStore();
  const isDone = followup.status === 'done';
  const isOverdue = followup.isOverdue && !isDone;

  return (
    <View
      className={`bg-white rounded-[20px] p-4 mb-3 flex-row items-start border ${
        isOverdue ? 'border-red-100' : 'border-slate-50'
      } ${isDone ? 'opacity-70' : 'opacity-100'}`}
      style={isOverdue ? Shadows.colored('#DC2626') : Shadows.soft}
    >
      <TouchableOpacity
        onPress={() => !isDone && completeFollowup(followup.id)}
        disabled={isDone}
        className="mr-3 mt-0.5"
      >
        {isDone ? (
          <CheckCircle2 size={24} color="#10B981" />
        ) : isOverdue ? (
          <View className="bg-red-50 rounded-full">
            <Circle size={24} color="#EF4444" strokeWidth={2.5} />
          </View>
        ) : (
          <Circle size={24} color="#CBD5E1" strokeWidth={2} />
        )}
      </TouchableOpacity>

      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className={`text-[15px] font-black ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {followup.customer}
          </Text>
          {isOverdue && (
            <View className="bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
              <Text className="text-[10px] font-black uppercase tracking-wider text-red-600">Overdue</Text>
            </View>
          )}
        </View>

        <View className="flex-row items-start mt-1">
          <MessageSquare size={14} color="#3B82F6" className="mt-0.5 mr-1.5" />
          <Text className="text-[13px] text-slate-600 font-medium leading-5 flex-1">{followup.preview}</Text>
        </View>
        
        <View className="flex-row items-center mt-3 bg-slate-50/80 self-start px-2.5 py-1.5 rounded-lg border border-slate-100">
          <Clock size={12} color={isOverdue ? '#EF4444' : '#64748B'} />
          <Text className={`text-[11px] ml-1.5 font-bold ${isOverdue ? 'text-red-600' : 'text-slate-500'}`}>
            {new Date(followup.dueTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    </View>
  );
};
