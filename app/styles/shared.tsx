'use client'

import styled from 'styled-components'
import { theme } from './theme'

export const Card = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.border};
  transition: transform ${theme.transitions.normal}, box-shadow ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
`

export const GradientButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  background: ${theme.colors.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  transition: transform ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.gradientHover};
    transform: scale(1.02);
    box-shadow: ${theme.shadows.glow};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

export const GradientButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  background: ${theme.colors.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  text-decoration: none;
  transition: transform ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.gradientHover};
    transform: scale(1.02);
    box-shadow: ${theme.shadows.glow};
  }
`

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.xxl};
  font-weight: ${theme.typography.weights.bold};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

export const Badge = styled.span<{ $status?: 'done' | 'coming' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  background: ${props => props.$status === 'done' 
    ? 'rgba(16, 185, 129, 0.2)' 
    : 'rgba(139, 92, 246, 0.2)'};
  color: ${props => props.$status === 'done' 
    ? theme.colors.status.done 
    : theme.colors.status.coming};
`

export const GlassContainer = styled.div`
  background: ${theme.colors.glass};
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg};
`

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  color: ${props => props.$active ? theme.colors.text.primary : theme.colors.text.secondary};
  background: ${props => props.$active ? theme.colors.gradient : theme.colors.glass};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    background: ${props => props.$active ? theme.colors.gradientHover : 'rgba(255, 255, 255, 0.1)'};
  }
`

export const PoolBadge = styled.span<{ $isV3?: boolean }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  background: ${props => props.$isV3 
    ? 'rgba(236, 72, 153, 0.2)' 
    : 'rgba(40, 224, 185, 0.2)'};
  color: ${props => props.$isV3 ? '#EC4899' : '#28E0B9'};
`
