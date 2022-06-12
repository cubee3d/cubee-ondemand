import { useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const StepWelcomeFile = ({ onFileSelect, isLoading, apiKey }) => {
    const hiddenFileInput = useRef(null);

    const handleFileSelect = () => {
        hiddenFileInput.current.click();
    };

    return (
        <>
            <h2>צריכים שירותי הדפסה בתלת מימד? הגעתם למקום הנכון</h2>
            <p>
                מוזמנים להעלות את הקובץ שלכם ומיד נעבור לבחירת הגדרות הדפסה{' '}
                <br /> לאחר מכן, הקובץ ישלח לאישור וניצור קשר טלפונית לביצוע
                הזמנה
            </p>
            <input
                accept=".stl"
                type="file"
                name="file"
                onChange={onFileSelect}
                hidden
                ref={hiddenFileInput}
            />
            <LoadingButton
                endIcon={<CloudUploadIcon />}
                variant="contained"
                color="warn"
                onClick={handleFileSelect}
                loading={isLoading}
                disabled={!Boolean(apiKey)}
            >
                העלאת קובץ להדפסה
            </LoadingButton>
        </>
    );
};
