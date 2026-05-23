/**
 * Data formatting utilities for display
 */

export const Formatters = {
  /**
   * Format time remaining (e.g., "2h 14m")
   */
  formatTimeRemaining(minutes: number): string {
    if (minutes < 0) return 'Overdue';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  },

  /**
   * Format timestamp to readable time
   */
  formatTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  },

  /**
   * Format date relative to today (Today, Tomorrow, Date)
   */
  formatDateRelative(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (
      d.toDateString() === today.toDateString()
    ) {
      return 'Today';
    }
    if (d.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }

    return d.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
  },

  /**
   * Truncate text to word boundary
   */
  truncateText(text: string, maxLength: number = 80): string {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  },

  /**
   * Format large numbers (e.g., 1200 -> "1.2K")
   */
  formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  },

  /**
   * Get initials from name
   */
  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  /**
   * Format channel for display
   */
  formatChannel(channel: string): string {
    const channels: Record<string, string> = {
      whatsapp: 'WhatsApp',
      email: 'Email',
      call: 'Call',
      sms: 'SMS',
      web: 'Web',
    };
    return channels[channel] || channel;
  },

  /**
   * Format priority for display
   */
  formatPriority(priority: string): string {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  },
};
