import { API_KEY, API_URL } from "./envVars"

type Query = {
    queryString : string
    command?: string
    table: string
    DataBase: string
}


export async function Query(queryString:string, DataBase:string, table :string){
    
    let res
    

    let url = new URL(API_URL);

    url.searchParams.append('APIKey', API_KEY);
    url.searchParams.append('query', queryString);
    url.searchParams.append('command', "Query");
    url.searchParams.append('dataBase', DataBase);
    url.searchParams.append('table', table);

    res = await fetch(url)

    return await res.json()
}