"use client";
import dynamic from "next/dynamic";

const ClientLimitOrdersPage = dynamic(() => import("./ClientWrapper"), {
	ssr: false,
	loading: () => (
		<div style={{ padding: "100px", textAlign: "center", color: "#94a3b8" }}>
			Initializing Limit Orders...
		</div>
	),
});

export default function LimitOrdersPage() {
	return <ClientLimitOrdersPage />;
}
