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
    uploadedFiles,
    onAddFile,
    handleRemoveFile,
    selectedUuid,
    isLoadedViewer
}) => {
    const { t } = useTranslation(["step2"])

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const hiddenFileInput = useRef(null);

    const handleFileSelect = () => {
        hiddenFileInput.current.click();
    };

    const onChangeSelectedFile = (uuid) => {
        handleChangeSelectedFile(uuid)
    }

    const onRemoveFile = (uuid) => {
        handleRemoveFile(uuid)
    }

    useEffect(() => {
        if (isLoadedViewer) {
            var canvas = document.querySelector("canvas")
            var Pic = canvas.toDataURL("image/png");
            setBlob(Pic)
        }
    }, [isLoadedViewer])

    const [blob, setBlob] = useState(null)


    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24),
        createData('Cupcake', 305, 3.7, 67),
        createData('Gingerbread', 356, 16.0, 49),
        // createData('Frozen yoghurt', 159, 6.0, 24),
        // createData('Cupcake', 305, 3.7, 67),
        // createData('Gingerbread', 356, 16.0, 49),
    ];
    if (!selectedUuid) return <></>
    return (
        <>
            <TableContainer sx={{ height: 'auto', maxHeight: 200, width: '80%' }}>
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
                        {uploadedFiles.map((fileObj) => (
                            <TableRow
                                key={fileObj.uuid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" onClick={() => onChangeSelectedFile(fileObj.uuid)}>
                                    <img src={blob} style={{ width: 70, height: 70, objectFit: 'contain', margin: 'auto', display: 'block' }} />
                                </TableCell>
                                <TableCell align="center">{fileObj.file.name}</TableCell>
                                {/* <TableCell align="center">{(fileObj.file.size / 1024 / 1024).toFixed(2)}MB</TableCell> */}
                                <TableCell align="center">{(fileObj.uuid)}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        variant="text"
                                        size="small"
                                        onClick={onRemoveFile}
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
                onChange={onAddFile}
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