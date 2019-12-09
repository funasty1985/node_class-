// CRUD 
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.01:27017'
const databaseName = 'task-manager'

// const id = new ObjectID() // We generate the id in this script instead throught mongod
// console.log(id)  // the first 4 bytes of id is a timestamp
// console.log(id.getTimestamp())

// connect to the server is an async event 
MongoClient.connect(connectionURL, {useNewUrlParser: true} , (error,client) => {
    if (error){
       return console.log('Unable to connect to database! ')
    } 

    const db = client.db(databaseName)
    
    // 75 inserting Documents
    // insertOne is an async event
    // db.collection('users').insertOne({
    //     _id:id,
    //     name: 'Liang Bin',
    //     age: 27
    // },(error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)  // result.ops is an array of documents inserted. In this case, the array only has one document
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:"Jen",
    //         age:28
    //     },{
    //         name:"Gunther",
    //         age:27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unsable to insert documents!')
    //     } 

    //     console.log(result.ops)
    // })

    // 76 Inserting Documents 
    // db.collection('tasks').insertMany([
    //     {
    //         description: "Making video with qing",
    //         completed: false
    //     },{
    //         description: "Drinking Beer",
    //         completed: false
    //     },{
    //         description: "Eating Breakfast",
    //         completed: "true"
    //     }
    // ],  (error, result) => {
    //     if (error) {
    //         return console.log('Usable to insert documents')
    //     } 

    //     console.log(result.ops)
    // } )

    // 78 Querring Documents
    // db.collection('users').findOne({ _id: ObjectID("5d26f2d7434f4c463f1165c1") }, (error, user) => {
    //     if　(error) {
    //         return console.log("Unable to fetch")
    //     }

    //     console.log(user)
    // })

    // find() reutrn a cursor, so no callback as argument as findOne
    // db.collection('users').find({age:27}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({"_id" : ObjectID("5d26f8bb44154f4865b154f7")}, (error,task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error, task) => {
    //     console.log(task)
    // })

    // 80. Updating Documents 
    // obj.updateOne() willl return a promise object if the callback arg is not provided. Look at doc 
    
    // updateOne
    // db.collection('users').updateOne({
    //     _id:ObjectID("5d26f2d7434f4c463f1165c1")
    // }, {
    //     $inc:{
    //         age:5
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch( (error)=>{
    //     console.log(error)
    // } )

    // updateMany
    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set:{
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // 81. Deleting Documents 
    // deleteMany
    // db.collection('users').deleteMany({
    //     age:27
    // }).then((result)=>{
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })
    // db.collection('tasks').deleteOne({
    //     _id: ObjectID("5d26f84dc13f48483dc44f57")
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
})