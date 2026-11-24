export type ThemeName = 'light' | 'dark'

export interface AppTheme {
  name: ThemeName
  colors: {
    background: string
    surface: string
    soft: string
    softHover: string
    text: string
    muted: string
    border: string
    primary: string
    primaryHover: string
    onPrimary: string
    danger: string
    dangerHover: string
    onDanger: string
    badge: string
    onBadge: string
    focus: string
    transparent: string
    current: string
    shadow: string
  }
  radius: string
}

export const light: AppTheme = {
  name: 'light',
  colors: {
    background: '#f4f6f9',
    surface: '#ffffff',
    soft: '#edf1f7',
    softHover: '#dfe6f0',
    text: '#172033',
    muted: '#59677c',
    border: '#ccd5e2',
    primary: '#2459d3',
    primaryHover: '#1d46a7',
    onPrimary: '#ffffff',
    danger: '#b72332',
    dangerHover: '#941b28',
    onDanger: '#ffffff',
    badge: '#d6f4e4',
    onBadge: '#145638',
    focus: '#2459d3',
    transparent: 'transparent',
    current: 'currentColor',
    shadow: '#17203318',
  },
  radius: '12px',
}

export const dark: AppTheme = {
  ...light,
  name: 'dark',
  colors: {
    background: '#101722',
    surface: '#1b2535',
    soft: '#263349',
    softHover: '#34445d',
    text: '#f1f5fc',
    muted: '#b1bfd2',
    border: '#47566d',
    primary: '#a1bdff',
    primaryHover: '#bfd1ff',
    onPrimary: '#12264f',
    danger: '#ffafba',
    dangerHover: '#ffc8d0',
    onDanger: '#571321',
    badge: '#1d4d39',
    onBadge: '#b5f1d2',
    focus: '#a1bdff',
    transparent: 'transparent',
    current: 'currentColor',
    shadow: '#00000040',
  },
}
