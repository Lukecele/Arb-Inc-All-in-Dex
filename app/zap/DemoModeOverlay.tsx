import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { PoolInfo } from "../../types";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

const DemoCard = styled.div`
  background: ${theme.colors.cardBackground};
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
`;

const DemoStat = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const DemoLabel = styled.span`
  color: ${theme.colors.textSecondary};
`;

const DemoValue = styled.span`
  color: ${theme.colors.textPrimary};
  font-weight: bold;
`;

interface Props {
  pool: PoolInfo;
}

export default function DemoModeOverlay({ pool }: Props) {
  return (
    <Overlay>
      <DemoCard>
        <h3>Demo Mode</h3>
        <DemoStat>
          <DemoLabel>TVL</DemoLabel>
          <DemoValue>${(pool.liquidityUSD || 0).toLocaleString()}</DemoValue>
        </DemoStat>
        <DemoStat>
          <DemoLabel>APR</DemoLabel>
          <DemoValue>{pool.apr || "0%"}</DemoValue>
        </DemoStat>
      </DemoCard>
    </Overlay>
  );
}
