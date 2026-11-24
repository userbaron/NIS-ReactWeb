import type { ButtonHTMLAttributes } from 'react'
import styled, { css, keyframes } from 'styled-components'

export type Variant = 'primary' | 'secondary' | 'outline' | 'danger'
export type Size = 'sm' | 'md' | 'lg'

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.primaryHover}; }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.soft};
    color: ${({ theme }) => theme.colors.text};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.softHover}; }
  `,
  outline: css`
    background: ${({ theme }) => theme.colors.transparent};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.soft}; }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.onDanger};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.dangerHover}; }
  `,
}

const sizes = {
  sm: css`min-height: 36px; padding: 6px 12px; font-size: 0.875rem;`,
  md: css`min-height: 42px; padding: 9px 16px; font-size: 1rem;`,
  lg: css`min-height: 48px; padding: 12px 20px; font-size: 1.125rem;`,
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Spinner = styled.span`
  width: 1em;
  height: 1em;
  border: 2px solid ${({ theme }) => theme.colors.transparent};
  border-top-color: ${({ theme }) => theme.colors.current};
  border-left-color: ${({ theme }) => theme.colors.current};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: Variant
  $size?: Size
  $loading?: boolean
}

const ButtonBox = styled.button<Pick<Props, '$variant' | '$size'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.transparent};
  border-radius: ${({ theme }) => theme.radius};
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  ${({ $variant = 'primary' }) => variants[$variant]}
  ${({ $size = 'md' }) => sizes[$size]}

  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

export function Button({ $loading = false, disabled, children, type = 'button', ...props }: Props) {
  return <ButtonBox {...props} type={type} disabled={disabled || $loading} aria-busy={$loading}>
    {$loading && <Spinner aria-hidden="true" />}
    {children}
  </ButtonBox>
}
