import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useCRMStore } from '../../store/crmStore';
import { FollowupCard } from '../../components/cards/FollowupCard';
import { EmptyFollowups, ErrorState } from '../../components/common/EmptyStates';
import { SkeletonCard } from '../../components/common/LoadingStates';
import { logger } from '../../utils/logger';

type TimelineGroup = 'Today' | 'Tomorrow' | 'Upcoming';

const timelineGroups: TimelineGroup[] = ['Today', 'Tomorrow', 'Upcoming'];

export const FollowupsScreen = () => {
  const { followups, fetchFollowups, followupsState, clearError } = useCRMStore();
  const [activeTab, setActiveTab] = useState<TimelineGroup>('Today');

  useEffect(() => {
    logger.info('FollowupsScreen mounted, fetching follow-ups');
    fetchFollowups();
  }, [fetchFollowups]);

  const filteredFollowups = useMemo(
    () => followups.filter((followup) => followup.group === activeTab),
    [followups, activeTab],
  );

  const handleRefresh = async () => {
    logger.info('User initiated follow-ups refresh');
    await fetchFollowups();
  };

  const handleRetry = async () => {
    clearError('followupsState');
    await fetchFollowups();
  };

  const TabButton = ({ label }: { label: TimelineGroup }) => {
    const isActive = activeTab === label;

    return (
      <TouchableOpacity
        onPress={() => setActiveTab(label)}
        className={`flex-1 py-2.5 items-center rounded-xl ${
          isActive ? 'bg-white border border-slate-100' : ''
        }`}
        style={
          isActive
            ? {
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }
            : undefined
        }
      >
        <Text className={`font-black text-sm ${isActive ? 'text-primary' : 'text-slate-500'}`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  if (followupsState.error && followupsState.status !== 'loading') {
    return (
      <SafeAreaView className="flex-1 bg-[#F6F8FB]">
        <ErrorState error={followupsState.error} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FB]">
      <View className="px-4 pt-2 pb-4 flex-1">
        <View className="mb-4">
          <Text className="text-xs font-black text-emerald-600 uppercase">Retention Tasks</Text>
          <Text className="text-3xl font-black text-slate-950 mt-1">Follow-ups</Text>
          <Text className="text-sm text-slate-500 mt-1">Do not leave your customers waiting</Text>
        </View>

        <View className="flex-row gap-2 mb-4 bg-slate-200/60 p-1 rounded-2xl">
          {timelineGroups.map((group) => (
            <TabButton key={group} label={group} />
          ))}
        </View>

        <View className="flex-1">
          {followupsState.status === 'loading' && filteredFollowups.length === 0 ? (
            <View>
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : filteredFollowups.length === 0 ? (
            <EmptyFollowups />
          ) : (
            <FlashList
              data={filteredFollowups}
              renderItem={({ item }) => <FollowupCard followup={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              refreshing={followupsState.status === 'loading'}
              onRefresh={handleRefresh}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
