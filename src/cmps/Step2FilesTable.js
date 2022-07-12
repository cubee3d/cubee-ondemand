import { useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import { useTranslation } from 'react-i18next';

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
                sx={{ height: 'auto', maxHeight: 200, width: '70%' }}
            >
                <Table
                    stickyHeader
                    sx={{ minWidth: 400 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('image')}</TableCell>
                            <TableCell align="center">
                                {t('file_name')}
                            </TableCell>
                            <TableCell align="center">{t('action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadedFilesData.map(fileObj => (
                            <TableRow
                                key={fileObj.uuid}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    className={
                                        selectedUuid === fileObj.uuid
                                            ? 'active-cell'
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
                                            width: 70,
                                            height: 70,
                                            objectFit: 'contain',
                                            margin: 'auto',
                                            display: 'block',
                                        }}
                                    />{' '}
                                </TableCell>
                                {fileObj.fileName.length < 20 ? (
                                    <TableCell
                                        className={
                                            selectedUuid === fileObj.uuid
                                                ? 'active-cell'
                                                : ''
                                        }
                                        align="center"
                                    >
                                        {fileObj.fileName}
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        className={
                                            selectedUuid === fileObj.uuid
                                                ? 'active-cell'
                                                : ''
                                        }
                                        align="center"
                                    >
                                        {fileObj.fileName.slice(0, 16)}...
                                        {fileObj.fileName.slice(-3)}
                                    </TableCell>
                                )}
                                <TableCell
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
                                        <DeleteForeverIcon className="cart-icon" />
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
                    endIcon={<CloudUploadIcon />}
                    variant="contained"
                    color="warn"
                    onClick={handleFileSelect}
                    loading={!(isLoading || isModelLoaded)}
                >
                    {t('upload_file')}
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    color="warn"
                    loading={!(isLoading || isModelLoaded)}
                    endIcon={<ThreeDRotationIcon />}
                    onClick={onCalculate}
                    loadingPosition="center"
                >
                    {t('continue')}
                </LoadingButton>
            </div>
        </>
    );
};
