const { MongoClient }= require("mongodb");
async function RegisterData(data) {
    var client;
    try {
        const uri = "mongodb+srv://kumar:Kumar123@facility-management.f7no7z2.mongodb.net/?retryWrites=true&w=majority&appName=facility-management";
        client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db("facility-management");
        const collection = db.collection("users");
        const check = await collection.findOne({ email: data.email })
        console.log('Data retreived successfully');
          if(check){
          }
          else{
            await collection.insertMany([data])
          }
        return check;
    } catch (error) {
        console.error('Error:', error);
        return null; // Returning null to signify an error occurred
    } finally {
        if (client) {
            await client.close();
            console.log('Connection closed');
        }
    }
}

module.exports = RegisterData;