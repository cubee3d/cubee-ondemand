export const prettoSliderSettings = {
    color: '#007CFF',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#007CFF',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
};

export const infillMarks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 100,
        label: '100%',
    },
];

export const resMarks = {
    en: [
        {
            value: 0.3,
            label: 'Low',
        },
        {
            value: 0.1,
            label: 'High',
        },
      
    ],
    heb: [
        {
            value: 0.3,
            label: 'נמוכה',
        },
        {
            value: 0.1,
            label: 'גבוהה',
        },
  
    ],
    de: [
        {
            value: 0.3,
            label: 'Low',
        },
        {
            value: 0.1,
            label: 'High',
        },

    ],
};

export const colors = {
    כחול: '#2410de',
    אדום: '#f44336',
    סגול: '#9c27b0',
    ורוד: '#fb87ff',
    תכלת: '#2196f3',
    ירוק: '#8bc34a',
    צהוב: '#ffeb3b',
    לבן: '#ffffff',
    כתום: '#ff9800',
    חום: '#795548',
    אפור: '#607d8b',
    'לא משנה': '#626262',   
    Any: '#626262',
    כסף: '#919191',
    זהב: '#ffab0f',
};

export const initialPrintSettings = {
    material: 'PLA',
    infill: 20,
    resolution: 0.2,
    color: 'Any',
    isSupports: true,
    isVase: false,
    copies: 1,
};

export const materialsMap = {
    12: 'ABS',
    13: 'PLA',
    1170: 'TPU',
    1171: 'PETG',
    1172: 'Nylon',
    1173: 'Resin',
    1174: 'High Temp Resin',
    1175: 'Flexible Resin',
    57012: 'Polycarbonate',
};

export const colorsMap = {
    3: {
        heb: 'אדום',
        en: 'Red',
        de: 'Red',
        hexCode: '#f44336',
    },
    4: {
        heb: 'לבן',
        en: 'White',
        de: 'White',
        hexCode: '#ffffff',
    },
    5: {
        heb: 'כחול',
        de: 'Blue',
        en: 'Blue',
        hexCode: '#2410de',
    },
    6: {
        heb: 'צהוב',
        de: 'Yellow',
        en: 'Yellow',
        hexCode: '#ffeb3b',
    },
    7: {
        heb: 'סגול',
        de: 'Purple',
        en: 'Purple',
        hexCode: '#9c27b0',
    },
    8: {
        heb: 'שחור',
        en: 'Black',
        de: 'Black',
        hexCode: '#1a1918',
    },
    9: {
        heb: 'כתום',
        en: 'Orange',
        de: 'Orange',
        hexCode: '#ff9800',
    },
    10: {
        heb: 'לא משנה',
        en: 'Any',
        de: 'Any',
        hexCode: '#626262',
    },
    11: {
        heb: 'ירוק',
        en: 'Green',
        de: 'Green',
        hexCode: '#8bc34a',
    },
    228: {
        heb: 'אפור',
        en: 'Gray',
        de: 'Gray',
        hexCode: '#607d8b',
    },
    16253: {
        heb: 'כחול כהה',
        en: 'Dark Blue',
        de: 'Dark Blue',
        hexCode: '#000099',
    },
    16254: {
        heb: 'נחושת',
        en: 'Brass',
        de: 'Brass',
        hexCode: '#b87333',
    },
    16255: {
        heb: 'ורוד',
        de: 'Pink',
        hexCode: '#fb87ff',
    },
    16256: {
        heb: "מג'נטה",
        en: 'Magenta',
        de: 'Magenta',
        hexCode: '#ff00ff',
    },
    16257: {
        heb: 'חום',
        en: 'Brown',
        de: 'Brown',
        hexCode: '#795548',
    },
    16258: {
        heb: 'שקוף',
        en: 'Transparent',
        de: 'Transparent',
        hexCode: '#e3e1e1',
    },
    16259: {
        heb: 'ציאן',
        en: 'Cyan',
        de: 'Cyan',
        hexCode: '#00ffff',
    },
    150484: {
        heb: 'זהב',
        en: 'Gold',
        de: 'Gold',
        hexCode: '#DAA520',
    },
    150492: {
        heb: 'כסף',
        en: 'Silver',
        de: 'Silver',
        hexCode: '#C0C0C0',
    },
    125611: {
        heb: 'ורוד בהיר',
        en: 'Light Pink',
        de: 'Light Pink',
        hexCode: '#f2c9de',
    },
};

// export const steps = ['העלאת קובץ להדפסה', 'הגדרות הדפסה', 'שלח לאישור'];
export const steps = ['Upload File', 'Print Settings', 'Summary','Shipping','Check-Out'];
export const materials = ['ABS', 'PLA', 'PETG', 'TPU'];
export const popovers = {
    heb: {
        material:
            'הפלסטיק הסטנדרטי הוא PLA. ה-PETG ו-ABS עמידים יותר, ו-TPU הינו חומר גמיש',
        infill: 'אחוז המילוי קובע את משקל וחוזק המודל, הסטנדרט הינו 20%',
        res: 'הרזולוציה משפיעה על זמן ההדפסה וגימור המוצר - גובה שכבה נמוך יותר יעזור למוצר אסתטי יותר',
        vase: 'אם המוצר הינו עציץ/אגרטל - ניתן להדפיס במצב חסכוני בעל גימור נקי',
        support: 'אם חלק מהמודל מודפס באוויר, כנראה שיידרשו תמיכות',
    },
    en: {
        material:
            'The standard is PLA. ABS & PETG are more tough, and TPU is flexible material',
        infill: 'Infill density determines the weight and strength of the model. standard is 20%',
        res: 'Resolution affects the finish of the print, lower layer height - higher resolution',
        vase: 'If the model is a vase, Vase mode will give a more solid and beautiful result',
        support:
            'If a partf of the model is printing "on air", supports are needed.',
    },
    de: {
        material:
            'The standard is PLA. ABS & PETG are more tough, and TPU is flexible material',
        infill: 'Infill density determines the weight and strength of the model. standard is 20%',
        res: 'Resolution affects the finish of the print, lower layer height - higher resolution',
        vase: 'If the model is a vase, Vase mode will give a more solid and beautiful result',
        support:
            'If a partf of the model is printing "on air", supports are needed.',
    },
};

export const materialIds = {
    PLA: 13,
    ABS: 12,
    PETG: 1171,
    TPU: 1170,
    NYLON: 1172,
};
