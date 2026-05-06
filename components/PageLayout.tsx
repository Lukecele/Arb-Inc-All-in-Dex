"use client";
import styled from "styled-components";

const StyledMain = styled.main`
  padding-left: 300px; /* Spazio per la Sidebar Desktop */
  min-height: 100vh;
  width: 100%;
  
  @media (max-width: 991px) {
    padding-left: 0;
    padding-top: 64px; /* Spazio per l'Header Mobile */
  }
`;

export default function PageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <StyledMain>{children}</StyledMain>;
}
