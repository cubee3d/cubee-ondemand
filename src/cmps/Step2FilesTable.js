import { useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Step2FilesTable = ({
    handleChangeSelectedFile,
    onAddFile,
    handleRemoveFile,
    selectedUuid,
    isLoadedViewer,
    uploadedFilesData,
    addSnapshot,
    filesSnapshots,
    takeSnapshot,
    isLoading,
    onCalculate,
    isModelLoaded,
    colors,
    printSettings
}) => {
    const { t } = useTranslation(['step2']);
    const hiddenFileInput = useRef(null);

    const handleFileSelect = () => {
        hiddenFileInput.current.click();
    };

    const onChangeSelectedFile = uuid => {
        if (!isModelLoaded) return;
        handleChangeSelectedFile(uuid);
    };

    const onRemoveFile = uuid => {
        handleRemoveFile(uuid);
    };

    const handleAddFile = event => {
        event.persist();
        if (!event.target.value) return;
        onAddFile(event.target.files[0]);
        hiddenFileInput.current.value = null;
    };

    useEffect(() => {
        if (isLoadedViewer) {
            setTimeout(() => {
                if (filesSnapshots[selectedUuid].snapshotURL) return;
                var canvas = document.querySelector('canvas');
                var Pic = canvas?.toDataURL('image/png');
                addSnapshot(selectedUuid, Pic);
            }, 100);
        }
    }, [isLoadedViewer]);

    if (!selectedUuid) return <></>;
    return (
        <>
            <TableContainer 
                sx={{ height: 'auto', maxHeight: 300, width: 950, direction: "ltr", paddingTop: "30px" }}
            >
                <Table
                    stickyHeader
                    sx={{ width: 100}}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow style={{display: "flex", justifyContent: "space-around", fontSize: "13px", width: "900px", border: 0}}>
                            <TableCell style={{border: 0}} >{t('image')}</TableCell>
                            <TableCell style={{border: 0}}> {t('file_name')}</TableCell>
                            {/* <TableCell style={{border: 0}}>{t('color')}</TableCell> */}
                            <TableCell style={{border: 0}}>{t('action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='step2-tbody'>
                        {uploadedFilesData.map(fileObj => (
                            <TableRow
                            
                                className='step2-table'
                                key={fileObj.uuid}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    style={{border: 0}}
                                    className={
                                        selectedUuid === fileObj.uuid
                                            ? 'active-cell model-img-ptr'
                                            : ''
                                    }
                                    align="center"
                                    onClick={() =>
                                        onChangeSelectedFile(fileObj.uuid)
                                    }
                                >
                                    <img
                                        className="model-img-ptr"
                                        src={
                                            filesSnapshots[fileObj.uuid]
                                                ?.snapshotURL || null
                                        }
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: 'contain',
                                            margin: 'auto',
                                            display: 'block',
                                            
                                        }}
                                    />{' '}
                                </TableCell>
                                
                                {fileObj.fileName.length < 20 ? (
                                    <TableCell
                                        style={{border: 0}}
                                        className={
                                            selectedUuid === fileObj.uuid
                                                ? 'active-cell model-img-ptr'
                                                : ''
                                        }
                                        align="center"
                                        onClick={() =>
                                            onChangeSelectedFile(fileObj.uuid)
                                        }
                                    >
                                        {fileObj.fileName}
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        style={{border: 0}}
                                        className={
                                            selectedUuid === fileObj.uuid
                                                ? 'active-cell model-img-ptr'
                                                : ''
                                        }
                                        align="center"
                                        onClick={() =>
                                            onChangeSelectedFile(fileObj.uuid)
                                        }
                                    >
                                        {fileObj.fileName.slice(0, 16)}...
                                        {fileObj.fileName.slice(-3)}
                                    </TableCell>
                                )}
                                <TableCell
                                    style={{border: 0}}
                                    align="center"
                                    
                                    className={
                                        selectedUuid === fileObj.uuid
                                            ? 'active-cell'
                                            : ''
                                    }
                                >
                                    <IconButton
                                        variant="text"
                                        size="small"
                                        onClick={() =>
                                            onRemoveFile(fileObj.uuid)
                                        }
                                        color="blue"
                                    >
                                        <DeleteOutlineIcon className="cart-icon" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <input
                type="file"
                name="file"
                onChange={handleAddFile}
                hidden
                ref={hiddenFileInput}
            />
            <div className="add-continue-btns-cont">
                <LoadingButton
                    variant="contained"                   
                    loading={!(isLoading || isModelLoaded)}
                    endIcon={<DoneIcon />}
                    onClick={onCalculate}
                    loadingPosition="center"
                    style={{color: "white"}}
                >
                    {t('continue')}
                </LoadingButton>
                <LoadingButton
                    endIcon={<AddIcon />}
                    variant="outlined"        
                    onClick={handleFileSelect}
                    loading={!(isLoading || isModelLoaded)}
                    style={{color: "purple" }}
                    color='black'
                >
                    {t('upload_file')}
                </LoadingButton>
               
            </div>
        </>
    );
};
