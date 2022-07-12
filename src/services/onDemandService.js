import httpService from './httpService';

export default {
    uploadFileToCubee,
    calculateSlicer,
    getShopOptions,
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
