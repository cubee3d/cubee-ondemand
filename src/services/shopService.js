import httpService from './httpService';

export default {
    getAllProducts,
    getShippingMethods,
    createNewPaymentIntent,
    getUserAddressGeocode,
    createNewOrder,
    getOrder,
    getUserOrders,
    getProduct,
    getUserFromBearer,
    getUserShop,
    getSpots,
    checkIP,
    notifySubscribe,
    getAllProductsV2,
    uploadFileToCubee,
    calculateSlicer,
    submitPrintOrder
};

async function submitPrintOrder(orderObj){
    // return await httpService.postOrder(orderObj)
    return {
        orderId: '43256'
    }
}

async function uploadFileToCubee(file, apiKey) {
    // return await httpService.postFile(file, apiKey)
    return {
        data: "4d1649aa-2756-4efb-ab72-0c5a84de63da"
    }
}
async function calculateSlicer(printSettingsObj) {
    // return await httpService.postCalculate(printSettingsObj)
    return {
        "printTime": 4.82,
        "weight": 50.7,
        "price": 24.08,
        "dimensions": {
            "height": 99.0,
            "width": 51.0,
            "length": 58.0
        }
    }
}

async function notifySubscribe(userCreds) {
    return await httpService.post('club/notify', userCreds);
}

async function getUserOrders(page, token) {
    // const orders = await firestoreService.getUserOrders(firestoreUID);
    const orders = await httpService.get(
        `club/order?page=${page - 1}`,
        null,
        token
    );
    return orders;
}

async function getUserShop(token) {
    const shop = await httpService.get('store', null, token);
    return shop;
}

async function getProduct(productId) {
    return await httpService.get(`club/${productId}`);
}

async function getOrder(orderId, token) {
    // const orderObj = await firestoreService.getOrder(orderId);
    // const orderStatus = await httpService.get(`shop/status/${wooId}`)
    const order = await httpService.get(`club/order/${orderId}`, null, token);
    return order;
}

async function createNewOrder(orderObj, token) {
    const order = await httpService.post(`club`, orderObj, token);
    return order;
}

async function getAllProducts(queryObj) {
    const { categoryId, perPage, currentPage, search } = queryObj;
    return await httpService.get(
        `club/?categoryId=${categoryId}&pageSize=${perPage}&page=${currentPage}`
    );
}

async function getAllProductsV2(queryObj) {
    const { categoryId, perPage, currentPage, search } = queryObj;
    if (search) {
        return await httpService.get(
            `club/search?categoryId=${categoryId}&pageSize=${perPage}&page=${currentPage - 1
            }&keyword=${search}`
            // `club/search?keyword=pla`
        );
    }
    return await httpService.get(
        `club/search?categoryId=${categoryId}&pageSize=${perPage}&page=${currentPage - 1
        }`
    );
}

async function createNewPaymentIntent(amount, token) {
    return await httpService.get(
        `payment/client-secret?price=${amount}&currency=ILS`,
        null,
        token
    );
}

async function getSpots() {
    return await httpService.get(`club/spots`);
}

async function getShippingMethods() {
    return await httpService.get('club/shipping');
}

async function getUserAddressGeocode(address) {
    return await httpService.get(`club/geocode?address=${address}`);
}

async function getUserFromBearer(token) {
    return await httpService.get('user/me', null, token);
}

async function checkIP() {
    return await httpService.get('geo');
}
