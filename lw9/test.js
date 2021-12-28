import supertest from 'supertest';
import chai from 'chai';
import validator from './productValidator.js';
import { Product } from './product.js';

import categoryId0 from './data/invalid/categoryId0.js';
import categoryId16 from './data/invalid/categoryId16.js';
import hit2 from './data/invalid/hit2.js';
import hitMinus1 from './data/invalid/hit-1.js';
import status2 from './data/invalid/status2.js';
import statusMinus1 from './data/invalid/status-1.js';
import invalidTypes from './data/invalid/invalidTypes.js';

import validProduct1 from './data/valid/validProduct1.js';
import validProduct2 from './data/valid/validProduct2.js';
import validProductAlias from './data/valid/validProductAlias.js';

const baseUrl = 'http://91.210.252.240:9010/api';
const request = supertest(baseUrl);
const assert = chai.assert;
const expect = chai.expect

function productIsValid(jsonProduct) {
    const product = new Product(jsonProduct);
    return validator.productIsValid(product);
}

async function checkExistProductWithId(id) {
    const response = await request.get('/products');
    const existingIds = [];
    response.body.forEach(r => {
        existingIds.push(parseInt(r.id));
    })
    return existingIds.includes(id);
}

const addedProductIds = [];

/*describe('Testing products Api', () => {
    it('Список всех товаров (GET)', async () => {
        const response = await request.get("/products");
        assert.isNotEmpty(response.body);
        response.body.forEach(r => {
            let res = productIsValid(r);
            assert.isTrue(res, 'id: ' + r.id + ' - invalid');
        })
    });
});*/

describe('Проверка алиаса', () => {
    it('Добавить продукт с таким же title, будет -0', async () => {
        const addProduct1 = await request.post('/addproduct')
            .send(validProduct1);
        addedProductIds.push(addProduct1.body.id);
        const addProduct2 = await request.post('/addproduct')
            .send(validProduct1);
        addedProductIds.push(addProduct2.body.id);
        const products = await request.get('/products');
        const product = await products.body.find(r => parseInt(r.id) === parseInt(addProduct2.body.id));
        console.log(product);
        assert(product.alias === 'test-test-test10-0')
    });
});

describe('Добавить не валидный продукт', () => {
    /*it('category_id 0 - не добавится',  async () => {
        const response = await request.post('/addproduct')
            .send(categoryId0);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('category_id 16 - не добавится', async () => {
        const response = await request.post('/addproduct')
            .send(categoryId16);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('hit 2 - не добавится', async () => {
        const response = await request.post('/addproduct')
            .send(hit2);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('hit -1 - не добавится', async () => {
        const response = await request.post('/addproduct')
            .send(hitMinus1);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('status 2 - не добавится', async () => {
        const response = await request.post('/addproduct')
            .send(status2);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('status -1 - не добавится', async () => {
        const response = await request.post('/addproduct')
            .send(statusMinus1);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('invalid types - не добавится', async () => {
        const response = await request.post('/addproduct')
            .send(invalidTypes);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });*/
    it('category_id = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.category_id = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('title = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.title = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('alias = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.alias = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('price = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.price = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('old_price = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.old_price = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('status = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.status = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('keywords = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.keywords = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('description = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.description = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
    it('hit = null - не добавиться', async () => {
        const newProduct = {...validProduct1};
        newProduct.hit = null;
        const response = await request.post('/addproduct')
            .send(newProduct);
        addedProductIds.push(response.body.id);
        assert(!await checkExistProductWithId(response.body.id), 'Не валидный продукт c id: ' + response.body.id + ' - добавлен');
    });
});

/*describe('Добавить валидный продукт и удалить', () => {
    const addedProductIds = [];

    it('Валидный продукт - категория 1', async () => {
        const response = await request.post('/addproduct')
            .send(validProduct1);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        addedProductIds.push(response.body.id);
        assert(await checkExistProductWithId(response.body.id), 'Валидный продукт c id: ' + response.body.id + ' - отсутствует');
    });
    it('Валидный продукт - категория 15', async () => {
        const response = await request.post('/addproduct')
            .send(validProduct2);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        addedProductIds.push(response.body.id);
        assert(await checkExistProductWithId(response.body.id), 'Валидный продукт c id: ' + response.body.id + ' - отсутствует');
    });
    it('Валидный продукт - алиас', async () => {
        const response = await request.post('/addproduct')
            .send(validProductAlias);
        addedProductIds.push(response.body.id);
        expect(response.statusCode).to.equal(200);
        addedProductIds.push(response.body.id);
        assert(await checkExistProductWithId(response.body.id), 'Валидный продукт c id: ' + response.body.id + ' - отсутствует');
    });
});

describe('Удалить продукт', () => {
    it('Удалить существущий продукт ', async () => {
        const response = await request.post('/addproduct')
            .send(validProduct1);
        assert(await checkExistProductWithId(response.body.id), 'Валидный продукт c id: ' + response.body.id + ' - отсутствует');
        request.get('/deleteproduct')
            .query({id: response.body.id})
            .expect(200)
            .then(res => {
                assert(res.body.status === 1)
            })
    });
    it('Удалить несуществущий продукт ', async () => {
        request.get('/deleteproduct')
            .query({id: -1})
            .expect(200)
            .then(res => {
                assert(res.body.status === 0)
            })
    });
});

describe('Редактировать продукт', () => {
    it('добавить и отредактировать ', async () => {
        const addedProduct = await request.post('/addproduct')
            .send(validProduct1);
        addedProductIds.push(addedProduct.body.id);
        const edit = {
            id: addedProduct.body.id,
            category_id: 2,
            title: 'тест 4000',
            alias: 'test 5000',
            content: 'content 2',
            price: 500,
            old_price: 100,
            status: 1,
            keywords: 'keyword 2',
            description: 'description 2',
            hit: 1
        }
        const response = await request.post('/editproduct').send(edit);
        const products = await request.get('/products');
        const editProduct = products.body.find(r => parseInt(r.id) === parseInt(addedProduct.body.id));
        assert(parseInt(editProduct.category_id) !== validProduct1.category_id, 'category_id не изменился');
        assert(editProduct.title !== validProduct1.title, 'title не изменился');
        assert(editProduct.alias !== validProduct1.alias, 'alias не изменился');
        assert(editProduct.content !== validProduct1.content, 'content не изменился');
        assert(parseInt(editProduct.price) !== validProduct1.price, 'price не изменился');
        assert(parseInt(editProduct.old_price) !== validProduct1.old_price, 'old_price не изменился');
        assert(parseInt(editProduct.status) !== validProduct1.status, 'status не изменился');
        assert(editProduct.keywords !== validProduct1.keywords, 'keywords не изменился');
        assert(editProduct.description !== validProduct1.description, 'description не изменился');
        assert(parseInt(editProduct.hit) !== validProduct1.hit, 'hit не изменился');
    });
});*/

describe('Очистить все добавленные продукты', () => {
    it('Удалить ', function () {
        console.log(addedProductIds);
        /*addedProductIds.forEach(key => {
            request.get('/deleteproduct').query({id: key})
                .then(r => {})
        });*/
    });
});
