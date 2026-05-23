import React, { useEffect, useMemo } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCircle2,
  PhoneMissed,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react-native';
import { useCRMStore } from '../../store/crmStore';
import { StatsCard } from '../../components/cards/StatsCard';
import { RefreshableScrollView } from '../../components/common/RefreshableScrollView';
import { SkeletonGrid } from '../../components/common/LoadingStates';
import { ErrorState } from '../../components/common/EmptyStates';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { logger } from '../../utils/logger';
import { Shadows } from '../../theme/tokens';

export const DashboardScreen = () => {
  const {
    kpis,
    refreshAllData,
    leadsState,
    escalationsState,
    followupsState,
    clearError,
    getOverdueFollowups,
  } = useCRMStore();

  useEffect(() => {
    logger.info('Dashboard mounted, initializing data fetch');
    refreshAllData();
  }, [refreshAllData]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const overdueFollowups = useMemo(() => getOverdueFollowups(), [getOverdueFollowups]);

  const handleRefresh = async () => {
    logger.info('User initiated dashboard refresh');
    await refreshAllData();
  };

  const isLoading =
    leadsState.status === 'loading' ||
    escalationsState.status === 'loading' ||
    followupsState.status === 'loading';

  const hasError = leadsState.error || escalationsState.error || followupsState.error;
  const attentionCount = kpis.openEscalations + kpis.followupsDue + kpis.missedEnquiries;

  const handleRetry = async () => {
    clearError('leadsState');
    clearError('escalationsState');
    clearError('followupsState');
    await refreshAllData();
  };

  if (hasError && !isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#F6F8FB]">
        <ErrorState
          error={leadsState.error || escalationsState.error || followupsState.error || 'Failed to load data'}
          onRetry={handleRetry}
        />
      </SafeAreaView>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaView className="flex-1 bg-[#F6F8FB]">
        <RefreshableScrollView
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-2">
            <View className="flex-row justify-between items-center mb-6 mt-2">
              <View className="flex-1">
                <Text className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Closira Command Center</Text>
                <Text className="text-[32px] font-black text-slate-900 tracking-tight leading-[38px]">{greeting},</Text>
                <Text className="text-[32px] font-black text-slate-900 tracking-tight leading-[38px]">Hari</Text>
              </View>
              <TouchableOpacity
                className="p-3.5 bg-white rounded-[20px] border border-slate-50 relative"
                style={Shadows.soft}
                onPress={() => {
                  Alert.alert(
                    'Notifications',
                    `You have ${kpis.openEscalations} open escalations and ${kpis.followupsDue} follow-ups due today.`
                  );
                }}
              >
                <Bell size={22} color="#475569" strokeWidth={2.5} />
                {kpis.openEscalations > 0 && (
                  <View className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
                )}
              </TouchableOpacity>
            </View>

            <View
              className="bg-[#0f172a] rounded-[32px] p-6 mb-6 overflow-hidden border border-slate-800"
              style={Shadows.colored('#0f172a')}
            >
              <View className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-blue-500 opacity-20 blur-2xl" />
              <View className="absolute right-12 bottom-0 w-24 h-24 rounded-full bg-emerald-400 opacity-10 blur-xl" />
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Today's Pipeline Health</Text>
                  <Text className="text-[48px] font-black text-white mt-1 tracking-tight leading-[56px]">{attentionCount}</Text>
                  <Text className="text-[13px] text-slate-400 mt-1 font-medium leading-5">
                    items need attention across leads, escalations, and follow-ups.
                  </Text>
                </View>
                <View className="bg-white/10 rounded-[20px] p-3.5 border border-white/10 backdrop-blur-md">
                  {attentionCount > 0 ? (
                    <TrendingUp size={28} color="#93C5FD" strokeWidth={2.5} />
                  ) : (
                    <CheckCircle2 size={28} color="#6EE7B7" strokeWidth={2.5} />
                  )}
                </View>
              </View>
              <View className="flex-row mt-6 gap-3">
                <View className="flex-1 bg-white/5 rounded-[16px] p-3 border border-white/5 backdrop-blur-sm">
                  <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Open Esc.</Text>
                  <Text className="text-xl text-white font-black mt-0.5">{kpis.openEscalations}</Text>
                </View>
                <View className="flex-1 bg-white/5 rounded-[16px] p-3 border border-white/5 backdrop-blur-sm">
                  <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Due Today</Text>
                  <Text className="text-xl text-white font-black mt-0.5">{kpis.followupsDue}</Text>
                </View>
                <View className="flex-1 bg-white/5 rounded-[16px] p-3 border border-white/5 backdrop-blur-sm">
                  <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conversion</Text>
                  <Text className="text-xl text-white font-black mt-0.5">{kpis.conversionRate ?? 0}%</Text>
                </View>
              </View>
            </View>

            {overdueFollowups.length > 0 && (
              <View className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4">
                <Text className="text-sm text-red-700 font-bold">
                  {overdueFollowups.length} overdue follow-up(s) require immediate action.
                </Text>
              </View>
            )}

            {isLoading && <SkeletonGrid />}

            {!isLoading && (
              <View className="flex-row flex-wrap justify-between">
                <StatsCard title="Leads Today" value={kpis.leadsToday} Icon={Users} colorClass="bg-blue-100" trend={kpis.leadsToday > 0 ? `+${kpis.leadsToday}` : '0'} />
                <StatsCard title="Missed Enquiries" value={kpis.missedEnquiries} Icon={PhoneMissed} colorClass="bg-amber-100" trend={kpis.missedEnquiries > 0 ? `${kpis.missedEnquiries}` : '0'} />
                <StatsCard title="Open Escalations" value={kpis.openEscalations} Icon={AlertTriangle} colorClass="bg-red-100" trend={kpis.openEscalations > 0 ? `${kpis.openEscalations}` : '0'} />
                <StatsCard title="Follow-ups Due" value={kpis.followupsDue} Icon={CalendarClock} colorClass="bg-green-100" trend={kpis.followupsDue > 0 ? `${kpis.followupsDue}` : '0'} />
              </View>
            )}

            {!isLoading && kpis.conversionRate !== undefined && (
              <View className="mt-2 gap-3 flex-row">
                <View className="bg-white rounded-[20px] px-5 py-4 flex-1 border border-slate-50" style={Shadows.soft}>
                  <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conversion Rate</Text>
                  <Text className="text-[28px] font-black text-slate-900 mt-1 tracking-tight">{kpis.conversionRate}%</Text>
                </View>
                <View className="bg-white rounded-[20px] px-5 py-4 flex-1 border border-slate-50" style={Shadows.soft}>
                  <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Resolution</Text>
                  <Text className="text-[28px] font-black text-slate-900 mt-1 tracking-tight">{kpis.avgResolutionTime}h</Text>
                </View>
              </View>
            )}

            <Text className="text-[18px] font-black text-slate-900 mt-8 mb-4">Quick Actions</Text>
            <View className="flex-row gap-3 mb-8">
              <TouchableOpacity 
                className="bg-blue-600 flex-row items-center justify-center px-4 py-3.5 rounded-[16px] flex-1"
                style={Shadows.colored('#2563EB')}
              >
                <Plus size={20} color="#fff" strokeWidth={2.5} />
                <Text className="text-white font-bold ml-2 text-[15px]">Add Lead</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-white border border-slate-100 flex-row items-center justify-center px-4 py-3.5 rounded-[16px] flex-1"
                style={Shadows.soft}
              >
                <AlertTriangle size={20} color="#475569" strokeWidth={2.5} />
                <Text className="text-slate-700 font-bold ml-2 text-[15px]">Resolve</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-[18px] font-black text-slate-900 mb-4">Recent Activity</Text>
            <View className="bg-white rounded-[24px] p-5 border border-slate-50 mb-8" style={Shadows.soft}>
              <View className="flex-row items-start mb-5 relative">
                <View className="absolute left-1 top-5 bottom-[-20px] w-0.5 bg-slate-100" />
                <View className="w-2.5 h-2.5 bg-red-500 rounded-full mt-1.5 mr-4 border-2 border-white shadow-sm z-10" />
                <View className="flex-1">
                  <Text className="text-[14px] text-slate-900 font-bold">Sarah escalated a pricing issue</Text>
                  <Text className="text-slate-400 text-[11px] mt-1 font-semibold">2 mins ago</Text>
                </View>
              </View>
              <View className="flex-row items-start relative">
                <View className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1.5 mr-4 border-2 border-white shadow-sm z-10" />
                <View className="flex-1">
                  <Text className="text-[14px] text-slate-900 font-bold">Rahul completed follow-up</Text>
                  <Text className="text-slate-400 text-[11px] mt-1 font-semibold">10 mins ago</Text>
                </View>
              </View>
            </View>
          </View>
        </RefreshableScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
};
