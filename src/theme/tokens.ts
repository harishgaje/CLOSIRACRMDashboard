/**
 * Design system color tokens for consistency across the app
 * Based on Tailwind semantic color scales
 */

export const Colors = {
  // Neutral scale
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Brand colors
  primary: '#0066cc', // Blue
  secondary: '#0f172a',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',

  // Gradients (for more advanced styling)
  gradient: {
    primary: ['#0066cc', '#0052a3'],
    success: ['#10b981', '#059669'],
    danger: ['#ef4444', '#dc2626'],
  },
};

/**
 * Spacing scale
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

/**
 * Typography scale
 */
export const Typography = {
  heading1: { fontSize: 32, fontWeight: 'bold' },
  heading2: { fontSize: 24, fontWeight: 'bold' },
  heading3: { fontSize: 20, fontWeight: 'bold' },
  body: { fontSize: 16, fontWeight: '400' },
  bodySmall: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
  label: { fontSize: 14, fontWeight: '600' },
};

/**
 * Border radius scale
 */
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 999,
};

/**
 * Shadow definitions
 */
export const Shadows = {
  none: 'none',
  soft: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  medium: {
    shadowColor: '#475569',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  hover: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 10,
  },
  colored: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  })
};
