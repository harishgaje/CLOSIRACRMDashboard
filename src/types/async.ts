/**
 * Async state types for API/async operation handling
 */

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
  lastUpdated?: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
}
