import mbHelper from './mountebankHelper.js';
import settings from './settings.js';

// curl localhost:5001/currencies
function addService() {
    const RUB = {
        "relationship" : {
            EUR: 0.012,
            USD: 0.014
        }
    };
    const EUR = {
        "relationship" : {
            RUB: 83.49,
            USD: 1.13
        }
    };
    const USD = {
        "relationship" : {
            EUR: 0.89,
            RUB: 74.13
        }
    };

    const currencies = {
        RUB,
        EUR,
        USD
    }

    const stubs = [
        {
            predicates: [{
                equals: {
                    method: "GET",
                    path: "/currencies"
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(currencies)
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "GET",
                    path: "/currencies/RUB"
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(RUB)
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "GET",
                    path: "/currencies/EUR"
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(EUR)
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "GET",
                    path: "/currencies/USD"
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(USD)
                    }
                }
            ]
        },
        {
            responses: [
                {
                    is: {
                        statusCode: 404,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify("Route not found")
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.currencyServicePort,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

export default { addService };