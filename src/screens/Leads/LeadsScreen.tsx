import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useCRMStore } from '../../store/crmStore';
import { LeadCard } from '../../components/cards/LeadCard';
import { LeadStatus } from '../../types';
import { SkeletonCard } from '../../components/common/LoadingStates';
import { EmptyLeads, ErrorState } from '../../components/common/EmptyStates';
import { logger } from '../../utils/logger';

export const LeadsScreen = () => {
  const { leads, fetchLeads, leadsState, clearError } = useCRMStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<LeadStatus | 'all'>('all');

  // Fetch leads on mount
  useEffect(() => {
    logger.info('LeadsScreen mounted, fetching leads');
    fetchLeads();
  }, []);

  // Filter and Search Logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesFilter = activeFilter === 'all' || lead.status === activeFilter;
      const matchesSearch = lead.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lead.reason.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [leads, searchQuery, activeFilter]);

  const handleRefresh = async () => {
    logger.info('User initiated leads refresh');
    await fetchLeads();
  };

  const handleRetry = async () => {
    clearError('leadsState');
    await fetchLeads();
  };

  const FilterButton = ({ label, value }: { label: string, value: LeadStatus | 'all' }) => {
    const isActive = activeFilter === value;
    return (
      <TouchableOpacity 
        onPress={() => setActiveFilter(value)}
        className={`px-4 py-2 rounded-full mr-2 border ${
          isActive ? 'bg-primary border-primary' : 'bg-white border-slate-200'
        }`}
      >
        <Text className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-600'}`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  // Show error state
  if (leadsState.error && leadsState.status !== 'loading') {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <ErrorState error={leadsState.error} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FB]">
      <View className="px-4 pt-2 pb-4 flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-xs font-black text-blue-600 uppercase">Revenue Inbox</Text>
            <Text className="text-3xl font-black text-slate-950 mt-1">Leads</Text>
            <Text className="text-sm text-slate-500 mt-1">
              {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity className="p-3 bg-white rounded-2xl border border-slate-100">
            <SlidersHorizontal size={20} color="#475569" />
          </TouchableOpacity>
        </View>

        <View
          className="bg-white flex-row items-center px-4 py-3 rounded-2xl border border-slate-100 mb-4"
          style={{
            shadowColor: '#0f172a',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.06,
            shadowRadius: 16,
            elevation: 3,
          }}
        >
          <Search size={20} color="#94A3B8" />
          <TextInput 
            placeholder="Search name or issue..."
            placeholderTextColor="#94A3B8"
            className="flex-1 ml-3 text-slate-800 font-medium"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View className="flex-row mb-4">
          <FilterButton label="All" value="all" />
          <FilterButton label="New" value="new" />
          <FilterButton label="Qualified" value="qualified" />
          <FilterButton label="Escalated" value="escalated" />
        </View>

        <View className="flex-1">
          {leadsState.status === 'loading' && filteredLeads.length === 0 ? (
            // Show skeleton while loading initial data
            <View>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : filteredLeads.length === 0 ? (
            // Show empty state
            <EmptyLeads />
          ) : (
            // Show list with refresh control
            <FlashList 
              data={filteredLeads}
              renderItem={({ item }) => <LeadCard lead={item} />}
              showsVerticalScrollIndicator={false}
              refreshing={leadsState.status === 'loading'}
              onRefresh={handleRefresh}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
