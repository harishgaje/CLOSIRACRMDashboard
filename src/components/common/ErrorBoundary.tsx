import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error, retry: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  retry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.retry)
      ) : (
        <DefaultErrorFallback error={this.state.error} retry={this.retry} />
      );
    }

    return this.props.children;
  }
}

export const DefaultErrorFallback: React.FC<{ error: Error; retry: () => void }> = ({
  error,
  retry,
}) => (
  <ScrollView className="flex-1 bg-slate-50">
    <View className="flex-1 justify-center items-center px-4 py-8">
      <View className="bg-red-100 rounded-2xl p-6 w-full items-center">
        <Text className="text-4xl font-black text-red-700 mb-4">!</Text>
        <Text className="text-lg font-bold text-red-800 mb-2">Error Occurred</Text>
        <Text className="text-sm text-red-600 text-center mb-6">{error.message}</Text>
        <TouchableOpacity
          onPress={retry}
          className="bg-red-600 px-5 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);
