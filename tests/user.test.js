const request = require('supertest')
const User = require('../models/user');
let server;
describe('Auth', () => {
    beforeEach(() => {
        server =require('../index');
    })
    afterEach(() => {
        server.close();
        User.collection.deleteMany();
    })
    const user = {
        _id: "66b5f2a867dbe17508d70dd1",
        firstName: "Toure",
        lastName: "Aboubacar",
        email: "superAdmin@yopmail.com",
        password: "A12345678@a",
    }
    describe('User sign up', () => {
        it('it should create a user', async () => {
            const response = await request(server)
                .post('/auth/signup')
                .send(user)
                .set({Accept:"Application/json"});
            expect(response.status).toBe(201);
        })
    })
    describe('user login', () => {

        it('should login user dont have a compte', async () => {
            await request(server).post('/auth/signup').send(user).set({Accept:"Application/json"});
            const response = await request(server)
                .post("/auth/login")
                .send({email: 'toure@gmail.com', password: user.password})
                .set({Accept:"Application/json"});
            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({error: "Vous n\'avais pas compte."});
        });

        it('should login user password is incorrect or password not math', async () => {
            await request(server).post('/auth/signup').send(user).set({Accept:"Application/json"});
            const response = await request(server)
                .post("/auth/login")
                .send({email:user.email, password:'123456'})
                .set({Accept:"Application/json"});
            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({error: "Invalid password"});
        });
        it('should login user have a compte', async () => {
            await request(server).post('/auth/signup').send(user).set({Accept:"Application/json"});
            const response = await request(server)
                .post("/auth/login")
                .send({email:user.email, password:user.password})
                .set({Accept:"Application/json"});
            expect(response.status).toBe(200);
        });
    })
    describe('user logout', () => {

    });

    })