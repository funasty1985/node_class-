const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const { 
    userOne, 
    userTwo, 
    taskOne, 
    setupDatabase 
    } = require('./fixtures/db')


beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get tasks for user one', async () =>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    expect(response.body).toHaveLength(2)
})

test('User two should not be able to delete tasks of user one', async () =>{
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)  
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)  
        .expect(400)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
 })