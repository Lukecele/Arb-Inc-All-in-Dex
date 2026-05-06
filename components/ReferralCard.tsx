"use client";

import React, { useState } from "react";
import { FaCheck, FaCopy, FaUsers } from "react-icons/fa";
import styled from "styled-components";
import theme from "../app/styles/theme";

const Card = styled.div`
  background: ${theme.colors.glass.light};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  backdrop-filter: blur(10px);
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${theme.colors.text.accent};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${theme.colors.text.muted};
  margin-top: 4px;
`;

const LinkLabel = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
  text-align: left;
`;

const LinkContainer = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const RefLink = styled.span`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: monospace;
`;

const CopyButton = styled.button`
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
`;

interface ReferralCardProps {
	wallet: string;
	count: number;
	earnings: number;
}

export default function ReferralCard({
	wallet,
	count,
	earnings,
}: ReferralCardProps) {
	const [copied, setCopied] = useState(false);
	const refLink = `https://arbitrage-inc.exchange/rewards?ref=${wallet}`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(refLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card>
			<Title>
				<FaUsers /> Referral Program
			</Title>

			<StatGrid>
				<StatBox>
					<StatValue>{count}</StatValue>
					<StatLabel>Amici Invitati</StatLabel>
				</StatBox>
				<StatBox>
					<StatValue>{earnings.toFixed(2)}</StatValue>
					<StatLabel>Punti Bonus</StatLabel>
				</StatBox>
			</StatGrid>

			<LinkLabel>
				Condividi il tuo link per guadagnare il 10% dei punti accumulati dai
				tuoi amici:
			</LinkLabel>
			<LinkContainer>
				<RefLink>{refLink}</RefLink>
				<CopyButton onClick={copyToClipboard}>
					{copied ? <FaCheck /> : <FaCopy />} {copied ? "Copiato!" : "Copia"}
				</CopyButton>
			</LinkContainer>
		</Card>
	);
}
