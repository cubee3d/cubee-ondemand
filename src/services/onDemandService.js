import httpService from './httpService';

export default {
    uploadFileToCubee,
    calculateSlicer,
    getShopOptions,
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

function createNewPaymentIntent(amount, currency, email, apiKey) {
    return httpService.get(`payment/client-secret?price=${amount}&currency=${currency}&email=${email}`,
        null,
        apiKey
    );
}

async function createOrder(totalPrice, currencyCode, email, paymentId, apiKey) {
    return true;
}
