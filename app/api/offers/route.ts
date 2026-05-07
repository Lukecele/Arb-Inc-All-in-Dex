import { NextResponse } from "next/server";
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const wallet = searchParams.get("wallet") || "guest";
	const forwardedFor = request.headers.get("x-forwarded-for");
	const userIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
	const userAgent =
		request.headers.get("user-agent") ||
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
	const userId = process.env.CPAGRIP_USER_ID || "";
	const key = process.env.CPAGRIP_API_KEY || "";
	if (!userId || !key) {
		return NextResponse.json({ offers: [] });
	}
	const apiUrl = `https://www.cpagrip.com/common/offer_feed_rss.php?user_id=${userId}&key=${key}&tracking_id=${encodeURIComponent(wallet)}&ip=${userIp}&ua=${encodeURIComponent(userAgent)}`;
	try {
		const response = await fetch(apiUrl);
		const xmlText = await response.text();
		const offers: { title: string; link: string; image: string | null }[] = [];
		const offerBlocks = xmlText.match(/<offer>([\s\S]*?)<\/offer>/g) || [];
		for (const block of offerBlocks) {
			const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
			const linkMatch = block.match(/<offerlink><!\[CDATA\[(.*?)\]\]><\/offerlink>/);
			const photoMatch = block.match(/<offerphoto><!\[CDATA\[(.*?)\]\]><\/offerphoto>/);
			if (titleMatch && linkMatch) {
				offers.push({
					title: titleMatch[1],
					link: linkMatch[1],
					image: photoMatch ? photoMatch[1] : null,
				});
			}
			if (offers.length >= 8) break;
		}
		return NextResponse.json({ offers });
	} catch (error) {
		console.error("Error fetching CPA Grip offers:", error);
		return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
	}
}
