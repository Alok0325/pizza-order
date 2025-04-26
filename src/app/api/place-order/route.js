import { connectDB, placeOrder, closeConnection } from "@/server/configDB";

export async function POST(req){

    const data = await req.json();

    await connectDB();
    const res = await placeOrder(data);
    
    closeConnection();

    return Response.json({data:res});
}