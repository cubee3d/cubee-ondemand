import httpService from './httpService';

export default {
    uploadFileToCubee,
    calculateSlicer,
    getShopOptions,
    getShippingPrice,
    createNewPaymentIntent,
    createOrder,
};

function getShopOptions(apiKey) {
    return httpService.get('store/options', null, apiKey);
}

function uploadFileToCubee(file, apiKey) {
    return httpService.postFile('file/upload', file, apiKey);
}
function calculateSlicer(printSettingsObj, apiKey) {
    return httpService.post('file/calc', printSettingsObj, apiKey);
}

function getShippingPrice(currencyCode, totalPrice, apiKey) {
    return httpService.post("payment/shipping", {
        "currencyCode" : currencyCode,
        "totalPrice" : totalPrice,
    }, apiKey);
}

function createNewPaymentIntent(amount, currency, email, apiKey) {
    return httpService.get(`payment/client-secret?price=${amount}&currency=${currency}&email=${email}`,
        null,
        apiKey
    );
}

async function createOrder(data, apiKey) {
    return httpService.post(`payment`,
        data,
        apiKey
    );
}
