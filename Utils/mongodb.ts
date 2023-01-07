// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb'

if (!process.env.DB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const options = {}

const uri:string = process.env.DB_URL
let client : MongoClient
let clientPromise:Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {

  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>
  }

  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongoClientPromise._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise