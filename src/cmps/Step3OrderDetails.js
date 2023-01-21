/* global StlViewer */

import React, { useEffect, useState, useContext } from 'react';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const Step3OrderDetails = ({
    filesSlicedInfo,
    onPrevStep,
    onSubmitPrintOrder,
    isLoading,
    currencyCode,
    isCheckoutMode,
    onCheckout,
}) => {
    const { language } = useContext(LanguageContext);
    const { t } = useTranslation(['step3']);
    const [orderComment, setOrderComment] = useState('');

    const [total, setTotal] = useState();

    useEffect(() => {
        let totalPrice = 0;
        filesSlicedInfo.forEach(file => {
            totalPrice += Math.ceil(file.price) * file.copies;
        });
        setTotal(totalPrice);
    }, []);

    // const handleChangeContact = e => {
    //     e.persist();
    //     const target = e.target.name;
    //     const value = e.target.value;
    //     setContactForm(prevForm => {
    //         return { ...prevForm, [target]: value };
    //     });
    // };

    const handleChangeComment = e => {
        e.persist();
        setOrderComment(e.target.value);
    };

    return (
        <>
            <h2>{t('print_conc')}</h2>
            <TableContainer
                sx={{ height: 'auto', maxHeight: 800, width: '100%' }}
            >
                <Table
                className='tablon'
                    stickyHeader
                    sx={{ minWidth: 400 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell width={'5%'} align="center">
                                {t('image')}
                            </TableCell>
                            <TableCell width={'20%'} align="center">
                                {t('file_name')}
                            </TableCell>
                            <TableCell width={'15%'} align="center">
                                {t('dimensions')}
                            </TableCell>
                            <TableCell width={'20%'} align="center">
                                {t('EPT')}
                            </TableCell>
                            <TableCell align="center">{t('EW')}</TableCell>
                            <TableCell align="center">{t('EPU')}</TableCell>
                            <TableCell align="center">{t('EP')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filesSlicedInfo.map(file => (
                            <TableRow
                                key={file.fileId}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="center">
                                    <img
                                        className="model-img"
                                        src={file.snapshotURL}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            objectFit: 'contain',
                                            margin: 'auto',
                                            display: 'block',
                                        }}
                                    />{' '}
                                </TableCell>
                                {file.fileName.length < 21 ? (
                                    <TableCell align="center">
                                        {file.fileName}
                                    </TableCell>
                                ) : (
                                    <TableCell align="center">
                                        {file.fileName.slice(0, 16)}...
                                        {file.fileName.slice(-3)}
                                    </TableCell>
                                )}
                                <TableCell align="center">
                                    {file.dimensions.height}x
                                    {file.dimensions.width}x
                                    {file.dimensions.length}
                                    {t('mm')}
                                </TableCell>
                                <TableCell align="center">
                                    {Math.floor(file.printTime) > 0 &&
                                        Math.floor(file.printTime)}{' '}
                                    {Math.floor(file.printTime) > 0 &&
                                        t('hours')}
                                    {Math.floor(file.printTime) > 0 && ','}
                                    {Math.floor(
                                        Number(
                                            (
                                                file.printTime -
                                                Math.floor(file.printTime)
                                            ).toFixed(2)
                                        ) * 60
                                    )}{' '}
                                    {t('minutes')}
                                </TableCell>
                                <TableCell align="center">
                                    {file.weight} {t('gram')}
                                </TableCell>
                                <TableCell align="center">
                                    {t(currencyCode)}
                                    {Math.ceil(file.price)}
                                </TableCell>
                                {file.copies > 1 ? (
                                    <TableCell align="center">
                                        {file.copies} {t('units')}:{' '}
                                        {t(currencyCode)}
                                        {Math.ceil(file.price) * file.copies}
                                    </TableCell>
                                ) : (
                                    <TableCell align="center">
                                        {t(currencyCode)}
                                        {Math.ceil(file.price)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h2>
                {t('total')}: {t(currencyCode)}
                {total}
            </h2>
            <div className="cta-btns-cont">
                <Button
                    startIcon={
                        language.lang === 'en' ? (
                            <ArrowBackIosIcon />
                        ) : (
                            <ArrowForwardIosIcon />
                        )
                    }
                    onClick={onPrevStep}
                >
                    {t('change_settings')}
                </Button>

                {!isCheckoutMode && <LoadingButton
                    variant="contained"
                    color="blue"
                    className="whiteText"
                    loading={isLoading}
                    endIcon={<ViewInArRoundedIcon/>}
                    onClick={onSubmitPrintOrder}
                >
                    {t('send_for_confirm')}
                </LoadingButton>}

                {isCheckoutMode && <LoadingButton
                    variant="contained"
                    color="blue"
                    className="whiteText"
                    loading={isLoading}
                    endIcon={<ViewInArRoundedIcon/>}
                    onClick={() => onCheckout(total)}
                >
                    {t('checkout')}
                </LoadingButton>}
                <div className="btn-placeholder"></div>
            </div>
        </>
    );
};
