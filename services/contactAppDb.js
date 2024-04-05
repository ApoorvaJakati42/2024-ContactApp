const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://apoorva:apoorva@salessimplify.jk9h7dy.mongodb.net/';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    
    await client.connect();

    console.log('Connected to MongoDB Atlas');

   
    const database = client.db('ContactApp');
    const collection = database.collection('Contacts');

    console.log('Connected to MongoDB Atlas done again');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
