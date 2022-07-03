/* global StlViewer */

import React, { useEffect, useState, useContext, useRef } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';
import { LanguageContext } from '../contexts/LanguageContext';
import onDemandService from '../services/onDemandService';
import { emailValidation, phoneNumberValidation } from '../services/utils';
import {
    steps,
    initialPrintSettings,
    colors,
    materialIds
} from './consts';
import { StepWelcomeFile } from '../cmps/StepWelcomeFile';
import { Step2PrintSettings } from '../cmps/Step2PrintSettings';
import { Step3OrderDetails } from '../cmps/Step3OrderDetails';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { MenuItem, Select, Switch } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Step2FilesTable } from '../cmps/Step2FilesTable';
import { generateUuid } from '../services/utils'
import { Step2STLViewer } from '../cmps/Step2STLViewer';


// * This is the Mother Component of the website.
// * This component manages the whole state of the app.
export const OnDemand = ({ location }) => {
    const { t } = useTranslation(["common"])
    const [apiKey, setApiKey] = useState(null);
    const { language, setLanguage } = useContext(LanguageContext)
    const notificationHandler = useContext(SnackbarHandlerContext);
    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search);
        if (searchQuery.get('k')) {
            setApiKey(searchQuery.get('k'));
        } else {
            notificationHandler.warning('יש להכניס מפתח על מנת להשתמש ביישום');
        }
    }, []);
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
    const url =
        'https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl';

    const style = {
        top: 0,
        left: 0,
        width: '600px',
        height: '650px',
        numWidth: 600,
        numHeight: 650,
    };

    // ! TO REMOVE WHEN DONE:
    const [selectedFile, setSelectedFile] = useState(null);
    const [printsSettingsArr, setPrintsSettingsArr] = useState([initialPrintSettings])
    const [uploadedFilesSnapshots, setUploadedFilesSnaps] = useState([])
    const [cubeeFileIdName, setCubeeFileIdName] = useState(null);
    // ! ENDOF

    const [slicedInfo, setSlicedInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const [selectedUuid, setSelectedUuid] = useState(null)
    const [uploadedFiles, setUploadedFiles] = useState({})
    const [filesPrintSettings, setFilesPrintSettings] = useState({})
    const [filesSnapshots, setFilesSnapshots] = useState({})
    const [isLoadedViewer, setIsLoadedViewer] = useState(false)
    const [triggerResetViewer, setTriggerResetViewer] = useState(false)
    // const [isFileLoaded, setFileLoaded] = useState(false);

    // * When the first file iss uploaded, this function is being called
    // * from the StepWelcomeFile -> it gets the event(file)
    // * it sets the selectedFile automatically,
    // * it sets the UploadedFiles array,
    // * it sets an empty object on the fileSnaps array
    // * CHANGES
    // TODO ADD VALIDATION CHECK OF FILE FORMAT
    const onFirstFileSelect = async event => {
        event.persist();
        await handleNewFileUpload(event.target.files[0])
        setActiveStep(prevActive => prevActive + 1);
    };

    const updateFilesPrintSettings = (uuid, newPrintSettings) => {
        setFilesPrintSettings(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    printSettings: newPrintSettings,
                    uuid
                }
            }
        })
    }

    const addNewFileToState = (uuid, file) => {
        setUploadedFiles(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    uuid,
                    file
                }
            }
        })
    }

    const updateFileSnapshot = (uuid, snapshotURL) => {
        setFilesSnapshots(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    snapshotURL,
                    uuid
                }
            }
        })
    }

    const onAddFile = async file => {
        handleNewFileUpload(file)

    }

    const takeSnapshot = () => {
        //TODO: RESET THE VIEW, THEN TAKE A NEW SNAPSHOT
        setTriggerResetViewer(!triggerResetViewer)

    }


    // TODO: Check about dupliactions
    const handleNewFileUpload = async (file) => {
        setIsLoading(true);
        if (!apiKey) return notificationHandler.error('יש להכניס מפתח')
        if (file?.name.toLowerCase().slice(-3) !== 'stl') console.log('checkvalidation')
        const uuid = generateUuid()
        const cubeeFileIdRes = await onDemandService.uploadFileToCubee(file, apiKey);
        if (cubeeFileIdRes.error) {
            setIsLoading(false);
            return notificationHandler.error(
                'אופס, יש בעיה בשרת, נא לנסות שוב'
            );
        }
        addNewFileToState(uuid, file)
        updateFilesPrintSettings(uuid, initialPrintSettings)
        updateFileSnapshot(uuid, '')
        setSelectedUuid(uuid)
        setIsLoading(false);
    }

    // const checkIsAlreadyUploaded

    const addSnapshot = (uuid, snapshotURL) => {
        setFilesSnapshots(prevData => {
            return {
                ...prevData,
                [uuid]: {
                    uuid,
                    snapshotURL
                }
            }
        })
    }

    const handleRemoveFile = uuid => {
        const uploadedFilesCopy = { ...uploadedFiles }
        const filesSnapshotsCopy = { ...filesSnapshots }
        const filesPrintSettingsCopy = { ...filesPrintSettings }
        delete uploadedFilesCopy[uuid]
        delete filesSnapshotsCopy[uuid]
        delete filesPrintSettingsCopy[uuid]
        console.log(uploadedFilesCopy)
        if (selectedUuid === uuid) {
            console.log('same uuid')
            if (Object.keys(uploadedFilesCopy).length) {
                setSelectedUuid(Object.keys(uploadedFiles)[0])
            }
            else {
                setActiveStep(prevActive => prevActive - 1);
                setSelectedUuid(null)
                setUploadedFiles({})
                setFilesPrintSettings({})
                return setFilesSnapshots({})
            }
        }
        setUploadedFiles(uploadedFilesCopy)
        setFilesPrintSettings(filesPrintSettingsCopy)
        setFilesSnapshots(filesSnapshotsCopy)

        //NOT WORKING AS EXPECTED
        // if (selectedFile.uuid === uuid) setSelectedFile(uploadedFiles[0])
    }

    const onChangeFile = () => {
        setCubeeFileIdName(null);
        // setFileLoaded(false);
        setPrintSettings(initialPrintSettings);
        setStlViewerColor(colors[initialPrintSettings.color])
        setActiveStep(prevActive => prevActive - 1);

    };

    const handleChangeSelectedFile = (uuid) => {
        const idx = uploadedFiles.findIndex(file => file.uuid === uuid)
        setSelectedFile(uploadedFiles[idx])
    }

    const onCalculate = async () => {
        setIsLoading(true);
        const printSettingsObj = {
            fileId: cubeeFileIdName.fileId,
            infillDensity: printSettings.infill,
            layerHeight: printSettings.resolution,
            materialId: materialIds[printSettings.material],
            processType: 'FDM',
            colorId: 10,
            support: printSettings.isSupports,
            vaseMode: printSettings.isVase,
            currencyCode: 'ILS',
        };
        const res = await onDemandService.calculateSlicer(printSettingsObj);
        if (res.error) {
            setIsLoading(false);
            return notificationHandler.error(
                'אופס, לא הצלחנו לחשב את ההדפסה, נסה שוב'
            );
        }
        setIsLoading(false);
        setSlicedInfo(res);
        setActiveStep(prevActive => prevActive + 1);
    };
    const onSubmitPrintOrder = async () => {

        var data = { printsSettingsArr }
        window.parent.postMessage({ data }, 'http://localhost/newwpsite/13-2/')

        // return window.location.href = `https://promaker.co.il/cart/?add-to-cart=4232&quantity=${Math.ceil(slicedInfo.price)}`;
        const isFormFilled = Object.values(contactForm).every(field => field);
        if (!isFormFilled)
            return notificationHandler.warning('יש למלא את כל השדות');
        if (!phoneNumberValidation(contactForm.phoneNumber))
            return notificationHandler.warning('יש להזין מספר טלפון נייד תקין');
        if (!emailValidation(contactForm.email))
            return notificationHandler.warning('יש להזין מייל תקין');
        setIsLoading(true);
        const res = await onDemandService.submitPrintOrder({
            calculated: { ...slicedInfo },
            settings: { ...printSettings },
            fileId: cubeeFileIdName.fileId,
        });
        if (res.error) {
            notificationHandler.error('לא הצלחנו לבצע את ההזמנה, נסה שוב');
            setIsLoading(false);
        }
        console.log(res);
        setOrderId(res.orderId);
    };

    const onPrevStep = () => {
        setActiveStep(prevActive => prevActive - 1);
        document.querySelector('canvas').width = style.numWidth; //.style= {border: '5px solid black'}
        document.querySelector('canvas').height = style.numHeight; //.style= {border: '5px solid black'}
        document.querySelector('canvas').style = {};
        setSlicedInfo(null);
    };

    const toggleLang = ({ target }) => {
        console.log(target.value);
        if (target.value === 'en') {
            i18n.changeLanguage('en')
            setLanguage({
                lang: 'en',
                dir: 'ltr'
            })
            document.querySelector('.content').classList.add('ltr-body')
            return
        }
        else {
            i18n.changeLanguage('heb')
            setLanguage({
                lang: 'heb',
                dir: 'rtl'
            })
            document.querySelector('.content').classList.remove('ltr-body')
        }
    }

    useEffect(() => {
        console.log(uploadedFiles);
    }, [uploadedFiles])

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
                return (
                    <>
                        <Step2FilesTable
                            selectedUuid={selectedUuid}
                            addSnapshot={addSnapshot}
                            filesSnapshots={filesSnapshots}
                            onAddFile={onAddFile}
                            handleChangeSelectedFile={handleChangeSelectedFile}
                            uploadedFilesSnapshots={uploadedFilesSnapshots}
                            handleRemoveFile={handleRemoveFile}
                            isLoadedViewer={isLoadedViewer}
                            uploadedFilesData={Object.values(uploadedFiles).map(fileData => ({
                                uuid: fileData.uuid,
                                fileName: fileData.file.name,
                                fileSize: fileData.file.size,
                            }))}
                            triggerResetViewer={triggerResetViewer}
                            takeSnapshot={takeSnapshot}
                        />
                        <div className='stl-settings-cont'>
                            <Step2PrintSettings
                                // onChangeFile={onChangeFile}
                                isLoading={isLoading}
                                printSettings={filesPrintSettings[selectedUuid]?.printSettings}
                                currentUuid={selectedUuid}
                                setStlViewerColor={setStlViewerColor}
                                onCalculate={onCalculate}
                                updateFilesPrintSettings={updateFilesPrintSettings}
                            />
                            <Step2STLViewer
                                triggerResetViewer={triggerResetViewer}
                                isLoadedViewer={isLoadedViewer}
                                setIsLoadedViewer={setIsLoadedViewer}
                                selectedFile={uploadedFiles[selectedUuid]}
                                stlViewerColor={stlViewerColor}
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <Step3OrderDetails
                        cubeeFileIdName={cubeeFileIdName}
                        slicedInfo={slicedInfo}
                        onPrevStep={onPrevStep}
                        selectedFile={selectedFile}
                        stlViewerColor={stlViewerColor}
                        setContactForm={setContactForm}
                        contactForm={contactForm}
                        copies={printSettings.copies}
                        onSubmitPrintOrder={onSubmitPrintOrder}
                        uploadedFiles={uploadedFiles}
                    />
                )
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



    const [open, setOpen] = React.useState(false);

    const selectRef = useRef(null)
    return (
        <>
            {!orderId ? (
                <div>
                    <div style={{ display: 'flex' }} className='stepper-language'>
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
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='language-select'>
                            <LanguageIcon onClick={handleOpen} className='lang-btn' ref={selectRef} />
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
