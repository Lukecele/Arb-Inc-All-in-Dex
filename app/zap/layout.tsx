"use client";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  padding-left: 300px;
  min-height: 100vh;
  background-color: #030014;
  @media (max-width: 991px) {
    padding-left: 0;
    padding-top: 64px;
  }
`;

export default function ZapLayout({ children }: { children: React.ReactNode }) {
	return <LayoutWrapper>{children}</LayoutWrapper>;
}
