import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const url = new URL(req.url); // Create a URL object from the request URL
    const coldkey = url.searchParams.get('coldkey') as string; // Get the 'day' query parameter
    try {
        const result = await axios.post('https://taoxnet.io/api/v1/coldkey/info?network=mainnet', { coldkey }, { headers: { "Content-Type": "application/json" } })
        const data = result.data
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" });
    }
}
