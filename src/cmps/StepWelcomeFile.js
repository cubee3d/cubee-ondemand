import { useEffect, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

export const StepWelcomeFile = ({ onFirstFileSelect, isLoading, apiKey }) => {
    const { t } = useTranslation(['step1']);
    const hiddenFileInput = useRef(null);

    const handleFileSelect = () => {
        hiddenFileInput.current.click();
    };

    useEffect(() => {
        // window.parent.postMessage({hello:'Hello'}, 'http://localhost/')
    }, []);

    return (
        <>
            <h2 style={{paddingTop: 70}}>
                {t('intro_title')}
            </h2>
            <p>
                {t('intro_p1')}
                <br />
                {t('intro_p2')}
            </p>
            <input
                type="file"
                name="file"
                onChange={onFirstFileSelect}
                hidden
                ref={hiddenFileInput}
            />
            <LoadingButton
                endIcon={<ViewInArOutlinedIcon />}
                variant="contained"
                onClick={handleFileSelect}
                loading={isLoading}
                disabled={!Boolean(apiKey)}
                style={{color: "white"}}
            >
                {t('upload_file')}
            </LoadingButton>
        </>
    );
};
