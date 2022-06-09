import React, { useEffect, useRef, useState, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { StlViewer } from 'react-stl-viewer';

export const Test = () => {
    // const [stlViewerColor, setStlViewerColor] = useState(colors[initialPrintSettings.color])
    const [selectedFile, setSelectedFile] = useState(null);

    const hiddenFileInput = useRef(null)
    const style = {
        top: 0,
        left: 0,
        width: '600px',
        height: '650px',
    }
    const onFileSelect = async (event) => {

        event.persist()
        const filer = event.target.files[0]
        setSelectedFile(filer);
        //חשבתי שהבעיה היא שזה לא מספיק לטעון את הקובץ בסטייט לפני שהוא מעלה את התצוגה
        //אז ניסיתי להוסיף את הטיימאאוט למטה, אבל זה לא עזר. גם לא ב10 שניות
    };
    const handleFileSelect = () => {
        setSelectedFile(null)
        hiddenFileInput.current.click()
    };

    return (
        <>
            <input accept=".stl" type='file' name='file' onChange={onFileSelect} hidden ref={hiddenFileInput} />
            <LoadingButton endIcon={<CloudUploadIcon />}
                variant='contained'
                color='warn'
                onClick={handleFileSelect}
                // loading={isLoading}
                // disabled={!Boolean(apiKey)}
            >
                העלאת קובץ להדפסה
            </LoadingButton>
            {
                selectedFile &&
                <div>
                    <StlViewer
                        style={style}
                        file={selectedFile}
                        // color={stlViewerColor}
                        onError={console.log}
                        onFinishLoading={console.log}
                    />
                </div>
            }
        </>
    )
}