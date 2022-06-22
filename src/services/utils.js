export const emailValidation = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return true;
    return false;
};

export const phoneNumberValidation = phoneNumber => {
    if (/05\d{8}\s?$/.test(phoneNumber)) return true;
    return false;
};

export const generateUuid = () =>{
    return Math.random().toString(16).slice(2)

}