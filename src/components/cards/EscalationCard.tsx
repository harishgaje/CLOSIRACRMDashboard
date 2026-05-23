import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Clock, User, AlertCircle, CheckCircle } from 'lucide-react-native';
import { Escalation } from '../../types';
import { useCRMStore } from '../../store/crmStore';
import { Shadows } from '../../theme/tokens';

export const EscalationCard = ({ escalation }: { escalation: Escalation }) => {
  const resolveEscalation = useCRMStore((state) => state.resolveEscalation);

  const priorityStyles = {
    high: { bg: 'bg-red-50/80', text: 'text-red-700', border: 'border-red-100', icon: '#DC2626' },
    medium: { bg: 'bg-orange-50/80', text: 'text-orange-700', border: 'border-orange-100', icon: '#EA580C' },
    low: { bg: 'bg-blue-50/80', text: 'text-blue-700', border: 'border-blue-100', icon: '#3B82F6' },
  };

  const style = priorityStyles[escalation.priority];

  return (
    <View
      className={`bg-white p-4 rounded-[20px] border ${style.border} mb-3 overflow-hidden`}
      style={Shadows.colored(style.icon)}
    >
      <View className={`${style.bg} absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-60`} />
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center flex-1 pr-2">
          <View className={`${style.bg} p-2.5 rounded-xl mr-3`}>
            <AlertCircle size={20} color={style.icon} strokeWidth={2.5} />
          </View>
          <View>
            <Text className="text-[15px] font-black text-slate-900 tracking-tight">{escalation.customer}</Text>
            <Text className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${style.text}`}>
              {escalation.priority} Priority
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => resolveEscalation(escalation.id)}
          className="bg-white p-2 rounded-full border border-slate-100 shadow-sm"
          style={{ shadowColor: '#0f172a', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
        >
          <CheckCircle size={20} color="#10B981" />
        </TouchableOpacity>
      </View>

      <View className="bg-white/60 rounded-xl p-3 mb-4 border border-slate-50 backdrop-blur-md">
        <Text className="text-[13px] font-semibold text-slate-700 leading-5">{escalation.issue}</Text>
      </View>

      <View className="flex-row justify-between items-center bg-slate-50/80 p-3 rounded-xl border border-slate-100">
        <View className="flex-row items-center">
          <User size={14} color="#64748B" />
          <Text className="text-[11px] text-slate-600 font-bold ml-1.5">{escalation.assignedTo}</Text>
        </View>
        <View className="flex-row items-center bg-red-50 px-2 py-1 rounded-md border border-red-100/50">
          <Clock size={12} color="#DC2626" />
          <Text className="text-[11px] text-red-600 font-black ml-1.5">{escalation.slaRemaining}</Text>
        </View>
      </View>
    </View>
  );
};
