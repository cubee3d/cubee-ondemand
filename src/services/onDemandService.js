import httpService from './httpService';

export default {
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
    return await httpService.post('ssupload',file, apiKey)
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

