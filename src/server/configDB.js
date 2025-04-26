import { MongoClient,ServerApiVersion } from "mongodb";
import jwt from "jsonwebtoken"

const uri = process.env.DATABASE_URL
const secret = process.env.SECRET

const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

export const connectDB = async () => {
    try{
        await client.connect();
    }
    catch(e){
        console.log("Error: "+e);
    }
}

export const closeConnection = async () => {
    try{
        await client.close();
    }
    catch(err){
        console.log(err);
    }
}

export const login = async (obj) => {
    let email = obj.email;
    let pwd = obj.pwd;
    let type = obj.login_type;
    let roles = null;

    const collection = client.db("workload_management").collection(type);

    const res = await collection.findOne({ "email": email,"pwd": pwd });

    if(!res){
        return {status:false,msg:'Invalid Credentials',token:null,id:null,roles:roles}
    }
    else{
        const token = jwt.sign({status:true,type:type},secret);
        if(type === 'employee'){
            roles = res.role;
        }
        return {status:'true',msg:'Successful',token:token,id:res._id,roles:roles};
    }
}

export const updateRole = async (obj) => {
    
    const collection = client.db("workload_management").collection('roles');
    for(let i = 0; i<obj.roles.length;i++){
        const res = await collection.findOneAndUpdate({_id:obj.roles[i]},
            {
                '$addToSet':{
                    employees:obj.id
                }
            }
        )
    }

}

const addOrder = async (obj) => {
    let flag = null;
    
        const collection = client.db("CanteenProject").collection("orders");
        const d = new Date();
        let date = d.toLocaleDateString() + " " + d.toLocaleTimeString();
        await Promise.resolve(collection.insertOne({
            _id: obj["orderID"],
            "email": obj["email"],
            "name": obj["name"],
            "order": obj["orderDetails"],
            "order_time": date
        }).then(() => {
            flag = 1;
        }).catch((err) => {
            flag = 0;
        }));
    
    return flag;
}