import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const url = new URL(req.url); // Create a URL object from the request URL
    const day = url.searchParams.get('day') as string; // Get the 'day' query parameter
    const mm = url.searchParams.get('miners') as string; // Get the 'day' query parameter
    const miners = mm?.split(",")
        .map((miner: string) => parseInt(miner.trim(), 10))
        .filter((miner: number) => !isNaN(miner));
    console.log({ day })
    const today = new Date().toISOString().split('T')[0];
    console.log({ today });

    const date = new Date();
    date.setDate(date.getDate() - parseInt(day, 10));
    const fiveDaysAgo = date.toISOString().split('T')[0];
    console.log({ fiveDaysAgo });

    try {
        // Use Promise.all to await all requests
        const result = await Promise.all(miners?.map(async (uid: number) => {
            const response = await fetch(
                `https://synth.mode.network/validation/scores/historical?from=${fiveDaysAgo}&to=${today}&miner_uid=${uid}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    cache: "no-cache"
                }
            );

            if (!response.ok) {
                console.error(`Failed to fetch data for UID: ${uid}`);
                return { UID: uid, error: "Failed to fetch data" };
            }

            const data = await response.json();

            return {
                UID: uid,
                Score: data.map((item: any) => item.prompt_score),
                Date: data.map((item: any) => item.scored_time)
            };
        }) || []);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" });
    }
}
