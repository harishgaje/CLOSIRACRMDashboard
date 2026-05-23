/**
 * Input validators for data integrity
 */

export const Validators = {
  /**
   * Validate non-empty string
   */
  isValidString(value: any, minLength = 1): boolean {
    return typeof value === 'string' && value.trim().length >= minLength;
  },

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number (basic - international format)
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate customer name
   */
  isValidCustomerName(name: string): boolean {
    return this.isValidString(name, 2) && name.length <= 100;
  },

  /**
   * Validate lead reason/issue
   */
  isValidReason(reason: string): boolean {
    return this.isValidString(reason, 5) && reason.length <= 500;
  },

  /**
   * Validate priority level
   */
  isValidPriority(priority: any): boolean {
    return ['high', 'medium', 'low'].includes(priority);
  },

  /**
   * Validate channel
   */
  isValidChannel(channel: any): boolean {
    return ['whatsapp', 'email', 'call', 'sms', 'web'].includes(channel);
  },

  /**
   * Validate status
   */
  isValidStatus(status: any): boolean {
    return ['new', 'qualified', 'escalated', 'resolved'].includes(status);
  },
};
