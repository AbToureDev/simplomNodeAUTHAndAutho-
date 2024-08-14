const request = require('supertest')
const Product = require('../models/products');
let server;

describe('product', () => {
    beforeEach(() => {
        server =require('../index');
    })
    afterEach(() => {
        server.close();
        Product.collection.deleteMany();
    })
    const product = {
        _id: "66b5f2a867dbe17508d70dd1",
        name: "mon product",
        description: "Aboubacar",
        categoryType: "superAdmin@yopmail.com",
        price:100,
        userId: "66b5f2a867dbe17508d70dd1"
    }
    describe('creat product', () => {
        it('it should create a product', async () => {
            const response = await request(server)
                .post('/product/creat_product')
                .send(product)
                .set({Accept:"Application/json"});
            expect(response.status).toBe(201);
        })
    })

    describe('get all product', () => {
        it('it should get all product', async () => {
            const response = await request(server)
                .get('/product/All_products')
                .set('content-type', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })
    })

    describe('get product by Id', () => {
        it('it should dont find', async () => {
            const response = await request(server).get(`/product/products_by_id/${product._id}`)
                .set("content-type", "application/json");
            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({ message: "Product not found" });
        })
        it('should return a JSON product',async () => {
            const createResponse = await request(server)
                .post('/product/creat_product')
                .send(product)
                .set({ Accept: "Application/json" });

            const createdProductId = createResponse.body._id;
            const response = await request(server)
                .get(`/product/products_by_id/${createdProductId}`)
                .set({ Accept: "Application/json" });
            expect(response.status).toBe(200);
        })
    })
    describe('Update product', () => {
        it("should return 404 if the task with the id doesnt exist", async () => {
            const response = await request(server).patch(`/product/update_product/${product._id}`);
            expect(response.status).toBe(404);
            expect(response.body).toMatchObject( {message: "Product not found" });
        });

        it('should update product', async () => {
            const createResponse = await request(server)
                .post('/product/creat_product')
                .send(product)
                .set({ Accept: "Application/json" });

            const createdProductId = createResponse.body._id;
                    const response = await request(server).patch(`/product/update_product/${createdProductId}`)
                        .set("content-type", "application/json")
                        .send(product);
                    expect(response.status).toBe(200);
        });
    });
   describe("delete product", () => {
       it("should return 404 if the task with the id doesnt exist", async () => {
           const response = await request(server).delete(`/product/delete_product/${product._id}`)
               .set("content-type", "application/json");
           expect(response.status).toBe(404);
       })
       it("should delete a product", async () => {
           const createResponse = await request(server)
               .post('/product/creat_product')
               .send(product)
               .set({ Accept: "Application/json" });

           const createdProductId = createResponse.body._id;
           const response = await request(server).delete(`/product/delete_product/${createdProductId}`)
               .set("content-type", "application/json");
           expect(response.status).toBe(200);
       })
   });
});