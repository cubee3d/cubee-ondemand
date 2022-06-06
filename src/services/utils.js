export const emailValidation = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return true;
    return false;
};

export const phoneNumberValidation = phoneNumber => {
    if (/05\d{8}\s?$/.test(phoneNumber)) return true;
    return false;
};

export const passwordValidation = password => {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/.test(password)) return true;
    return false;
};

export const cleanDescription = desc => {
    const regex = /href="https:\/\/promaker\.co\.il.*"/g;
    const regex2 = /promaker /gim;
    desc = desc.replace(
        regex,
        'href="https://cubee-club.staging.cubee3d.com/"'
    );
    desc = desc.replace('רק ב- ProMaker', 'אצלנו ב - Cubee-Club');
    desc = desc.replace(regex2, 'Cubee-Club ');
    desc = desc.replace('בProMaker', 'ב-Cubee-Club')
    return desc;
};

export const nameValidation = name => {
    const arr = name.split(' ');
    if (arr.length < 2) return false;
    let isValid = true;
    for (const word of arr) {
        if (word.length < 2) isValid = false;
    }
    return isValid;
};

export const getGreet = () => {
    let date = new Date();
    let hours = date.getHours();
    switch (true) {
        case hours >= 6 && hours <= 10:
            return 'בוקר טוב, ';
        case hours >= 11 && hours <= 16:
            return 'צהריים טובים, ';
        case hours >= 16 && hours <= 18:
            return 'אחר-הצהריים טובים, ';
        case hours >= 19 && hours <= 21:
            return 'ערב טוב, ';
        default:
            return 'לילה טוב, ';
    }
};

export const handleAuthErrors = errorMsg => {
    if (errorMsg.includes('user-not-found'))
        return 'כתובת המייל לא רשומה, יש להירשם לפני התחברות';
    if (errorMsg.includes('wrong-password')) return 'סיסמה שגויה, נא לנסות שוב';
};
