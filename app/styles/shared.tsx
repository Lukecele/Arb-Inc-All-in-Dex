'use client'

import styled from 'styled-components'
import theme from './theme'

export const Card = styled.div`
  background: ${theme.colors.glass.light};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  border: 1px solid ${theme.colors.border.DEFAULT};
  transition: transform ${theme.transitions.DEFAULT}, box-shadow ${theme.transitions.DEFAULT}, border-color ${theme.transitions.DEFAULT};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow};
    border-color: ${theme.colors.border.hover};
  }
`

export const GradientButton = styled.button`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[4]} ${theme.spacing[8]};
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  transition: transform ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
    opacity: 0;
    transition: opacity ${theme.transitions.DEFAULT};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
    &::before {
      opacity: 1;
    }
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
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[4]} ${theme.spacing[8]};
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  text-decoration: none;
  transition: transform ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
    opacity: 0;
    transition: opacity ${theme.transitions.DEFAULT};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
    &::before {
      opacity: 1;
    }
  }
`

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
  text-align: center;
  margin-bottom: ${theme.spacing[8]};
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

export const Badge = styled.span<{ $status?: 'done' | 'coming' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing[1]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  background: ${props => props.$status === 'done' 
    ? 'rgba(16, 185, 129, 0.15)' 
    : 'rgba(139, 92, 246, 0.15)'};
  color: ${props => props.$status === 'done' 
    ? theme.colors.status.success 
    : theme.colors.primary.DEFAULT};
  border: 1px solid ${props => props.$status === 'done' 
    ? 'rgba(16, 185, 129, 0.3)' 
    : 'rgba(139, 92, 246, 0.3)'};
  transition: border-color ${theme.transitions.DEFAULT};
`

export const GlassContainer = styled.div`
  background: ${theme.colors.glass.medium};
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border.DEFAULT};
  padding: ${theme.spacing[4]};
  transition: border-color ${theme.transitions.DEFAULT};
  
  &:hover {
    border-color: ${theme.colors.border.hover};
  }
`

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[6]};
  background: ${theme.colors.glass.light};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border.DEFAULT};
  transition: transform ${theme.transitions.DEFAULT}, border-color ${theme.transitions.DEFAULT}, box-shadow ${theme.transitions.DEFAULT};
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.border.hover};
    box-shadow: ${theme.shadows.glow};
  }
`

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: ${theme.spacing[4]} ${theme.spacing[8]};
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  color: ${props => props.$active ? theme.colors.text.primary : theme.colors.text.secondary};
  background: ${props => props.$active ? theme.colors.primary.gradient : theme.colors.glass.medium};
  border: 1px solid ${props => props.$active ? 'transparent' : theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.DEFAULT};
  
  &:hover {
    background: ${props => props.$active ? theme.colors.primary.gradient : theme.colors.glass.heavy};
    border-color: ${props => props.$active ? 'transparent' : theme.colors.border.hover};
  }
`

export const PoolBadge = styled.span<{ $isV3?: boolean }>`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  background: ${props => props.$isV3 
    ? 'rgba(236, 72, 153, 0.15)' 
    : 'rgba(45, 212, 191, 0.15)'};
  color: ${props => props.$isV3 ? '#EC4899' : '#2DD4BF'};
  border: 1px solid ${props => props.$isV3 
    ? 'rgba(236, 72, 153, 0.3)' 
    : 'rgba(45, 212, 191, 0.3)'};
  transition: border-color ${theme.transitions.DEFAULT};
`
