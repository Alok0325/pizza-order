import { connectDB, fetchItems, fetchRole, closeConnection } from "@/server/configDB";

export async function GET(req){

    await connectDB();
    const res = await fetchItems();

    const res1 = await fetchRole(res);
    
    closeConnection();

    return Response.json({data:res});
}