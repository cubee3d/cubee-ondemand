import { useEffect, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';

export const StepWelcomeFile = ({ onFirstFileSelect, isLoading, apiKey }) => {
    const { t } = useTranslation(["step1"])
    const hiddenFileInput = useRef(null);
    const handleFileSelect = () => {
        hiddenFileInput.current.click();
    };

    useEffect(()=>{
        setTimeout(()=>{

            var event = new CustomEvent('myCustomEvent', { detail: data })
            window.parent.document.dispatchEvent(event)
        },3000)
    })


    return (
        <>
            <h2>{t("intro_title")}</h2>
            <p>
                {t("intro_p1")}
                <br />
                {t("intro_p2")}
            </p>
            <input
                // accept=".stl"
                type="file"
                name="file"
                onChange={onFirstFileSelect}
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
                {t("upload_file")}
            </LoadingButton>
        </>
    );
};
