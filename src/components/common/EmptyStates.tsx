import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AlertCircle, CheckCircle2, Inbox, LucideIcon, MessageSquare } from 'lucide-react-native';

interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: 'neutral' | 'success' | 'danger';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  Icon,
  title,
  message,
  actionLabel,
  onAction,
  tone = 'neutral',
}) => {
  const toneStyles = {
    neutral: { bg: '#eff6ff', border: '#dbeafe', icon: '#2563eb' },
    success: { bg: '#ecfdf5', border: '#d1fae5', icon: '#16a34a' },
    danger: { bg: '#fef2f2', border: '#fee2e2', icon: '#dc2626' },
  }[tone];

  return (
    <ScrollView className="flex-1 bg-[#F6F8FB]">
      <View className="flex-1 justify-center items-center px-6 py-12">
        <View
          className="bg-white rounded-2xl p-8 w-full items-center border border-slate-100"
          style={{
            shadowColor: '#0f172a',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 5,
          }}
        >
          <View
            className="p-4 rounded-2xl mb-4 border"
            style={{ backgroundColor: toneStyles.bg, borderColor: toneStyles.border }}
          >
            <Icon size={36} color={toneStyles.icon} />
          </View>
          <Text className="text-xl font-black text-slate-900 mb-2 text-center">{title}</Text>
          <Text className="text-sm text-slate-500 text-center mb-6 leading-5">{message}</Text>

          {actionLabel && onAction && (
            <TouchableOpacity
              onPress={onAction}
              className="bg-primary px-6 py-3 rounded-2xl"
            >
              <Text className="text-white font-bold">{actionLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export const EmptyLeads: React.FC<{ onAction?: () => void }> = ({ onAction }) => (
  <EmptyState
    Icon={Inbox}
    title="No Leads Yet"
    message="All inbound requests are clear. New leads will appear here as soon as customers reach out."
    actionLabel={onAction ? 'Add Lead' : undefined}
    onAction={onAction}
  />
);

export const EmptyEscalations: React.FC = () => (
  <EmptyState
    Icon={CheckCircle2}
    title="All Caught Up"
    message="No escalations are pending. Your customer risk queue is under control."
    tone="success"
  />
);

export const EmptyFollowups: React.FC = () => (
  <EmptyState
    Icon={CheckCircle2}
    title="No Follow-ups"
    message="You are all set. No follow-ups are due in this time window."
    tone="success"
  />
);

export const EmptyConversations: React.FC = () => (
  <EmptyState
    Icon={MessageSquare}
    title="No Conversations"
    message="Select a lead or conversation to view chat history and AI insights."
  />
);

export const ErrorState: React.FC<{ error: string; onRetry?: () => void }> = ({
  error,
  onRetry,
}) => (
  <EmptyState
    Icon={AlertCircle}
    title="Something Went Wrong"
    message={error}
    actionLabel={onRetry ? 'Try Again' : undefined}
    onAction={onRetry}
    tone="danger"
  />
);
