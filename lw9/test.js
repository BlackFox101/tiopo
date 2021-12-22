import supertest from 'supertest';
import chai from 'chai';
import validator from './productValidator.js';
import { Product } from './product.js';

const baseUrl = 'http://91.210.252.240:9010/api';
const request = supertest(baseUrl);
const assert = chai.assert;
const expect = chai.expect

function productIsValid(jsonProduct) {
    const product = new Product(jsonProduct);
    return validator.productIsValid(product);
}

const temp = {
    id: "4412",
    category_id: "10",
    title: "rolex",
    alias: "rolex-0-0-0-0-0-0-0-0-0",
    content: "content",
    price: "100",
    old_price: "70",
    status: "1",
    keywords: "casio",
    description: "123",
    img: "no_image.jpg",
    hit: "1",
    cat: "Epos"
}

describe('Testing products Api', () => {
    it('GET /products ', async () => {
        const response = await request.get("/products");
        assert.isNotEmpty(response.body);
        response.body.forEach(r => {
            let res = productIsValid(r);
            assert.isTrue(res, 'id: ' + r.id + ' - invalid');
        })
    });
    it('temp', () => {
        console.log('product: ' + productIsValid(temp));
    });
});