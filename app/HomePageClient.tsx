'use client'

import styled, { createGlobalStyle, keyframes } from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaTelegram, FaTwitter, FaChartLine, FaGlobe, FaRocket, FaShieldAlt, FaCubes, FaCoins, FaClock, FaDollarSign, FaWater } from 'react-icons/fa'
import theme from './styles/theme'
import { useState, useEffect } from 'react'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
  
  @keyframes gradientBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #030309 0%, #070715 40%, #0c0c1e 70%, #121228 100%);
    background-size: 300% 300%;
    animation: gradientBackground 20s ease infinite;
    color: #F8FAFC;
    min-height: 100vh;
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-width: thin;
    scrollbar-color: rgba(124,58,237,0.4) transparent;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #7C3AED, #EC4899);
    border-radius: 3px;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ::selection {
    background: rgba(139, 92, 246, 0.4);
    color: white;
  }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const floatOrb = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
`

const BackgroundOrbs = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`

const Orb = styled.div<{ $color: string; $size: string; $top: string; $left: string; $delay: string }>`
  position: absolute;
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: ${props => props.$color};
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.04;
  top: ${props => props.$top};
  left: ${props => props.$left};
  animation: ${floatOrb} ${props => props.$delay} ease-in-out infinite;
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  background: ${theme.colors.background.primary};
  @media (min-width: 769px) {
    padding: 40px 20px;
  }
`

const PageHeader = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  flex-wrap: wrap;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 18, 0.7);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
  @media (min-width: 769px) {
    padding: 20px 0;
  }
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (min-width: 769px) {
    gap: 15px;
  }
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  box-shadow: ${theme.shadows.glow};
  @media (min-width: 769px) {
    width: 60px;
    height: 60px;
  }
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 28px;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 10px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  @media (min-width: 769px) {
    gap: 2px;
    padding: 6px 12px;
  }
`

const NavLink = styled.a`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
  padding: 7px 14px;
  border-radius: 100px;
  transition: all ${theme.transitions.fast};
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(139, 92, 246, 0.12);
    &::before {
      left: 100%;
    }
  }
  @media (min-width: 769px) {
    font-size: 13px;
    padding: 8px 14px;
  }
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 12px 0;
  @media (min-width: 769px) {
    padding: 0;
  }
`

const HeroSection = styled.section`
  text-align: center;
  padding: 32px 10px;
  @media (min-width: 769px) {
    padding: 72px 20px 56px;
  }
`

const HeroTitle = styled.h2`
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #8B5CF6 0%, #C084FC 25%, #EC4899 50%, #C084FC 75%, #8B5CF6 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
  line-height: 1.1;
  letter-spacing: -0.03em;
  @media (min-width: 481px) {
    font-size: 52px;
  }
  @media (min-width: 769px) {
    font-size: 80px;
    margin-bottom: 24px;
  }
`

const HeroSubtitle = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
  max-width: 680px;
  margin: 0 auto 24px;
  @media (min-width: 769px) {
    font-size: 20px;
    margin-bottom: 40px;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin: 28px 0;
  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`

const FeatureCard = styled.div`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 20px;
  padding: 28px 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.2);
    &::before {
      opacity: 1;
    }
  }
`

const FeatureIcon = styled.div`
  font-size: 40px;
  margin-bottom: 16px;
  line-height: 1;
`

const FeatureTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #a78bfa;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
`

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #8a8a9a;
  line-height: 1.6;
`

const TokenomicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`

const TokenomicsChart = styled.div`
  width: 220px;
  height: 220px;
  flex-shrink: 0;
  border-radius: 50%;
  background: conic-gradient(
    #8B5CF6 0% 50%,
    #EC4899 50% 70%,
    #06B6D4 70% 100%
  );
  position: relative;
  box-shadow: 0 0 60px rgba(139, 92, 246, 0.2);
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90px;
    height: 90px;
    background: #0a0a12;
    border-radius: 50%;
  }
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
    &::after { width: 64px; height: 64px; }
  }
`

const TokenomicsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  max-width: 900px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const TokenomicsCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.25s ease, background 0.25s ease;
  &:hover {
    border-color: rgba(139, 92, 246, 0.2);
    background: rgba(139, 92, 246, 0.03);
  }
`

const TokenomicsCardTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
`

const TokenomicsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  &:last-child {
    border-bottom: none;
  }
`

const TokenomicsRowLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #a1a1aa;
`

const TokenomicsDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
  box-shadow: 0 0 8px ${props => props.$color}40;
`

const TokenomicsRowValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: -0.01em;
`

const TokenomicsNote = styled.p`
  font-size: 13px;
  color: #71717a;
  line-height: 1.6;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`

const TokenomicsFullWidth = styled.div`
  grid-column: 1 / -1;
`

const TokenomicsHighlight = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.06));
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`

const TokenomicsHighlightValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
`

const TokenomicsHighlightLabel = styled.div`
  font-size: 14px;
  color: #a1a1aa;
`

const TimelineContainer = styled.div`
  position: relative;
  max-width: 680px;
  margin: 0 auto;
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 0;
    left: 20px;
    width: 2px;
    background: linear-gradient(180deg, #8B5CF6 0%, #EC4899 60%, rgba(236,72,153,0.2) 100%);
  }
`

const TimelineItem = styled.div<{ $index: number }>`
  position: relative;
  margin-bottom: 32px;
  display: flex;
  justify-content: flex-start;
  padding-left: 56px;
  width: 100%;
`

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border-radius: 14px;
  padding: 18px 20px;
  max-width: 100%;
  flex: 1;
  border: 1px solid rgba(255, 255, 255, 0.07);
  position: relative;
`

const TimelineDot = styled.div<{ $status?: 'done' | 'coming' }>`
  position: absolute;
  top: 24px;
  left: 14px;
  width: 14px;
  height: 14px;
  background: ${props => props.$status === 'done' ? '#10B981' : '#8B5CF6'};
  border-radius: 50%;
  border: 2px solid #0a0a12;
  z-index: 1;
  box-shadow: ${props => props.$status === 'done' ? '0 0 10px rgba(16, 185, 129, 0.6)' : '0 0 8px rgba(139, 92, 246, 0.4)'};
`

const TimelineDate = styled.div`
  font-size: 14px;
  color: #8B5CF6;
  font-weight: 600;
  margin-bottom: 8px;
`

const TimelineTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #f4f4f5;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
`

const TimelineDescription = styled.p`
  font-size: 13px;
  color: #71717a;
  line-height: 1.5;
`

const Section = styled.section`
  background: rgba(255, 255, 255, 0.015);
  border-radius: 20px;
  padding: 24px 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin: 12px 0;
  @media (min-width: 769px) {
    padding: 44px 36px;
    margin: 24px 0;
    border-radius: 28px;
  }
`

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #8B5CF6 0%, #C084FC 50%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  @media (min-width: 769px) {
    font-size: 42px;
    margin-bottom: 36px;
  }
`

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 16px;
  line-height: 1.8;
  color: #8a8a9a;
  max-width: 820px;
  margin: 0 auto;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 24px 0;
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
  position: relative;
  min-width: 0;
  
  &:hover {
    border-color: rgba(139, 92, 246, 0.3);
    background: rgba(139, 92, 246, 0.05);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.1);
  }
  
  @media (max-width: 480px) {
    padding: 16px 8px;
    border-radius: 12px;
  }
`

const StatLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
  line-height: 1.3;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-bottom: 4px;
  }
`

const StatIcon = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  opacity: 0.8;
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #a78bfa;
  letter-spacing: -0.02em;
  line-height: 1.1;
  word-break: break-word;
  @media (max-width: 480px) {
    font-size: 22px;
  }
  @media (min-width: 640px) {
    font-size: 32px;
  }
  @media (min-width: 900px) {
    font-size: 40px;
  }
`

const StatSubLabel = styled.div`
  font-size: 11px;
  color: #52525b;
  margin-top: 4px;
  line-height: 1.3;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`

const CTAButton = styled.div`
  display: inline-block;
  padding: 14px 36px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  border: none;
  border-radius: 100px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  &:active {
    transform: translateY(0px);
  }
`

const SwapButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  font-size: 16px;
  font-weight: 600;
  color: #0f0f1a;
  background: linear-gradient(135deg, #34d399, #10b981);
  border: none;
  border-radius: 100px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255,255,255,0.2);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  &:active {
    transform: translateY(0px);
  }
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 40px;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 14px;
  color: #d4d4d8;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.2s;
  &:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    color: #fff;
    transform: translateY(-2px);
  }
`

const PageFooter = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 48px 0 32px;
  color: ${theme.colors.text.muted};
  font-size: 13px;
  position: relative;
  margin-top: 24px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), transparent);
  }
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  text-align: left;
  margin-bottom: 32px;
  @media (min-width: 769px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const FooterColumn = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.text.primary};
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  a {
    display: block;
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    font-size: 13px;
    margin-bottom: 10px;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.accent.DEFAULT};
    }
  }
`

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  a {
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    font-size: 13px;
    transition: ${theme.transitions.fast};
    &:hover {
      color: ${theme.colors.accent.DEFAULT};
    }
  }
`

const Disclaimer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
  background: rgba(255, 152, 0, 0.08);
  border: 1px solid rgba(255, 152, 0, 0.2);
  border-radius: 8px;
  color: #FF9900;
  font-size: 12px;
  line-height: 1.5;
`

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const FAQItem = styled.details`
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  margin-bottom: 12px;
  background: rgba(255,255,255,0.03);
  transition: border-color 0.2s;
  &:hover { border-color: rgba(139, 92, 246, 0.4); }
  &[open] { border-color: rgba(139, 92, 246, 0.5); }
`

const FAQSummary = styled.summary`
  padding: 20px 24px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Space Grotesk', sans-serif;
  &::-webkit-details-marker { display: none; }
  &::after { content: '+'; font-size: 20px; color: #8B5CF6; }
  details[open] &::after { content: '−'; }
`

const FAQAnswer = styled.div`
  padding: 0 24px 20px;
  color: #A9A9A9;
  font-size: 15px;
  line-height: 1.7;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 16px;
`

const DEXSCREENER_WATCHLIST_URL = 'https://dexscreener.com/watchlist/KvE6lgnr30b0Z2yFhxlB'
const TOKEN_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'

interface TokenStats {
  price: number
  marketCap: number
  liquidity: number
  volume24h: number
  poolCount: number
  contract: string
}

const defaultTokenData: TokenStats = {
  price: 0.000004402,
  marketCap: 4402,
  liquidity: 3970,
  volume24h: 128,
  poolCount: 34,
  contract: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c',
}

export default function HomePageClient() {
  const [tokenData, setTokenData] = useState<TokenStats>(defaultTokenData)
  const [loading, setLoading] = useState(true)

  const faqs = [
    {
      q: 'What is Arbitrage Inception?',
      a: 'Arbitrage Inception is an all-in-one DeFi platform on BNB Smart Chain. It combines swap, zap, cross-chain bridge, and limit orders with a deflationary token (ARB Inc) that automatically distributes BNB rewards to holders every 12 hours.'
    },
    {
      q: 'What is the ARB Inc token?',
      a: 'ARB Inc is a deflationary BEP-20 token on BNB Smart Chain with a total supply of 1 billion tokens. It features a 4% buy/sell tax, automated buyback & burn, and BNB reward distributions powered by DEX revenue.'
    },
    {
      q: 'How do I earn BNB rewards?',
      a: 'Hold at least 2,000,000 ARB Inc tokens in your wallet. Every 12 hours, 40% of the collected BNB from DEX revenue is automatically distributed to qualifying holders. No staking or claiming needed.'
    },
    {
      q: 'What is the minimum holding to receive rewards?',
      a: 'You need a minimum of 2,000,000 ARB Inc tokens to be eligible for BNB reward distributions.'
    },
    {
      q: 'How often are rewards distributed?',
      a: 'BNB rewards are distributed every 12 hours automatically to all eligible holders.'
    },
    {
      q: 'What chains does Arbitrage Inception support?',
      a: 'The ARB Inc token and native DEX functions (swap, zap, limit orders) run on BNB Smart Chain (BSC). The bridge feature powered by Mayan Finance supports cross-chain swaps to and from multiple EVM and non-EVM chains.'
    },
    {
      q: 'How do I buy ARB Inc tokens?',
      a: 'You can buy ARB Inc directly on the Swap page using BNB. The swap is powered by PancakeSwap V2. Connect your wallet (MetaMask, Coinbase, WalletConnect) and swap BNB for ARB Inc in seconds.'
    },
    {
      q: 'What are the trading fees?',
      a: 'ARB Inc has a 4% buy/sell tax that funds the reward distribution and buyback & burn mechanism. Additionally, a 0.1% dev fee applies to swaps on the platform.'
    },
    {
      q: 'What is the deflationary mechanism?',
      a: '20% of every BNB distribution is used for buyback & burn, permanently removing ARB Inc from circulation. This continuous reduction in supply creates deflationary pressure over time.'
    },
    {
      q: 'What is the Zap feature?',
      a: 'Zap lets you add or remove liquidity from BSC pools with a single transaction. Instead of manually splitting tokens and providing both sides of a pair, Zap handles everything automatically using PancakeSwap and KyberSwap pools.'
    },
  ]

  const fetchTokenStats = async () => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      
      if (data.pairs && data.pairs.length > 0) {
        let totalLiquidity = 0
        let totalVolume24h = 0
        
        data.pairs.forEach((pair: any) => {
          totalLiquidity += parseFloat(pair.liquidity?.usd || 0)
          totalVolume24h += parseFloat(pair.volume?.h24 || 0)
        })

        const mainPair = data.pairs.reduce((a: any, b: any) => 
          (parseFloat(a.liquidity?.usd || 0) > parseFloat(b.liquidity?.usd || 0)) ? a : b
        )

        const price = parseFloat(mainPair.priceUsd || 0)
        const marketCap = price * 1000000000

        setTokenData({
          price,
          marketCap: Math.round(marketCap),
          liquidity: Math.round(totalLiquidity),
          volume24h: Math.round(totalVolume24h),
          poolCount: data.pairs.length,
          contract: TOKEN_ADDRESS
        })
      }
    } catch (error) {
      console.error('Error fetching token stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenStats()
    const interval = setInterval(fetchTokenStats, 30000)
    
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundOrbs>
          <Orb $color="#8B5CF6" $size="400px" $top="-100px" $left="-100px" $delay="20s" />
          <Orb $color="#EC4899" $size="300px" $top="60%" $left="70%" $delay="25s" />
          <Orb $color="#06B6D4" $size="250px" $top="30%" $left="60%" $delay="30s" />
          <Orb $color="#10B981" $size="350px" $top="70%" $left="20%" $delay="35s" />
        </BackgroundOrbs>
        <Header activePage="/" />
        <PageHeader />

        <MainContent>
          <HeroSection as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroTitle>Trade Smarter with Arbitrage Inception</HeroTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HeroSubtitle>
                The future of reward-driven DeFi is here. Generate volume across paired assets,
                strengthening liquidity and delivering consistent BNB rewards to holders.
                50% of all DEX revenue distributed to the community.
              </HeroSubtitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <SwapButton href="/swap?tokenIn=BNB&tokenOut=ARBINc">
                <span>BNB</span>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>→</span>
                <span>Arb Inc</span>
              </SwapButton>
              <Link href="/swap" passHref>
                <Link href="/swap-all" passHref>
                  <CTAButton>All Tokens</CTAButton>
                </Link>
              </Link>
            </motion.div>
          </HeroSection>

          <Section>
            <SectionTitle>About Arbitrage Inception</SectionTitle>
            <AboutContent>
              <p>
                Arbitrage Inception is designed to generate volume across paired assets, strengthening liquidity and delivering consistent BNB rewards to holders. Our innovative protocol combines advanced arbitrage mechanisms with reward distribution, creating a sustainable DeFi ecosystem.
              </p>
              <p>
                The project is built on BNB Smart Chain, leveraging low transaction fees and high speed to enable efficient arbitrage trading. Every trade contributes to liquidity pools and generates rewards for token holders, creating a win-win scenario for traders and investors alike.
              </p>
              <p>
                With a focus on transparency and innovation, Arbitrage Inception provides real-time analytics, secure smart contracts, and a community-driven governance model. Join us in revolutionizing DeFi through intelligent arbitrage and sustainable rewards.
              </p>
            </AboutContent>
          </Section>

          <Section>
            <SectionTitle>Key Features</SectionTitle>
            <FeaturesGrid as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                {
                  icon: <FaCoins size={48} color="#8B5CF6" />,
                  title: "BNB Rewards Protocol",
                  description: "Earn passive BNB rewards every 12 hours. Hold a minimum of 2,000,000 tokens to qualify. 40% of distribution goes to holders and dev, 20% is buybacked and burned forever."
                },
                {
                  icon: <FaRocket size={48} color="#EC4899" />,
                  title: "Arbitrage Pairs",
                  description: "Leverage arbitrage opportunities across multiple trading pairs. Our algorithm identifies and executes profitable trades automatically."
                },
                {
                  icon: <FaCubes size={48} color="#06B6D4" />,
                  title: "Smart Volume Mechanics",
                  description: "50% of all DEX revenue is converted to BnB and sent to the distribution wallet. Combined with 20% burn on every distribution, creating a deflationary cycle."
                },
                {
                  icon: <FaShieldAlt size={48} color="#10B981" />,
                  title: "Transparency & Innovation",
                  description: "Fully transparent protocol with cutting-edge DeFi technology. Minimum 2,000,000 tokens required for rewards. All transactions are verifiable on-chain, and the code is open-source."
                }
              ].map((feature, index) => (
                <FeatureCard
                  as={motion.div}
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </Section>

          <Section>
            <SectionTitle>Live Statistics</SectionTitle>
            <StatsGrid as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                { label: "Current Price", value: loading ? '—' : `$${tokenData.price.toFixed(9)}`, icon: <FaDollarSign /> },
                { label: "Market Cap", value: loading ? '—' : `$${tokenData.marketCap.toLocaleString()}`, icon: <FaChartLine /> },
                { 
                  label: "Liquidity", 
                  value: loading ? '—' : `$${tokenData.liquidity.toLocaleString()}`, 
                  sublabel: loading ? '' : `across over ${tokenData.poolCount} pools`,
                  icon: <FaWater /> 
                },
                { label: "24h Volume", value: loading ? '—' : `$${tokenData.volume24h.toLocaleString()}`, icon: <FaClock /> }
              ].map((stat, index) => (
                <StatCard
                  as={motion.div}
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <StatIcon>{stat.icon}</StatIcon>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatValue>{stat.value}</StatValue>
                  {stat.sublabel && <StatSubLabel>{stat.sublabel}</StatSubLabel>}
                </StatCard>
              ))}
            </StatsGrid>
            
            {/* Dedicated Zap CTA Section */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link href="/zap" passHref>
                <span style={{
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #06B6D4, #7C3AED)',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'inline-block',
                  boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)',
                }}>
                  ⚡ Use Zap — Add Liquidity in One Click
                </span>
              </Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <a href={DEXSCREENER_WATCHLIST_URL} target="_blank" rel="noopener noreferrer">
                <CTAButton>View Live Chart on DexScreener</CTAButton>
              </a>
              <div style={{ marginTop: '15px' }}>
                <a 
                  href={DEXSCREENER_WATCHLIST_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    color: '#2DD4BF',
                    textDecoration: 'underline',
                    fontWeight: 500
                  }}
                >
                  View all pools
                </a>
              </div>
            </div>
          </Section>

          <Section>
            <SectionTitle>How It Works</SectionTitle>
            <AboutContent>
              <p>
                <strong>1. Trading:</strong> Users swap tokens through our integrated PancakeSwap widget. Each trade incurs a minimal fee (0.1%) that is distributed to the fee receiver.
              </p>
              <p>
                <strong>2. Arbitrage:</strong> Our smart contract identifies price discrepancies across DEXes and executes arbitrage trades, generating profit from market inefficiencies.
              </p>
              <p>
                <strong>3. Rewards:</strong> 50% of DEX revenue is converted to BnB and sent to the distribution wallet. Every 12 hours, 40% is distributed as BnB rewards to holders (minimum 2,000,000 tokens required) and dev, while 20% is buybacked and burned forever. Additionally, 20% burn is applied on every distribution.
              </p>
              <p>
                <strong>4. Liquidity:</strong> Trading fees and arbitrage profits are used to deepen liquidity pools, ensuring better prices for traders and reducing slippage.
              </p>
            </AboutContent>
          </Section>

          <Section>
            <SectionTitle>Tokenomics</SectionTitle>
            <TokenomicsContainer>
              <TokenomicsChart />

              <TokenomicsHighlight>
                <TokenomicsHighlightValue>1,000,000,000</TokenomicsHighlightValue>
                <TokenomicsHighlightLabel>Total Supply • 4% Tax (Buy/Sell)</TokenomicsHighlightLabel>
              </TokenomicsHighlight>

              <TokenomicsGrid>
                <TokenomicsCard>
                  <TokenomicsCardTitle>Revenue Distribution</TokenomicsCardTitle>
                  <TokenomicsRow>
                    <TokenomicsRowLabel>
                      <TokenomicsDot $color="#F59E0B" />
                      DEX Revenue → BnB
                    </TokenomicsRowLabel>
                    <TokenomicsRowValue>50%</TokenomicsRowValue>
                  </TokenomicsRow>
                  <TokenomicsRow>
                    <TokenomicsRowLabel>
                      <TokenomicsDot $color="#EF4444" />
                      Burn on Distribution
                    </TokenomicsRowLabel>
                    <TokenomicsRowValue>20%</TokenomicsRowValue>
                  </TokenomicsRow>
                  <TokenomicsNote>
                    50% of all DEX revenue is converted to BnB and sent to the distribution wallet every 12 hours.
                  </TokenomicsNote>
                </TokenomicsCard>

                <TokenomicsCard>
                  <TokenomicsCardTitle>Every 12 Hours</TokenomicsCardTitle>
                  <TokenomicsRow>
                    <TokenomicsRowLabel>
                      <TokenomicsDot $color="#10B981" />
                      BNB Rewards to Holders & Dev
                    </TokenomicsRowLabel>
                    <TokenomicsRowValue>40%</TokenomicsRowValue>
                  </TokenomicsRow>
                  <TokenomicsRow>
                    <TokenomicsRowLabel>
                      <TokenomicsDot $color="#06B6D4" />
                      Buyback & Burn
                    </TokenomicsRowLabel>
                    <TokenomicsRowValue>20%</TokenomicsRowValue>
                  </TokenomicsRow>
                  <TokenomicsNote>
                    Minimum 2,000,000 tokens required to receive rewards. Buyback & burn reduces supply forever.
                  </TokenomicsNote>
                </TokenomicsCard>
              </TokenomicsGrid>
            </TokenomicsContainer>
          </Section>

          <Section>
            <SectionTitle>Roadmap</SectionTitle>
            <TimelineContainer>
              {[
                {
                  status: "done",
                  title: "Launch on RevShare",
                  description: "Successfully launched with RevShare integration."
                },
                {
                  status: "done",
                  title: "Build Arbitrage Pools",
                  description: "Multiple arbitrage pools deployed with more coming."
                },
                {
                  status: "done",
                  title: "DEX Update",
                  description: "Platform updated with latest DEX aggregators."
                },
                {
                  status: "done",
                  title: "Swap",
                  description: "Swap functionality integrated and operational."
                },
                {
                  status: "done",
                  title: "Liquidity Zap",
                  description: "Zap feature for adding/removing liquidity live."
                },
                {
                  status: "done",
                  title: "Limit Orders",
                  description: "Limit orders are now live! Create, cancel, and fill limit orders with KyberSwap integration."
                },
                {
                  status: "done",
                  title: "Bridge",
                  description: "Cross-chain bridge live! Powered by Mayan Finance for seamless cross-chain swaps."
                },
                {
                  status: "coming",
                  title: "Launchpad",
                  description: "Token launchpad for new projects launching on the Arbitrage Inception ecosystem."
                },
                {
                  status: "coming",
                  title: "Fiat On-Ramp",
                  description: "Buy crypto with fiat directly on platform."
                },
                {
                  status: "coming",
                  title: "More to Come",
                  description: "Stay tuned for exciting new features."
                },
              ].map((item, index) => (
                <TimelineItem key={index} $index={index}>
                  <TimelineDot $status={item.status as 'done' | 'coming'} />
                  <TimelineContent>
                    <TimelineTitle style={{ color: item.status === 'done' ? '#10B981' : '#8B5CF6' }}>
                      {item.status === 'done' ? '✓ ' : ''}{item.title}
                    </TimelineTitle>
                    <TimelineDescription>{item.description}</TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </Section>


          <Section>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <FAQContainer>
              {faqs.map(({ q, a }, i) => (
                <FAQItem key={i}>
                  <FAQSummary>{q}</FAQSummary>
                  <FAQAnswer>{a}</FAQAnswer>
                </FAQItem>
              ))}
            </FAQContainer>
          </Section>

          <Section>
            <SectionTitle>Get Started</SectionTitle>
            <AboutContent style={{ textAlign: 'center' }}>
              <p>
                Ready to experience the future of DeFi? Connect your wallet and start trading today.
              </p>
              <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/swap" passHref>
                  <CTAButton>Go to Swap Page</CTAButton>
                </Link>
                <Link href="/zap" passHref>
                  <CTAButton style={{ background: 'linear-gradient(90deg, #2DD4BF, #00D4FF)' }}>Go to Zap Page</CTAButton>
                </Link>
              </div>
            </AboutContent>
          </Section>

          <Section>
            <SectionTitle>Connect With Us</SectionTitle>
            <SocialLinks as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                { href: "https://dexscreener.com/watchlist/KvE6lgnr30b0Z2yFhxlB", icon: <FaChartLine size={20} />, label: "DexScreener" },
                { href: "https://x.com/Arbitrageincept", icon: <FaTwitter size={20} />, label: "Twitter" },
                { href: "https://t.me/ArbitrageInception", icon: <FaTelegram size={20} />, label: "Telegram" },
                { href: "https://revshare.dev/token/0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c", icon: <FaChartLine size={20} />, label: "RevShare" },
                { href: "https://arbitrage-inc.exchange/", icon: <FaGlobe size={20} />, label: "Website" }
              ].map((social, index) => (
                <SocialLink
                  as={motion.a}
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon} {social.label}
                </SocialLink>
              ))}
            </SocialLinks>
          </Section>

          <Section>
            <SectionTitle>Contract Information</SectionTitle>
            <AboutContent style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }}>
                {tokenData.contract}
              </p>
              <p style={{ marginTop: '20px', fontSize: '16px', color: '#A9A9A9' }}>
                BNB Smart Chain (BEP-20) • 9 Decimals • Tax: 4% Buy/Sell
              </p>
            </AboutContent>
          </Section>
        </MainContent>

        <Footer />
      </Container>
    </>
  )
}
