import styled, { createGlobalStyle } from 'styled-components'

export { Button } from './Button'

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  :root { color-scheme: ${({ theme }) => theme.name}; }
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font: 1rem/1.5 system-ui, sans-serif;
    transition: background-color 0.15s, color 0.15s;
  }
  button, input { font: inherit; }
  h1, h2, h3, p { margin: 0; }
  button:focus-visible, input:focus-visible, summary:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`

export const Badge = styled.span<{ $new?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ theme, $new }) => $new ? theme.colors.badge : theme.colors.soft};
  color: ${({ theme, $new }) => $new ? theme.colors.onBadge : theme.colors.text};
`

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: 0 3px 12px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.15s, box-shadow 0.15s;
  &:hover { transform: translateY(-3px); box-shadow: 0 8px 20px ${({ theme }) => theme.colors.shadow}; }
`

export const Input = styled.input.attrs({ autoComplete: 'off' })`
  width: 100%;
  min-width: 0;
  padding: 11px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

export const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;
  @media (min-width: 600px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (min-width: 1200px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`
