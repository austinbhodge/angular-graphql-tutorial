import { MongoClient } from 'mongodb';
import { DB_URL } from './config'

export async function connectDatabase(){
   try {
    let db = await MongoClient.connect(DB_URL);
    return db;
  }
  catch(err){
    console.log(err)
  }
}
