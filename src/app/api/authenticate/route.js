import { connectDB, login, updateRole, closeConnection } from "@/server/configDB";

export async function POST(req){
    const data = await req.json();
    await connectDB();

    const res = await login({email:data.email,pwd:data.pwd,login_type:data.login_type});
    
    if(res.status && res.roles){
        const res1 = await updateRole(res);
    }

    closeConnection();

    return Response.json({status:res.status,token:res.token});
}