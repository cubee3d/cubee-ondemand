/* global StlViewer */

import React, { useEffect, useRef, useState, useContext } from 'react';
import { Button, Tooltip, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ViewerLoader } from './ViewerLoader';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const Step3OrderDetails = ({
    cubeeFileIdName,
    slicedInfo,
    onPrevStep,
    selectedFile,
    stlViewerColor,
    setContactForm,
    contactForm,
    copies,
    onSubmitPrintOrder,
    uploadedFiles,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { language, setLanguage } = useContext(LanguageContext);
    const { t } = useTranslation(['step4']);
    const [miniStlViewer, setMiniStlViewer] = useState(null);
    const miniDivRef = useRef(null);
    const [isLoadedViewer, setIsLoadedViewer] = useState(false);
    const [orderComment, setOrderComment] = useState('');
    const onModelLoaded = stlViewer1 => {
        setIsLoadedViewer(true);
        setMiniStlViewer(stlViewer1);
        setTimeout(() => {
            var canvas = document.querySelector('canvas');
            var Pic = canvas.toDataURL('image/png');
            setBlob(Pic);
        }, 2000);
    };

    useEffect(() => {
        const stlViewer1 = new StlViewer(miniDivRef.current, {
            canvas_width: '100%',
            canvas_height: '100%',
            model_loaded_callback: () => onModelLoaded(stlViewer1),
        });
        stlViewer1.add_model({
            local_file: selectedFile.file,
            color: stlViewerColor,
            animation: {
                delta: {
                    rotationx: 1,
                    rotationy: 1.1,
                    rotationz: 1.2,
                    msec: 10000,
                    loop: true,
                },
            },
        });
        return () => console.log('unmount debug');
    }, []);

    const miniStyle = {
        top: 0,
        left: 0,
        width: '300px',
        height: '350px',
        numWidth: 300,
        numHeight: 350,
    };

    const handleChangeContact = e => {
        e.persist();
        const target = e.target.name;
        const value = e.target.value;
        setContactForm(prevForm => {
            return { ...prevForm, [target]: value };
        });
    };
    const handleChangeComment = e => {
        e.persist();
        setOrderComment(e.target.value);
    };

    const [blob, setBlob] = useState(null);

    return (
        <>
            <h2>{t('print_conc')}</h2>
            <div className="data-viewer-cont">
                <div
                    className="data"
                    style={{
                        textAlign: language.lang == 'heb' ? 'right' : 'left',
                    }}
                >
                    {cubeeFileIdName.fileName.length > 15 ? (
                        <Tooltip title={cubeeFileIdName.fileName} arrow>
                            <h3>
                                {t('file_name')}
                                {cubeeFileIdName.fileName.slice(0, 12)}
                                ...stl
                            </h3>
                        </Tooltip>
                    ) : (
                        <h3>
                            {t('file_name')} {cubeeFileIdName.fileName}
                        </h3>
                    )}
                    <h3>
                        {t('dimensions')} {slicedInfo.dimensions.height}x
                        {slicedInfo.dimensions.width}x
                        {slicedInfo.dimensions.length} {t('mm')}
                    </h3>
                    <h3>
                        {t('EPT')} {Math.floor(slicedInfo.printTime)}{' '}
                        {t('hours')},{' '}
                        {Math.floor(
                            Number(
                                (
                                    slicedInfo.printTime -
                                    Math.floor(slicedInfo.printTime)
                                ).toFixed(2)
                            ) * 60
                        )}{' '}
                        {t('minutes')}
                    </h3>
                    <h3>
                        {t('EW')} {slicedInfo.weight} {t('gram')}
                    </h3>
                    {copies == 1 ? (
                        <>
                            <h2>
                                {t('EP')} ₪{Math.ceil(slicedInfo.price)}
                            </h2>
                        </>
                    ) : (
                        <>
                            <h2>
                                {t('EPU')} ₪{Math.ceil(slicedInfo.price)}
                            </h2>
                            <h2>
                                {t('EPriceT')}
                                {copies} {t('units')}: ₪
                                {Math.ceil(slicedInfo.price) * copies}
                            </h2>
                        </>
                    )}
                </div>
                <div
                    className="mini-viewer-cont"
                    style={{ position: 'relative' }}
                >
                    {!isLoadedViewer && <ViewerLoader />}
                    <div
                        className="minidiv"
                        style={miniStyle}
                        ref={miniDivRef}
                    />
                </div>
            </div>
            {/* <img src={blob} style={{width: 200, height: 200, objectFit: 'contain'}} /> */}
            {/* <div>
                <h2>פרטים ליצירת קשר:</h2>
                <div className="address-form">
                    <div className="left-fields">
                        <div className="form-field">
                            <span>שם מלא:</span>
                            <TextField
                                placeholder="אסי ישראלי"
                                required
                                name="name"
                                color="primary"
                                value={contactForm.name}
                                onChange={handleChangeContact}
                            />
                        </div>
                        <div className="form-field">
                            <span>אימייל: </span>
                            <TextField
                                placeholder="Asi123@gmail.com"
                                required
                                color="primary"
                                name="email"
                                value={contactForm.email}
                                onChange={handleChangeContact}
                            />
                        </div>
                    </div>
                    <div className="right-fields">
                        <div className="form-field">
                            <span>מספר טלפון: </span>
                            <TextField
                                placeholder="05X-XXXXXXXX"
                                required
                                color="primary"
                                name="phoneNumber"
                                value={contactForm.phoneNumber}
                                onChange={handleChangeContact}
                            />
                        </div>
                        <div className="form-field">
                            <span>הערות מיוחדות: </span>
                            <TextField
                                color="primary"
                                className="textarea-field"
                                placeholder="הערות \ בקשות מיוחדות"
                                name="comment"
                                value={orderComment}
                                onChange={handleChangeComment}
                            />
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="cta-cont">
                <Button
                    // endIcon={language.lang === 'heb' ? <ArrowForwardIosIcon /> : <></>}
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

                <LoadingButton
                    variant="contained"
                    color="blue"
                    className="whiteText"
                    loading={isLoading}
                    endIcon={<ViewInArRoundedIcon />}
                    onClick={onSubmitPrintOrder}
                >
                    {t('send_for_confirm')}
                </LoadingButton>
                <a target="_blank" href="https://wa.me/972737433201">
                    <Button
                        variant="outlined"
                        color="blue"
                        endIcon={<WhatsAppIcon />}
                    >
                        {t('contact')}
                    </Button>
                </a>
            </div>
        </>
    );
};
