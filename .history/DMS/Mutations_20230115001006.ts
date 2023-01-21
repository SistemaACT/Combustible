import { API_KEY, API_URL } from "./envVars";

type Params = {
        primaryKey?: number | string;
        dataBase?: string;
        table?: string;
        data?: Data;
        col?: number;
        headers?: string[];
        header?: string;
        image?:any;
        functionName?:string

}

type Data = string | Date | number | object | string[] | number[] | Date[] | object[]



export async function Mutation(API:string, command:string,dataParams:Params){

    let res

    try{
       res =  await fetch(API,{
            mode: "no-cors",
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({...dataParams, command:command, APIKey: API_KEY}) // body data type must match "Content-Type" header
        })

    }catch(error){
        throw(error)
    }
    
    return res

}

export async function UseInsert(Database: string, Table:string, Data: Data, image?:any){

    let res

    try{
        res = await Mutation(API_URL, "insert", {dataBase:Database, table:Table, data:Data, image:image})
    }catch(error){
        throw(error)
    }

    return res

}

export async function useUpdateValue(Database: string, Table:string, PrimaryKey: string | number, header:string , Data: Data, image?:File){

    let res

    try{
        res = Mutation(API_URL, "updateValue", {dataBase:Database, table:Table, data:Data, primaryKey:PrimaryKey, header: header, image:image})
    }catch(error){
        throw(error)
    }

    return res

}

export async function useUpdateRow(Database: string, Table:string, PrimaryKey: string | number ,Data: Data, image:File){

    let res

    try{
        res = Mutation(API_URL, "updateRow", {dataBase:Database, table:Table, primaryKey:PrimaryKey ,data:Data, image:image})
    }catch(error){
        throw(error)
    }

    return res

}

export async function useDropRow(Database: string, Table:string, PrimaryKey: string | number){

    let res

    try{
        res = Mutation(API_URL, "dropRow", {dataBase:Database, table:Table, primaryKey:PrimaryKey})
    }catch(error){
        throw(error)
    }

    return res

}

export async function useCreateTable(Database: string, Table:string, headers: string[]){

    let res

    try{
        res = Mutation(API_URL, "createTable", {dataBase:Database, table:Table, headers:headers})
    }catch(error){
        throw(error)
    }

    return res

}


export async function useDropTable(Database: string, Table:string){

    let res

    try{
        res = Mutation(API_URL, "dropTable", {dataBase:Database, table:Table})
    }catch(error){
        throw(error)
    }

    return res

}

export async function useRunScript(functionName:string, data:object){

    let res

    try{
        res = await Mutation(API_URL, "costumFunction",{functionName:functionName, data:data})
    }catch(error){
        throw(error)
    }

    return await res.json()

}

export async function useCreateDatabase(DataBase:string){

    let res

    try{
        res = Mutation(API_URL, "createDatabase", {dataBase:DataBase})
    }catch(error){
        throw(error)
    }

    return res

}

export async function useDropDatabase(DataBase:string){

    let res

    try{
        res = Mutation(API_URL, "dropDatabase", {dataBase:DataBase})
    }catch(error){
        throw(error)
    }

    return res

}