export class Product {
    /** @type {number} */
    id;
    /** @type {number} */
    category_id;
    /** @type {string} */
    title;
    /** @type {string} */
    alias;
    /** @type {string} */
    content;
    /** @type {number} */
    price;
    /** @type {number} */
    old_price;
    /** @type {number} */
    status;
    /** @type {string} */
    keywords;
    /** @type {string} */
    description;
    /** @type {number} */
    hit;

    constructor(options) {
        this.id = parseInt(options.id);
        this.category_id = parseInt(options.category_id)
        this.title = options.title
        this.alias = options.alias
        this.content = options.content
        this.price = parseInt(options.price)
        this.old_price = parseInt(options.old_price)
        this.status = parseInt(options.status)
        this.keywords = options.keywords
        this.description = options.description
        this.hit = parseInt(options.hit)
    }
}