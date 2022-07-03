import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { Button, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const Step2FilesTable = ({ handleChangeSelectedFile,
    onAddFile,
    handleRemoveFile,
    selectedUuid,
    isLoadedViewer,
    uploadedFilesData,
    addSnapshot,
    filesSnapshots,
    triggerResetViewer,
    takeSnapshot

}) => {
    const { t } = useTranslation(["step2"])

    const hiddenFileInput = useRef(null);

    const handleFileSelect = () => {
        hiddenFileInput.current.click();
    };

    const onChangeSelectedFile = (uuid) => {
        handleChangeSelectedFile(uuid)
    }

    const onRemoveFile = (uuid) => {
        console.log(uuid)
        handleRemoveFile(uuid)
    }

    const handleAddFile = (event) =>{
        console.log(selectedUuid)
        if(selectedUuid) takeSnapshot()
        event.persist();
        if(!event.target.value) return
        onAddFile(event.target.files[0])
        hiddenFileInput.current.value = null
    }

    useEffect(() => {
        if (isLoadedViewer) {
            if(filesSnapshots[selectedUuid].snapshotURL) return
            var canvas = document.querySelector("canvas")
            var Pic = canvas?.toDataURL("image/png");
            addSnapshot(selectedUuid, Pic)
            setBlob(Pic)
        }
    }, [isLoadedViewer])

    useEffect(()=>{
        setTimeout(()=>{
            var canvas = document.querySelector("canvas")
            var Pic = canvas?.toDataURL("image/png");
            addSnapshot(selectedUuid, Pic)
        },100)
    },[triggerResetViewer])

    const [blob, setBlob] = useState(null)

    if (!selectedUuid) return <></>
    return (
        <>
            <TableContainer sx={{ height: 'auto', maxHeight: 200, width: '70%' }}>
                <Table stickyHeader sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('image')}</TableCell>
                            <TableCell align="center">{t('file_name')}</TableCell>
                            <TableCell align="center">{t('file_size')}</TableCell>
                            <TableCell align="center">{t('action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadedFilesData.map((fileObj) => (
                            <TableRow
                                key={fileObj.uuid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" onClick={() => onChangeSelectedFile(fileObj.uuid)}>
                                    <img className="model-img" src={filesSnapshots[fileObj.uuid]?.snapshotURL || null} style={{ width: 70, height: 70, objectFit: 'contain', margin: 'auto', display: 'block' }} />
                                </TableCell>
                                <TableCell align="center">{fileObj.fileName}</TableCell>
                                {/* <TableCell align="center">{(fileObj.file.size / 1024 / 1024).toFixed(2)}MB</TableCell> */}
                                <TableCell align="center">{(fileObj.uuid)}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        variant="text"
                                        size="small"
                                        onClick={()=>onRemoveFile(fileObj.uuid)}
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
                // accept=".stl"
                type="file"
                name="file"
                onChange={handleAddFile}
                hidden
                ref={hiddenFileInput}
            />
            <LoadingButton
                endIcon={<CloudUploadIcon />}
                variant="contained"
                color="warn"
                onClick={handleFileSelect}
                loading={false}
            >
                {t("upload_file")}
            </LoadingButton>
        </>
    )
}