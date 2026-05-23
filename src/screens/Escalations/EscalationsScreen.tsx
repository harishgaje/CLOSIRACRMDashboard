import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { ShieldCheck } from 'lucide-react-native';
import { useCRMStore } from '../../store/crmStore';
import { EscalationCard } from '../../components/cards/EscalationCard';
import { SkeletonCard } from '../../components/common/LoadingStates';
import { ErrorState } from '../../components/common/EmptyStates';
import { logger } from '../../utils/logger';

export const EscalationsScreen = () => {
  const { escalations, fetchEscalations, escalationsState, clearError } = useCRMStore();

  useEffect(() => {
    logger.info('EscalationsScreen mounted, fetching escalations');
    fetchEscalations();
  }, [fetchEscalations]);

  const handleRetry = async () => {
    clearError('escalationsState');
    await fetchEscalations();
  };

  if (escalationsState.error && escalationsState.status !== 'loading') {
    return (
      <SafeAreaView className="flex-1 bg-[#F6F8FB]">
        <ErrorState error={escalationsState.error} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FB]">
      <View className="px-4 pt-2 pb-4 flex-1">
        <View className="mb-4">
          <Text className="text-xs font-black text-red-600 uppercase">Customer Risk Desk</Text>
          <Text className="text-3xl font-black text-slate-950 mt-1">Escalations</Text>
          <Text className="text-sm text-slate-500 mt-1">
            {escalations.length} critical issue{escalations.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <View className="flex-1">
          {escalationsState.status === 'loading' && escalations.length === 0 ? (
            <View>
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : escalations.length === 0 ? (
            <View className="flex-1 justify-center items-center px-6">
              <View className="bg-green-50 p-5 rounded-2xl mb-4 border border-green-100">
                <ShieldCheck size={48} color="#16A34A" />
              </View>
              <Text className="text-xl font-black text-slate-900">No escalations</Text>
              <Text className="text-sm text-slate-500 mt-2 text-center">
                Everything is under control.{"\n"}Great job keeping customers happy.
              </Text>
            </View>
          ) : (
            <FlashList
              data={escalations}
              renderItem={({ item }) => <EscalationCard escalation={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
