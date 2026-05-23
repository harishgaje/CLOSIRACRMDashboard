export type Priority = 'high' | 'medium' | 'low';
export type LeadStatus = 'new' | 'qualified' | 'escalated';
export type Channel = 'whatsapp' | 'email' | 'call';

export interface Lead {
  id: string;
  customer: string;
  channel: Channel;
  status: LeadStatus;
  reason: string;
  receivedAt: string;
  summary: string;
}

export interface Escalation {
  id: string;
  customer: string;
  priority: Priority;
  assignedTo: string;
  slaRemaining: string;
  issue: string;
}
export interface Followup {
  id: string;
  customer: string;
  dueTime: string;
  preview: string;
  status: 'pending' | 'done';
  isOverdue?: boolean;
  group: 'Today' | 'Tomorrow' | 'Upcoming';
}