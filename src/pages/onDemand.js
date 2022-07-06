/* global StlViewer */

import React, { useEffect, useState, useContext, useRef } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';
import { LanguageContext } from '../contexts/LanguageContext';
import onDemandService from '../services/onDemandService';
import { steps, initialPrintSettings, colors, materialIds } from './consts';
import { StepWelcomeFile } from '../cmps/StepWelcomeFile';
import { Step2PrintSettings } from '../cmps/Step2PrintSettings';
import { Step3OrderDetails } from '../cmps/Step3OrderDetails';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { MenuItem, Select } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Step2FilesTable } from '../cmps/Step2FilesTable';
import { Step2STLViewer } from '../cmps/Step2STLViewer';
import { Step2Calculating } from '../cmps/Step2Calculating';
import { generateUuid } from '../services/utils';

// * This is the Mother Component of the website.
// * This component manages the whole state of the app.
export const OnDemand = ({ location }) => {
    const { t } = useTranslation(['common']);
    const [apiKey, setApiKey] = useState(null);
    const { language, setLanguage } = useContext(LanguageContext);
    const notificationHandler = useContext(SnackbarHandlerContext);

    const [activeStep, setActiveStep] = useState(0);
    const [contactForm, setContactForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
    });
    const [printSettings, setPrintSettings] = useState(initialPrintSettings);
    const [stlViewerColor, setStlViewerColor] = useState(
        colors[initialPrintSettings.color]
    );
    const [orderId, setOrderId] = useState(null);

    const style = {
        top: 0,
        left: 0,
        width: '600px',
        height: '650px',
        numWidth: 600,
        numHeight: 650,
    };

    const [isLoading, setIsLoading] = useState(false);
    const [selectedUuid, setSelectedUuid] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [filesPrintSettings, setFilesPrintSettings] = useState({});
    const [filesSnapshots, setFilesSnapshots] = useState({});
    const [isLoadedViewer, setIsLoadedViewer] = useState(false);
    const [filesSlicedInfo, setFilesSlicedInfo] = useState({});
    const [isCalculating, setIsCalculating] = useState(false);
    const [isModelLoaded, setModelLoaded] = useState(false);

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search);
        if (searchQuery.get('k')) {
            setApiKey(searchQuery.get('k'));
        } else {
            notificationHandler.warning(t('noApikey'));
        }
    }, []);

    // * When the first file iss uploaded, this function is being called
    const onFirstFileSelect = async event => {
        event.persist();
        const isSuccess = await handleNewFileUpload(event.target.files[0]);
        if (!isSuccess) return;
        setActiveStep(prevActive => prevActive + 1);
    };

    const updateFilesPrintSettings = (
        uuid,
        newPrintSettings,
        cubeeFileId = null
    ) => {
        if (cubeeFileId) {
            return setFilesPrintSettings(prevData => {
                return {
                    ...prevData,
                    [uuid]: {
                        printSettings: newPrintSettings,
                        uuid,
                        cubeeFileId,
                    },
                };
            });
        }
        setFilesPrintSettings(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    printSettings: newPrintSettings,
                    uuid,
                    cubeeFileId: prevData[uuid].cubeeFileId,
                },
            };
        });
    };

    const addNewFileToState = (uuid, file) => {
        setUploadedFiles(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    uuid,
                    file,
                },
            };
        });
    };

    const updateFileSnapshot = (uuid, snapshotURL) => {
        setFilesSnapshots(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    snapshotURL,
                    uuid,
                },
            };
        });
    };

    const onAddFile = async file => {
        handleNewFileUpload(file);
    };

    const handleNewFileUpload = async file => {
        setIsLoading(true);
        if (!apiKey) return notificationHandler.error(t('noApikey'));
        const fileExtension = file?.name.toLowerCase().slice(-3);
        if (
            fileExtension !== 'stl' &&
            fileExtension !== 'obj' &&
            fileExtension !== '3mf'
        ) {
            notificationHandler.error(t('only3DFiles'));
            setIsLoading(false);
            return false;
        }
        const uuid = generateUuid();
        const cubeeFileIdRes = await onDemandService.uploadFileToCubee(
            file,
            apiKey
        );
        if (cubeeFileIdRes.error) {
            setIsLoading(false);
            notificationHandler.error(t('serverError'));
            return false;
        }
        addNewFileToState(uuid, file);
        updateFilesPrintSettings(
            uuid,
            initialPrintSettings,
            cubeeFileIdRes.data
        );
        updateFileSnapshot(uuid, '');
        setSelectedUuid(uuid);
        setStlViewerColor(colors[initialPrintSettings.color]);
        setIsLoading(false);
        return true;
    };

    const addSnapshot = (uuid, snapshotURL) => {
        setFilesSnapshots(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    uuid,
                    snapshotURL,
                },
            };
        });
    };

    const handleRemoveFile = uuid => {
        const uploadedFilesCopy = { ...uploadedFiles };
        const filesSnapshotsCopy = { ...filesSnapshots };
        const filesPrintSettingsCopy = { ...filesPrintSettings };
        delete uploadedFilesCopy[uuid];
        delete filesSnapshotsCopy[uuid];
        delete filesPrintSettingsCopy[uuid];
        if (selectedUuid === uuid) {
            if (Object.keys(uploadedFilesCopy).length) {
                setSelectedUuid(Object.keys(uploadedFilesCopy)[0]);
            } else {
                setActiveStep(prevActive => prevActive - 1);
                setSelectedUuid(null);
                setUploadedFiles({});
                setFilesPrintSettings({});
                setIsLoadedViewer(false);
                return setFilesSnapshots({});
            }
        }
        setUploadedFiles(uploadedFilesCopy);
        setFilesPrintSettings(filesPrintSettingsCopy);
        setFilesSnapshots(filesSnapshotsCopy);
    };

    const handleChangeSelectedFile = uuid => {
        setStlViewerColor(colors[filesPrintSettings[uuid].printSettings.color]);
        setSelectedUuid(uuid);
    };

    const onCalculate = async () => {
        setIsLoading(true);
        setIsCalculating(true);
        const queries = Object.values(filesPrintSettings).map(file => {
            return {
                fileId: file.cubeeFileId,
                infillDensity: file.printSettings.infill,
                layerHeight: file.printSettings.resolution,
                materialId: materialIds[file.printSettings.material],
                processType: 'FDM',
                colorId: 10,
                support: file.printSettings.isSupports,
                vaseMode: file.printSettings.isVase,
                currencyCode: 'ILS',
            };
        });
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        await sleep(1000);
        const results = await Promise.all(
            queries.map(onDemandService.calculateSlicer)
        );
        const errors = results.filter(result => {
            if (result.error) return result;
        });
        if (errors.length) {
            setIsCalculating(false);
            setIsLoading(false);
            return notificationHandler.error(
                `לא הצלחנו לחשב, ${errors[0].error.message.message}`
            );
        }

        const printSettingsValues = Object.values(filesPrintSettings);
        const slicedInfo = results.map(result => {
            const currentUuid = printSettingsValues.find(
                file => file.cubeeFileId === result.fileId
            ).uuid;
            const fileName = uploadedFiles[currentUuid].file.name;
            const snapshotURL = filesSnapshots[currentUuid].snapshotURL;
            const copies = Number(
                filesPrintSettings[currentUuid].printSettings.copies
            );
            return {
                ...result,
                fileName,
                snapshotURL,
                copies,
            };
        });
        setIsLoading(false);
        setFilesSlicedInfo(slicedInfo);
        setActiveStep(prevActive => prevActive + 1);
        setIsCalculating(false);
    };

    const onSubmitPrintOrder = async () => {
        window.parent.postMessage(filesSlicedInfo, 'http://localhost/newwpsite/13-2/');

        // return window.location.href = `https://promaker.co.il/cart/?add-to-cart=4232&quantity=${Math.ceil(slicedInfo.price)}`;
        // const isFormFilled = Object.values(contactForm).every(field => field);
        // if (!isFormFilled)
        //     return notificationHandler.warning('יש למלא את כל השדות');
        // if (!phoneNumberValidation(contactForm.phoneNumber))
        //     return notificationHandler.warning('יש להזין מספר טלפון נייד תקין');
        // if (!emailValidation(contactForm.email))
        //     return notificationHandler.warning('יש להזין מייל תקין');
        // setIsLoading(true);
        // const res = await onDemandService.submitPrintOrder({
        //     calculated: { ...slicedInfo },
        //     settings: { ...printSettings },
        //     fileId: cubeeFileIdName.fileId,
        // });
        // if (res.error) {
        //     notificationHandler.error('לא הצלחנו לבצע את ההזמנה, נסה שוב');
        //     setIsLoading(false);
        // }
        // setOrderId(res.orderId);
    };

    const onPrevStep = () => {
        setActiveStep(prevActive => prevActive - 1);
        // document.querySelector('canvas').width = style.numWidth; //.style= {border: '5px solid black'}
        // document.querySelector('canvas').height = style.numHeight; //.style= {border: '5px solid black'}
        // document.querySelector('canvas').style = {};
    };

    const toggleLang = ({ target }) => {
        if (target.value === 'en') {
            i18n.changeLanguage('en');
            setLanguage({
                lang: 'en',
                dir: 'ltr',
            });
            document.querySelector('.content').classList.add('ltr-body');
            return;
        } else {
            i18n.changeLanguage('heb');
            setLanguage({
                lang: 'heb',
                dir: 'rtl',
            });
            document.querySelector('.content').classList.remove('ltr-body');
        }
    };

    // * For the language Select
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [open, setOpen] = React.useState(false);

    const selectRef = useRef(null);
    // *

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <StepWelcomeFile
                        isLoading={isLoading}
                        apiKey={apiKey}
                        onFirstFileSelect={onFirstFileSelect}
                    />
                );
            case 1:
                if (isCalculating) return <Step2Calculating />;
                return (
                    <>
                        <Step2FilesTable
                            selectedUuid={selectedUuid}
                            addSnapshot={addSnapshot}
                            filesSnapshots={filesSnapshots}
                            onAddFile={onAddFile}
                            handleChangeSelectedFile={handleChangeSelectedFile}
                            handleRemoveFile={handleRemoveFile}
                            isLoadedViewer={isLoadedViewer}
                            uploadedFilesData={Object.values(uploadedFiles).map(
                                fileData => ({
                                    uuid: fileData.uuid,
                                    fileName: fileData.file.name,
                                    fileSize: fileData.file.size,
                                })
                            )}
                            isLoading={isLoading}
                            onCalculate={onCalculate}
                            isModelLoaded={isModelLoaded}
                        />
                        <div className="stl-settings-cont">
                            <Step2PrintSettings
                                // onChangeFile={onChangeFile}
                                isLoading={isLoading}
                                printSettings={
                                    filesPrintSettings[selectedUuid]
                                        ?.printSettings
                                }
                                currentUuid={selectedUuid}
                                setStlViewerColor={setStlViewerColor}
                                onCalculate={onCalculate}
                                updateFilesPrintSettings={
                                    updateFilesPrintSettings
                                }
                                fileName={
                                    uploadedFiles[selectedUuid]?.file.name
                                }
                            />
                            <Step2STLViewer
                                isLoadedViewer={isLoadedViewer}
                                setIsLoadedViewer={setIsLoadedViewer}
                                selectedFile={uploadedFiles[selectedUuid]}
                                stlViewerColor={stlViewerColor}
                                setModelLoaded={setModelLoaded}
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <Step3OrderDetails
                        filesSlicedInfo={filesSlicedInfo}
                        onPrevStep={onPrevStep}
                        onSubmitPrintOrder={onSubmitPrintOrder}
                    />
                );
        }
    };

    return (
        <>
            {!orderId ? (
                <div>
                    <div
                        style={{ display: 'flex' }}
                        className="stepper-language"
                    >
                        <Stepper
                            activeStep={activeStep}
                            dir={language.dir}
                            className="onDemand-stepper"
                        >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>
                                            {t(label)}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {/* <Switch defaultChecked onChange={toggleLang} /> */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            className="language-select"
                        >
                            <LanguageIcon
                                onClick={handleOpen}
                                className="lang-btn"
                                ref={selectRef}
                            />
                            <Select
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                onChange={toggleLang}
                                value={language.lang}
                                anchorEl={selectRef}
                                color={'blue'}
                            >
                                <MenuItem value={'heb'}>עברית</MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="onDemand-step">{renderStep()}</div>
                </div>
            ) : (
                <div className="print-order-submitted">
                    <h1>קיבלנו את ההזמנה שלך #{orderId}</h1>
                    <h2>תודה שבחרת בנו לביצוע ההדפסה</h2>
                    <h3>נחזור אליך ממש בקרוב :)</h3>
                </div>
            )}
        </>
    );
};
