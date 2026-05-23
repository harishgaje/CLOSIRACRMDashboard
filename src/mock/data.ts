import { Lead, Escalation, Followup } from '../types';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const mockLeads: Lead[] = [
  { id: 'enq_001', customer: 'Sarah M.', channel: 'whatsapp', status: 'escalated', reason: 'Pricing complaint', receivedAt: today.toISOString(), summary: 'Customer unhappy with quote, requested manager.' },
  { id: 'enq_002', customer: 'Rahul K.', channel: 'call', status: 'new', reason: 'Demo Request', receivedAt: today.toISOString(), summary: 'Wants a product demo for his 10-person team.' },
  { id: 'enq_003', customer: 'Emma W.', channel: 'email', status: 'qualified', reason: 'Enterprise Plan', receivedAt: yesterday.toISOString(), summary: 'Ready to move forward with the Enterprise tier.' },
  { id: 'enq_004', customer: 'Raj D.', channel: 'whatsapp', status: 'new', reason: 'Integration Query', receivedAt: today.toISOString(), summary: 'Asking if we integrate with Salesforce.' },
  { id: 'enq_005', customer: 'Priya S.', channel: 'call', status: 'qualified', reason: 'Contract Renewal', receivedAt: yesterday.toISOString(), summary: 'Wants to renew contract for another year.' }
];

export const mockEscalations: Escalation[] = [
  { id: 'esc_001', customer: 'Sarah M.', priority: 'high', assignedTo: 'Manager', slaRemaining: '2h 14m', issue: 'Pricing escalation SOP Matched' },
  { id: 'esc_002', customer: 'John Doe', priority: 'medium', assignedTo: 'Support L2', slaRemaining: '4h 30m', issue: 'App crashing on login for 2 days.' }
];

export const mockFollowups: Followup[] = [
  { id: 'fup_001', customer: 'Rahul K.', dueTime: today.toISOString(), preview: 'Requested callback regarding pricing', status: 'pending', isOverdue: true, group: 'Today' },
  { id: 'fup_002', customer: 'Amit P.', dueTime: today.toISOString(), preview: 'Send the updated contract', status: 'pending', group: 'Today' },
  { id: 'fup_003', customer: 'Priya S.', dueTime: tomorrow.toISOString(), preview: 'Check in on onboarding progress', status: 'pending', group: 'Tomorrow' }
];