import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, ScrollViewProps } from 'react-native';

/**
 * Pull-to-refresh wrapper component
 * Provides standard iOS/Android pull-to-refresh UX
 */

interface RefreshableScrollViewProps extends ScrollViewProps {
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
  children: React.ReactNode;
}

export const RefreshableScrollView: React.FC<RefreshableScrollViewProps> = ({
  onRefresh,
  isRefreshing = false,
  children,
  ...props
}) => {
  const [refreshing, setRefreshing] = useState(isRefreshing);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <ScrollView
      {...props}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#0066cc']}
          progressBackgroundColor="#ffffff"
          tintColor="#0066cc"
        />
      }
    >
      {children}
    </ScrollView>
  );
};

/**
 * Refreshable FlatList wrapper would go here
 * (similar pattern to ScrollView)
 */
