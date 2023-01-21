import React, { useEffect, useState, useContext, useRef } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';
import { LanguageContext } from '../contexts/LanguageContext';
import onDemandService from '../services/onDemandService';
import {
    steps,
    initialPrintSettings,
    colors,
    materialIds,
    colorsMap,
    materialsMap,
} from './consts';
import { StepWelcomeFile } from '../cmps/StepWelcomeFile';
import { Step2PrintSettings } from '../cmps/Step2PrintSettings';
import { Step3OrderDetails } from '../cmps/Step3OrderDetails';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { Box, MenuItem, Select } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Step2FilesTable } from '../cmps/Step2FilesTable';
import { Step2STLViewer } from '../cmps/Step2STLViewer';
import { Step2Calculating } from '../cmps/Step2Calculating';
import { generateUuid } from '../services/utils';
import Step5Payment from "../cmps/Step5Payment";
import { Step4Shipping } from '../cmps/Step4Shipping';

// * This is the Mother Component of the website.
// * This component manages the whole state of the app.
export const OnDemand = ({ isDesktop, isCheckoutMode, queryKey}) => {
    const { t } = useTranslation(['common']);
    const [apiKey, setApiKey] = useState(null);
    const [currencyCode, setCurrencyCode] = useState('ILS');
    const { language, setLanguage } = useContext(LanguageContext);
    const notificationHandler = useContext(SnackbarHandlerContext);

    const [activeStep, setActiveStep] = useState(0);
    const [stlViewerColor, setStlViewerColor] = useState(
        colors[initialPrintSettings.color]
    );

    const [isLoading, setIsLoading] = useState(false);
    const [selectedUuid, setSelectedUuid] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [filesPrintSettings, setFilesPrintSettings] = useState({});
    const [filesSnapshots, setFilesSnapshots] = useState({});
    const [isLoadedViewer, setIsLoadedViewer] = useState(false);
    const [filesSlicedInfo, setFilesSlicedInfo] = useState({});
    const [isCalculating, setIsCalculating] = useState(false);
    const [isModelLoaded, setModelLoaded] = useState(false);
    const [shopOptions, setShopOptions] = useState({});
    const [shippingData, setShippingData] = useState({});
    const [total, setTotal] = useState();

    const scrollToTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        if (isCheckoutMode) {
            console.log("checkout mode selected");

            if (queryKey == null)
                return;

            setApiKey(queryKey);

            const getShopOptions = async () => {
                const res = await onDemandService.getShopOptions(
                    queryKey
                );
                if (res.error)
                    return notificationHandler.error(t('serverError'));
                setShopOptions(res);
            };
            getShopOptions();
        } else {
            window.parent.postMessage({handshake: '1'}, '*');
            window.addEventListener('message', event => {
                event.stopPropagation();
                if (event.data.handshake) {
                    if (event.data.handshake.apiKey) {
                        setApiKey(event.data.handshake.apiKey);
                        const getShopOptions = async () => {
                            let res = await onDemandService.getShopOptions(event.data.handshake.apiKey);
                            if (res.error) return notificationHandler.error(t('serverError'));
                            setShopOptions(res);
                        };
                        getShopOptions();
                    }
                    if (event.data.handshake.currencyCode) {
                        setCurrencyCode(event.data.handshake.currencyCode);
                    }
                    if (event.data.handshake.lang) {
                        if (event.data.handshake.lang.toLowerCase().includes('heb')) {
                            toggleLangbyString('heb')
                        } else toggleLangbyString('en')
                    }
                } else if (event.data.isLoading) {
                    setIsLoading(true);
                }
            });
            if (process.env.REACT_APP_ENV === 'staging') {
                if (!apiKey) {
                    setApiKey(process.env.REACT_APP_API_KEY_DEMO);
                    const getShopOptions = async () => {
                        const res = await onDemandService.getShopOptions(process.env.REACT_APP_API_KEY_DEMO);
                        if (res.error) return notificationHandler.error(t('serverError'));
                        setShopOptions(res);
                    };
                    getShopOptions();
                }
            }
        }
    }, []);

    // * When the first file is uploaded, this function is being called
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
        if (!checkColorValidity()) {
            setIsCalculating(false);
            setIsLoading(false);
            return notificationHandler.error(t('selectColor'));
        }
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
        const initialPrintSettingsObj = {
            ...initialPrintSettings,
            color: t('anyColor')
        }
        updateFilesPrintSettings(
            uuid,
            initialPrintSettingsObj,
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
        if (!checkColorValidity()) {
            setIsCalculating(false);
            setIsLoading(false);
            return notificationHandler.error(t('selectColor'));
        }
        setStlViewerColor(colors[filesPrintSettings[uuid].printSettings.color]);
        setSelectedUuid(uuid);
    };

    const onCheckout = (price) => {
        setActiveStep(prevActive => prevActive + 1);
        setTotal(price);
        scrollToTop()
    }

    const onCalculate = async () => {
        setIsLoading(true);
        setIsCalculating(true);
        if (!checkColorValidity()) {
            setIsCalculating(false);
            setIsLoading(false);
            return notificationHandler.error(t('selectColor'));
        }
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
                currencyCode,
            };
        });
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        await sleep(1000);
        scrollToTop()
        const results = await Promise.all(
            queries.map(query => onDemandService.calculateSlicer(query, apiKey))
        );
        const errors = results.filter(result => {
            return !!result.error;
        });

        if (errors.length) {
            setIsCalculating(false);
            setIsLoading(false);
            return notificationHandler.error(
                `${t('cantcalc')}${errors[0].error.message}`
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
                uuid: currentUuid,
                snapshotURL,
                copies,
            };
        });
        setIsLoading(false);
        setFilesSlicedInfo(slicedInfo);
        setActiveStep(prevActive => prevActive + 1);
        scrollToTop()
        setIsCalculating(false);
    };

    const onSubmitPrintOrder = async () => {
        let modelsDataArray = [];
        modelsDataArray = filesSlicedInfo.map(model => {
            let printTime;
            printTime =
                Math.floor(model.printTime) > 0
                    ? Math.floor(model.printTime)
                    : '';
            printTime = Math.floor(model.printTime) > 0
                ? (printTime += t('hours'))
                : (printTime);
            printTime += Math.floor(
                Number(
                    (model.printTime - Math.floor(model.printTime)).toFixed(2)
                ) * 60
            );
            printTime += t('minutes');
            return {
                ...model,
                printTime,
                price: Math.ceil(model.price),
                color: filesPrintSettings[model.uuid].printSettings.color,
                material: filesPrintSettings[model.uuid].printSettings.material,
                layerHeight:
                    filesPrintSettings[model.uuid].printSettings.resolution,
                isVase: filesPrintSettings[model.uuid].printSettings.isVase
                    ? 'Yes'
                    : 'No',
                isSupports: filesPrintSettings[model.uuid].printSettings
                    .isSupports
                    ? 'Yes'
                    : 'No',
                infill: filesPrintSettings[model.uuid].printSettings.infill,
                downloadURL: `${process.env.REACT_APP_DOWNLOAD_BASE_URL}${model.fileId}`,
                snapshotURL: null,
            };
        });
        window.parent.postMessage(
            {
                onAddToCart: {
                    models: modelsDataArray,
                },
            },
            '*'
        );
    };

    const onPrevStep = () => {
        setActiveStep(prevActive => prevActive - 1);
    };

    const toggleLang = ({ target }) => {
        if (target.value === 'en') {
            i18n.changeLanguage('en');
            setLanguage({
                lang: 'en',
                dir: 'ltr',
            });
            document.querySelector('.content').classList.add('ltr-body');
        } else {
            i18n.changeLanguage('heb');
            setLanguage({
                lang: 'heb',
                dir: 'rtl',
            });
            document.querySelector('.content').classList.remove('ltr-body');
        }
    };

    const toggleLangbyString = (lang) => {
        if (lang === 'en') {
            i18n.changeLanguage('en');
            setLanguage({
                lang: 'en',
                dir: 'ltr',
            });
            document.querySelector('.content').classList.add('ltr-body');
        } else {
            i18n.changeLanguage('heb');
            setLanguage({
                lang: 'heb',
                dir: 'rtl',
            });
            document.querySelector('.content').classList.remove('ltr-body');
        }
    };

    const checkColorValidity = () => {
        const availableColors = getRelevantColors(
            filesPrintSettings[selectedUuid].printSettings.material
        );
        return availableColors[filesPrintSettings[selectedUuid].printSettings.color];
    };

    const getRelevantColors = selectedMaterial => {
        const materialId = Object.keys(materialsMap).find(
            key => materialsMap[key] === selectedMaterial
        );
        const colorsIds = shopOptions.colorIdsByMaterialId[materialId];
        if (!colorsIds) return {};
        let availableColors = {};
        colorsIds.forEach(colorId => {
            if(!colorsMap[colorId]) return;
            availableColors[colorsMap[colorId][language.lang]] =
                colorsMap[colorId].hexCode;
        });
        availableColors[colorsMap[10][language.lang]] = colorsMap[10].hexCode;
        return availableColors;
    };

    // * For the language Select
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [open, setOpen] = React.useState(false);

    const onNext = () => {
        setActiveStep(prevActive => prevActive + 1);
    }

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
                if (isCalculating) return <Step2Calculating isDesktop={isDesktop} />;
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
                                materials={shopOptions.materialIdsByProcessType.FDM.map(
                                    material => materialsMap[material]
                                )}
                                colors={getRelevantColors(
                                    filesPrintSettings[selectedUuid]
                                        .printSettings.material
                                )}
                                isDesktop={isDesktop}
                            />
                            <Step2STLViewer
                                isLoadedViewer={isLoadedViewer}
                                setIsLoadedViewer={setIsLoadedViewer}
                                selectedFile={uploadedFiles[selectedUuid]}
                                stlViewerColor={stlViewerColor}
                                setModelLoaded={setModelLoaded}
                                isDesktop={isDesktop}
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
                        isLoading={isLoading}
                        currencyCode={currencyCode}
                        isCheckoutMode={isCheckoutMode}
                        onCheckout={onCheckout}
                    />
                );
            case 3:
                return (
                    <div>
                        <Step4Shipping next={onNext} prev={onPrevStep} setShippingData={setShippingData}/>
                    </div>

                );
            case 4:
                return (
                  <Step5Payment apikey={apiKey} email={"neri.richter@gmail.com"}
                                totalPrice={total}
                                currencyCode={currencyCode}
                                items={filesSlicedInfo}
                                filesPrintSettings={filesPrintSettings}
                                shippingData={shippingData}
                                next={onNext}/>
                );
            case 5:
                return <div>
                    Success payment was made!
                </div>
            default:
                return <></>
        }
    };

    return (
        <>
            <div>
                <div style={{ display: 'flex' }} className="stepper-language">
                    <Stepper
                        activeStep={activeStep}
                        dir={language.dir}
                        className="onDemand-stepper"
                    >
                        {steps.filter(label => isCheckoutMode  || label !== 'Payment' && label != 'Shipping').map((label, index) => {
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
                    {/* {isDesktop ?
                        <Box
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
                        </Box>
                        :
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'fixed',
                                width: 60,
                                height: 60,
                                bottom: 40,
                                right: 40,
                                zIndex: 5000

                            }}
                            className="language-select"
                        >
                            <LanguageIcon
                                onClick={handleOpen}
                                className="lang-btn"
                                ref={selectRef}
                                style={{
                                    position: 'float',
                                    display: 'block',
                                    marginTop: 60,
                                    // marginRight: 80
                                }}
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
                        </Box>
                    } */}
                </div>
                <div className="onDemand-step">{renderStep()}</div>
            </div>
        </>
    );
};
