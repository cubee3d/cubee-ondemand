import httpService from './httpService';

export default {
    uploadFileToCubee,
    calculateSlicer,
    submitPrintOrder,
};

function submitPrintOrder(orderObj) {
    // return httpService.postOrder(orderObj)
    return {
        orderId: '43256',
    };
}

function uploadFileToCubee(file, apiKey) {
    return httpService.postFile('upload',file, apiKey)
    return {
        data: '4d1649aa-2756-4efb-ab72-0c5a84de63da',
    };
}
function calculateSlicer(printSettingsObj, apiKey) {
    return httpService.post('calc', printSettingsObj, apiKey)
    return {
        printTime: 4.82,
        weight: 50.7,
        price: 24.08,
        dimensions: {
            height: 99.0,
            width: 51.0,
            length: 58.0,
        },
    };
}
