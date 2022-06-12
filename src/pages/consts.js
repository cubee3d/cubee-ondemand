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
}

export const infillMarks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 100,
        label: '100%',
    }

]

export const resMarks = [
    {
        value: 0.1,
        label: 'גבוהה',
    },
    {
        value: 0.3,
        label: 'נמוכה',
    }

]

export const colors = {
    כחול: '#2410de',
    אדום: '#f44336',
    סגול: '#9c27b0',
    ורוד: '#fb87ff',
    תכלת: '#2196f3',
    ירוק: '#8bc34a',
    צהוב: '#ffeb3b',
    זהב: '#ffc107',
    כתום: '#ff9800',
    חום: '#795548',
    אפור: '#607d8b',
    כסף: '#919191',
    זהב: '#ffab0f',
}

export const initialPrintSettings = {
    material: 'PLA',
    infill: 20,
    resolution: 0.2,
    color: 'חום',
    isSupports: false,
    isVase: false
}

export const steps = ['העלאת קובץ להדפסה', 'הגדרות הדפסה', 'שלח לאישור'];
export const materials = ['ABS', 'PLA', 'PETG', 'Nylon', 'TPU']
export const popovers = {
    material: 'הפלסטיק הסטנדרטי הוא PLA. ה-PETG ו-ABS עמידים יותר, ו-TPU הינו חומר גמיש',
    infill: 'אחוז המילוי קובע את משקל וחוזק המודל, הסטנדרט הינו 20%',
    res: 'הרזולוציה משפיעה על זמן ההדפסה וגימור המוצר - גובה שכבה נמוך יותר יעזור למוצר אסתטי יותר',
    vase: 'אם המוצר הינו עציץ/אגרטל - ניתן להדפיס במצב חסכוני בעל גימור נקי',
    support: 'אם חלק מהמודל מודפס באוויר, כנראה שיידרשו תמיכות'
}