import { create } from 'zustand';
import { Lead, Escalation, Followup } from '../types';
import { AsyncState, AsyncStatus } from '../types/async';
import { mockLeads, mockEscalations, mockFollowups } from '../mock/data';
import { logger } from '../utils/logger';
import { Validators } from '../utils/validators';

export interface KPIs {
  leadsToday: number;
  missedEnquiries: number;
  openEscalations: number;
  followupsDue: number;
  conversionRate?: number;
  avgResolutionTime?: number;
}

interface CRMState {
  // Data
  leads: Lead[];
  escalations: Escalation[];
  followups: Followup[];
  kpis: KPIs;

  // Async states
  leadsState: AsyncState<Lead[]>;
  escalationsState: AsyncState<Escalation[]>;
  followupsState: AsyncState<Followup[]>;

  // Last refresh timestamp
  lastRefreshTime?: number;

  // Actions
  fetchLeads: () => Promise<void>;
  fetchEscalations: () => Promise<void>;
  fetchFollowups: () => Promise<void>;
  refreshAllData: () => Promise<void>;

  // Mutations
  resolveEscalation: (id: string) => void;
  completeFollowup: (id: string) => void;
  addLead: (lead: Lead) => boolean;

  // Utilities
  calculateKPIs: () => void;
  getFilteredLeads: (status: string) => Lead[];
  getFilteredFollowups: (group: string) => Followup[];
  getOverdueFollowups: () => Followup[];

  // Error & state reset
  clearError: (key: keyof Pick<CRMState, 'leadsState' | 'escalationsState' | 'followupsState'>) => void;
  resetStore: () => void;
}

const initialState = {
  leads: mockLeads,
  escalations: mockEscalations,
  followups: mockFollowups,
  kpis: { leadsToday: 0, missedEnquiries: 0, openEscalations: 0, followupsDue: 0 },
  leadsState: { status: 'idle' as AsyncStatus, data: null, error: null },
  escalationsState: { status: 'idle' as AsyncStatus, data: null, error: null },
  followupsState: { status: 'idle' as AsyncStatus, data: null, error: null },
};

export const useCRMStore = create<CRMState>((set, get) => ({
  ...initialState,

  // Simulate API call with validation
  fetchLeads: async () => {
    set(state => ({
      leadsState: { status: 'loading', data: state.leadsState.data, error: null },
    }));
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Validate mock data
      const validatedLeads = mockLeads.filter(lead =>
        Validators.isValidCustomerName(lead.customer) &&
        Validators.isValidChannel(lead.channel) &&
        Validators.isValidStatus(lead.status)
      );

      set({
        leadsState: { status: 'success', data: validatedLeads, error: null },
        leads: validatedLeads,
        lastRefreshTime: Date.now(),
      });

      logger.info('Leads fetched successfully', { count: validatedLeads.length });
      get().calculateKPIs();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch leads';
      set({
        leadsState: { status: 'error', data: null, error: errorMessage },
      });
      logger.error('Failed to fetch leads', error as Error);
    }
  },

  fetchEscalations: async () => {
    set(state => ({
      escalationsState: { status: 'loading', data: state.escalationsState.data, error: null },
    }));
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const validatedEscalations = mockEscalations.filter(esc =>
        Validators.isValidCustomerName(esc.customer) &&
        Validators.isValidPriority(esc.priority)
      );

      set({
        escalationsState: { status: 'success', data: validatedEscalations, error: null },
        escalations: validatedEscalations,
      });

      logger.info('Escalations fetched successfully', { count: validatedEscalations.length });
      get().calculateKPIs();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch escalations';
      set({
        escalationsState: { status: 'error', data: null, error: errorMessage },
      });
      logger.error('Failed to fetch escalations', error as Error);
    }
  },

  fetchFollowups: async () => {
    set(state => ({
      followupsState: { status: 'loading', data: state.followupsState.data, error: null },
    }));
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const validatedFollowups = mockFollowups.filter(f =>
        Validators.isValidCustomerName(f.customer) &&
        ['pending', 'done'].includes(f.status)
      );

      set({
        followupsState: { status: 'success', data: validatedFollowups, error: null },
        followups: validatedFollowups,
      });

      logger.info('Follow-ups fetched successfully', { count: validatedFollowups.length });
      get().calculateKPIs();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch follow-ups';
      set({
        followupsState: { status: 'error', data: null, error: errorMessage },
      });
      logger.error('Failed to fetch follow-ups', error as Error);
    }
  },

  refreshAllData: async () => {
    logger.info('Starting data refresh');
    await Promise.all([
      get().fetchLeads(),
      get().fetchEscalations(),
      get().fetchFollowups(),
    ]);
    logger.info('Data refresh completed');
  },

  resolveEscalation: (id: string) => {
    if (!Validators.isValidString(id)) {
      logger.warn('Invalid escalation ID', { id });
      return;
    }

    set(state => {
      const escalation = state.escalations.find(e => e.id === id);
      if (!escalation) {
        logger.warn('Escalation not found', { id });
        return state;
      }

      logger.info('Escalation resolved', { id, customer: escalation.customer });
      return {
        escalations: state.escalations.filter(e => e.id !== id),
        kpis: { ...state.kpis, openEscalations: Math.max(0, state.kpis.openEscalations - 1) },
      };
    });
  },

  completeFollowup: (id: string) => {
    if (!Validators.isValidString(id)) {
      logger.warn('Invalid followup ID', { id });
      return;
    }

    set(state => {
      const followup = state.followups.find(f => f.id === id);
      if (!followup) {
        logger.warn('Follow-up not found', { id });
        return state;
      }

      if (followup.status === 'done') {
        logger.warn('Follow-up already completed', { id });
        return state;
      }

      logger.info('Follow-up completed', { id, customer: followup.customer });
      return {
        followups: state.followups.map(f => f.id === id ? { ...f, status: 'done' } : f),
        kpis: { ...state.kpis, followupsDue: Math.max(0, state.kpis.followupsDue - 1) },
      };
    });
  },

  addLead: (lead: Lead): boolean => {
    // Validate lead
    if (!Validators.isValidCustomerName(lead.customer)) {
      logger.warn('Invalid lead customer name', { customer: lead.customer });
      return false;
    }
    if (!Validators.isValidReason(lead.reason)) {
      logger.warn('Invalid lead reason', { reason: lead.reason });
      return false;
    }
    if (!Validators.isValidChannel(lead.channel)) {
      logger.warn('Invalid lead channel', { channel: lead.channel });
      return false;
    }

    set(state => ({
      leads: [lead, ...state.leads],
      kpis: { ...state.kpis, leadsToday: state.kpis.leadsToday + 1 },
    }));

    logger.info('Lead added', { id: lead.id, customer: lead.customer });
    return true;
  },

  calculateKPIs: () => {
    const state = get();
    const today = new Date().toDateString();
    
    const leadsToday = state.leads.filter(l => 
      new Date(l.receivedAt).toDateString() === today
    ).length;

    const missedEnquiries = state.leads.filter(l => l.status === 'new').length;
    const openEscalations = state.escalations.length;
    const followupsDue = state.followups.filter(f => f.status === 'pending' && f.group === 'Today').length;

    // Calculate conversion rate (qualified/total leads)
    const totalLeads = state.leads.length;
    const qualifiedLeads = state.leads.filter(l => l.status === 'qualified').length;
    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;

    set({
      kpis: {
        leadsToday,
        missedEnquiries,
        openEscalations,
        followupsDue,
        conversionRate: Math.round(conversionRate),
        avgResolutionTime: 24, // hours - can be calculated from timestamps
      },
    });

    logger.debug('KPIs calculated', {
      leadsToday,
      missedEnquiries,
      openEscalations,
      followupsDue,
      conversionRate,
    });
  },

  getFilteredLeads: (status: string): Lead[] => {
    return get().leads.filter(l => l.status === status);
  },

  getFilteredFollowups: (group: string): Followup[] => {
    return get().followups.filter(f => f.group === group);
  },

  getOverdueFollowups: (): Followup[] => {
    return get().followups.filter(f => f.isOverdue && f.status === 'pending');
  },

  clearError: (key) => {
    set(state => {
      const newState = { ...state };
      const stateKey = key as keyof CRMState;
      if (stateKey in newState && typeof newState[stateKey] === 'object' && 'error' in (newState[stateKey] as any)) {
        (newState[stateKey] as any).error = null;
      }
      return newState;
    });
  },

  resetStore: () => {
    logger.info('Store reset');
    set(initialState);
  },
}));

// Initialize KPIs on store creation
useCRMStore.getState().calculateKPIs();
