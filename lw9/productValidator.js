import { Product } from './product.js';

/**
 * @param {Product} product
 * @returns {{hit: boolean, category_id: boolean, keywords: boolean, price: boolean, old_price: boolean, alias: (boolean|boolean), description: boolean, id: boolean, title: boolean, content: boolean, status: boolean}}
 */
function productFieldsValidator(product) {
    return  {
        id: typeof product.id === 'number',
        category_id: typeof product.category_id === 'number' && product.category_id >= 1 && product.category_id <= 15,
        title: typeof product.title === 'string',
        alias: typeof product.title === 'string' ? typeof product.alias === 'string' : true,
        content: typeof product.content === 'string',
        price: typeof product.price === 'number',
        old_price: typeof product.old_price === 'number',
        status: product.status === 0 || product.status === 1,
        keywords: typeof product.keywords === 'string',
        description: typeof product.description === 'string',
        hit: product.hit === 0 || product.hit === 1,
    }
}

/**
 * @param {Product} product
 * @returns {boolean}
 */
function productIsValid(product)
{
    const res = productFieldsValidator(product);
    for (let key in res) {
        if (!res[key]) {
            return false;
        }
    }
    return true;
}

/*
var obj = {a:1, b:2, c:3};
for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}
// Выведет:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
 */

export default { productFieldsValidator, productIsValid };