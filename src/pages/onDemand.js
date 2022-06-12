/* global StlViewer */

import React, { useEffect, useRef, useState, useContext } from 'react';
// import { StlViewer } from "react-stl-viewer";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Tooltip, Typography, Popover, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import onDemandService from '../services/onDemandService';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import { emailValidation, phoneNumberValidation } from '../services/utils';
import { WindowSharp } from '@mui/icons-material';
import {
    prettoSliderSettings, infillMarks, resMarks, colors, initialPrintSettings,
    steps, materials, popovers

} from './consts';

const PrettoSlider = styled(Slider)(prettoSliderSettings);

export const OnDemand = ({ location }) => {
    const [apiKey, setApiKey] = useState(null)
    const notificationHandler = useContext(SnackbarHandlerContext);
    useEffect(() => {
        // document.querySelector('header').style.display = 'none';
        // document.querySelector('footer').style.display = 'none';
        // document.querySelector('.MuiCollapse-root').style.display = 'none';
        const searchQuery = new URLSearchParams(location.search);
        if (searchQuery.get('k')) {
            console.log(searchQuery.get('k'));
            setApiKey(searchQuery.get('k'))
        }
        else {
            notificationHandler.warning('יש להכניס מפתח על מנת להשתמש ביישום')
        }
    }, [])
    const [activeStep, setActiveStep] = useState(0);
    const hiddenFileInput = useRef(null)
    const [contactForm, setContactForm] = useState({
        name: '',
        phoneNumber: '',
        email: ''
    })
    const [orderComment, setOrderComment] = useState('');
    const [printSettings, setPrintSettings] = useState(initialPrintSettings)
    const [stlViewerColor, setStlViewerColor] = useState(colors[initialPrintSettings.color])
    const [orderId, setOrderId] = useState(null)
    const url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
    const style = {
        top: 0,
        left: 0,
        width: '600px',
        height: '650px',
        numWidth: 600,
        numHeight: 650
    }
    const miniStyle = {
        top: 0,
        left: 0,
        width: '300px',
        height: '350px',
        numWidth: 300,
        numHeight: 350
    }

    const divRef = useRef(null);
    const miniDivRef = useRef(null)
    const [stlViewer, setStlViewer] = useState(null)
    const [miniStlViewer, setMiniStlViewer] = useState(null)


    // useEffect(()=>{
    //     stlViewer.setColor(1, stlViewerColor)
    // },[stlViewerColor])

    const test = () => {
        console.log(stlViewer.set_color);
        stlViewer.set_color(1, "#ff00ee")
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [cubeeFileIdName, setCubeeFileIdName] = useState(null)
    const [slicedInfo, setSlicedInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isFileLoaded, setFileLoaded] = useState(false)

    const onFileSelect = async (event) => {
        event.persist()
        setIsLoading(true)
        const filer = event.target.files[0]
        if (filer?.name.toLowerCase().slice(-3) !== 'stl') return notificationHandler.error('STL מצטערים, רק קבצי')
        // stlViewer.set_color(1, "#00ff00")



        // setTimeout(()=>{
        //     stlViewer.set_color(1, "#00ff00")
        // },2000)
        // return;

        setSelectedFile(filer);
        //חשבתי שהבעיה היא שזה לא מספיק לטעון את הקובץ בסטייט לפני שהוא מעלה את התצוגה
        //אז ניסיתי להוסיף את הטיימאאוט למטה, אבל זה לא עזר. גם לא ב10 שניות
        // this is ms no אני יודע
        setTimeout(() => {
            setFileLoaded(true)
        }, 10)
        const res = await onDemandService.uploadFileToCubee(filer, apiKey)
        if (res.error) {
            setIsLoading(false)
            return notificationHandler.error('אופס, יש בעיה בשרת, נא לנסות שוב')
        }
        setCubeeFileIdName({
            fileId: res.data,
            fileName: filer.name
        })
        setIsLoading(false)
        setActiveStep(prevActive => prevActive + 1);
        setTimeout(() => {

            const stlViewer1 = new StlViewer(divRef.current, {
                ready_callback: (e) => console.log(e), all_loaded_callback: (e) => console.log('all loaded 3d'), canvas_width: '100%', canvas_height: '100%'
            });
            console.log(stlViewer1);
            setStlViewer(stlViewer1)
            stlViewer1.add_model({
                local_file: filer, color: stlViewerColor,
                //  animation: { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true },  }
            });
        }, 1000)
    };

    const handleFileSelect = () => {
        hiddenFileInput.current.click()
    };

    const handleChangeMaterial = (material) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, material };
        });
    }
    const handleChangeInfill = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, infill: target.value };
        });
    }
    const handleChangeRes = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, resolution: target.value };
        });
    }
    const handleChangeSupports = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, isSupports: target.checked };
        });
    }
    const handleChangeVase = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, isVase: target.checked };
        });
    }
    const onChangeColor = (color) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, color };
        });
        setStlViewerColor(colors[color])
        stlViewer.set_color(1, colors[color])

    }
    const onResetSettings = () => {
        setPrintSettings(initialPrintSettings)
        setStlViewerColor(colors[initialPrintSettings.color])
    }
    const onChangeFile = () => {
        setCubeeFileIdName(null)
        setFileLoaded(false)
        setPrintSettings(initialPrintSettings)
        setActiveStep(prevActive => prevActive - 1);
    }
    const onCalculate = async () => {
        setIsLoading(true)
        const printSettingsObj = {
            fileId: cubeeFileIdName.fileId,
            infillDensity: printSettings.infill,
            layerHeight: printSettings.resolution,
            materialId: '',
            processType: 'FDM',
            colorId: 10,
            support: printSettings.isSupports,
            vaseMode: printSettings.isVase,
            currencyCode: 'ILS'
        }
        const res = await onDemandService.calculateSlicer(printSettingsObj)
        if (res.error) {
            setIsLoading(false)
            return notificationHandler.error('אופס, לא הצלחנו לחשב את ההדפסה, נסה שוב')
        }
        setIsLoading(false)
        setSlicedInfo(res)
        // stlViewer.dispose()
        setActiveStep(prevActive => prevActive + 1);

        // const stlViewer1 = new StlViewer(divRef.current, {
        //     ready_callback: (e) => console.log(e), all_loaded_callback: (e) => console.log('all loaded 3d'), canvas_width: '100%', canvas_height: '100%'
        // });
        // console.log(stlViewer1);
        // setStlViewer(stlViewer1)
        // stlViewer1.add_model({
        //     local_file: selectedFile, color: stlViewerColor,
        //     //  animation: { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true },  }
        // });
        // stlViewer.clean()
        // stlViewer.dispose()
        // document.querySelector('canvas').width=miniStyle.numWidth//.style= {border: '5px solid black'}
        // document.querySelector('canvas').height=miniStyle.numHeight//.style= {border: '5px solid black'}
        // document.querySelector('canvas').style= {}
        // stlViewer.set_auto_zoom()
        // window.stlViewer = stlViewer
        // stlViewer.set_position(1, 100,100,100)
        // stlViewer.set_center_models(true)
        // setStlViewer(null)
        stlViewer.dispose()
        document.querySelector('canvas').display = 'none'
        window.stlViewer = stlViewer
        setTimeout(() => {
            const stlViewer1 = new StlViewer(miniDivRef.current, {
                ready_callback: (e) => console.log(e), all_loaded_callback: (e) => console.log('all loaded 3d'), canvas_width: '100%', canvas_height: '100%'
            });
            console.log(stlViewer1);
            setMiniStlViewer(stlViewer1)
            stlViewer1.add_model({
                local_file: selectedFile, color: stlViewerColor,
                //  animation: { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true },  }
            });
        }, 1000)
    }
    const onSubmitPrintOrder = async () => {
        const isFormFilled = Object.values(contactForm).every(
            field => field
        );
        if (!isFormFilled)
            return notificationHandler.warning('יש למלא את כל השדות');
        if (!phoneNumberValidation(contactForm.phoneNumber))
            return notificationHandler.warning(
                'יש להזין מספר טלפון נייד תקין'
            );
        if (!emailValidation(contactForm.email))
            return notificationHandler.warning('יש להזין מייל תקין')
        setIsLoading(true)
        const res = await onDemandService.submitPrintOrder({ calculated: { ...slicedInfo }, settings: { ...printSettings }, fileId: cubeeFileIdName.fileId })
        if (res.error) {
            notificationHandler.error('לא הצלחנו לבצע את ההזמנה, נסה שוב')
            setIsLoading(false)
        }
        console.log(res);
        setOrderId(res.orderId)
    }

    const onPrevStep = () => {
        setActiveStep(prevActive => prevActive - 1);
        document.querySelector('canvas').width = style.numWidth//.style= {border: '5px solid black'}
        document.querySelector('canvas').height = style.numHeight//.style= {border: '5px solid black'}
        document.querySelector('canvas').style = {}
        setSlicedInfo(null)
    }

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



    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState('')
    const handlePopoverOpen = (event) => {
        setPopoverContent(popovers[event.target.id])
        setAnchorEl(event.currentTarget);

    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const isPopoverOpen = Boolean(anchorEl);

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <h2>צריכים שירותי הדפסה בתלת מימד? הגעתם למקום הנכון</h2>
                        <p>מוזמנים להעלות את הקובץ שלכם ומיד נעבור לבחירת הגדרות הדפסה <br /> לאחר מכן, הקובץ ישלח לאישור וניצור קשר טלפונית לביצוע הזמנה</p>
                        <input accept=".stl" type='file' name='file' onChange={onFileSelect} hidden ref={hiddenFileInput} />
                        <LoadingButton endIcon={<CloudUploadIcon />}
                            variant='contained'
                            color='warn'
                            onClick={handleFileSelect}
                            loading={isLoading}
                            disabled={!Boolean(apiKey)}
                        >
                            העלאת קובץ להדפסה
                        </LoadingButton>
                    </>
                )
            case 1:
                return (
                    <>

                        <Button className='back-btn'
                            variant='outlined'
                            size='small'
                            color='black'
                            style={{ flex: 1, marginLeft: 'auto' }}
                            startIcon={<ArrowForwardIosIcon />}
                            onClick={onChangeFile}
                        >החלפת קובץ</Button>
                        <div className='stl-settings-cont'>

                            <div className='settings'>
                                <div className='setting'>
                                    <div className='title-question-cont'>
                                        <h3>חומר הדפסה</h3>
                                        <LiveHelpIcon fontSize='small' id='material'
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose} />
                                    </div>
                                    <div className='options'>
                                        {
                                            materials.map((material) => {
                                                return <Button
                                                    variant='contained'
                                                    color={printSettings.material == material ? 'blue' : 'grey'}
                                                    className={printSettings.material === material ? 'mat-btn active' : 'mat-btn'}
                                                    onClick={() => handleChangeMaterial(material)}
                                                    key={material}
                                                >
                                                    {material}
                                                </Button>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='setting'>
                                    <div className='title-question-cont'>
                                        <h3>אחוזי מילוי (Infill)</h3>
                                        <LiveHelpIcon fontSize='small'
                                            id='infill'
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                        />
                                    </div>
                                    {/* <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> */}
                                    <PrettoSlider
                                        valueLabelDisplay="auto"
                                        marks={infillMarks}
                                        onChange={handleChangeInfill}
                                        value={printSettings.infill}
                                    />

                                </div>
                                <div className='setting'>
                                    <div className='title-question-cont'>
                                        <h3>רזולוציה (גובה שכבה)</h3>
                                        <LiveHelpIcon fontSize='small'
                                            id='res'
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose} />
                                    </div>
                                    {/* <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> */}
                                    <PrettoSlider
                                        valueLabelDisplay="auto"
                                        value={printSettings.resolution}
                                        min={0.1}
                                        max={0.3}
                                        step={0.01}
                                        marks={resMarks}
                                        onChange={handleChangeRes}
                                        track="inverted"
                                        color='blue'
                                    />
                                </div>
                                <div className='setting'>
                                    <h3>צבע</h3>
                                    <div className='colors'>
                                        {
                                            Object.values(colors).map((hexColor, idx) => {
                                                return (
                                                    <Tooltip key={idx} title={Object.keys(colors)[idx]} arrow>
                                                        <div className={Object.keys(colors)[idx] == printSettings.color ? 'color-box active' : 'color-box'}
                                                            style={{ backgroundColor: hexColor, boxShadow: Object.keys(colors)[idx] == printSettings.color ? `0px 0px 10px 2px ${hexColor}` : '0px 0px 0px 0px' }}
                                                            onClick={() => onChangeColor(Object.keys(colors)[idx])}
                                                        />
                                                    </Tooltip>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                <div className='setting'>
                                    <div className='switch-cont'>
                                        <Switch color='blue' checked={printSettings.isSupports} onChange={handleChangeSupports} />
                                        <h3 className='inline'>הוסף תמיכות</h3>
                                        <LiveHelpIcon fontSize='small'
                                            id='support'
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                        />
                                    </div>
                                </div>
                                <div className='setting'>
                                    <div className='switch-cont'>
                                        <Switch color='blue' checked={printSettings.isVase} onChange={handleChangeVase} />
                                        <h3 className='inline'>מצב ואזה</h3>
                                        <LiveHelpIcon fontSize='small'
                                            id='vase'
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                        />
                                    </div>
                                </div>
                                <div className='cta-cont'>
                                    <Button
                                        variant='link'
                                        color='white'
                                        onClick={onResetSettings}
                                    >
                                        איפוס הגדרות
                                    </Button>
                                    <LoadingButton
                                        variant='contained'
                                        color='blue'
                                        className='whiteText'
                                        loading={isLoading}
                                        endIcon={<ThreeDRotationIcon />}
                                        onClick={onCalculate}
                                    >
                                        המשך
                                    </LoadingButton>
                                </div>
                            </div>
                            <div className='bigdiv' style={style} ref={divRef} />
                            {/* {isFileLoaded &&
                            // console.log(selectedFile) &&
                                <div style={{width: '150px', height: '150px'}}>
                                    <StlViewer
                                        // style={style}
                                        // orbitControls
                                        // shadows
                                        // showAxes
                                        // url={URL.createObjectURL(selectedFile)}
                                        // url={"https://cdn.thingiverse.com/assets/a4/c2/db/e9/ff/20131015WV1Feet.stl"}
                                        file={selectedFile}
                                        // modelProps={{
                                        //     color: stlViewerColor,
                                        //     scale: 0.25
                                        // }}
                                        // floorProps={{
                                        //     gridWidth: 300
                                        // }}
                                        // color={stlViewerColor}
                                        onError={console.log}
                                    />
                                </div>
                            } */}

                        </div>
                        <Popover
                            id="mouse-over-popover"
                            sx={{
                                pointerEvents: 'none',
                            }}
                            color='cubee'
                            open={isPopoverOpen}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                        </Popover>
                    </>
                )
            case 2:
                return (
                    <>
                        <h2>סיכום הדפסה</h2>
                        <div className='data-viewer-cont'>
                            <div className='data'>
                                {
                                    cubeeFileIdName.fileName.length > 15 ?
                                        <Tooltip title={cubeeFileIdName.fileName} arrow >
                                            <h3>שם הקובץ: {cubeeFileIdName.fileName.slice(0, 15)}...stl</h3>
                                        </Tooltip>
                                        :
                                        <h3>שם הקובץ: {cubeeFileIdName.fileName}</h3>

                                }
                                <h3>מידות: {slicedInfo.dimensions.height}x{slicedInfo.dimensions.width}x{slicedInfo.dimensions.length} מ"מ</h3>
                                <h3>זמן הדפסה משוער: {Math.floor(slicedInfo.printTime)} שעות, {Math.floor(Number((slicedInfo.printTime - Math.floor(slicedInfo.printTime)).toFixed(2)) * 60)} דקות</h3>
                                <h3>משקל הדפסה משוער: {slicedInfo.weight} גרם</h3>
                                <h2>מחיר משוער: ₪{Math.ceil(slicedInfo.price)}</h2>
                            </div>
                            <div className='minidiv' style={miniStyle} ref={miniDivRef} />
                            {/* <StlViewer
                                    style={miniStyle}
                                    // orbitControls
                                    shadows
                                    // showAxes
                                    // url={url}
                                    file={selectedFile}
                                    color={stlViewerColor}
                                /> */}
                            {/* </div> */}
                        </div>
                        <div>

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
                        </div>
                        <div className='cta-cont'>
                            <Button
                                startIcon={<ArrowForwardIosIcon />}
                                onClick={onPrevStep}
                            >
                                רוצה לשנות הגדרות?
                            </Button>
                            <LoadingButton
                                variant='contained'
                                color='blue'
                                className='whiteText'
                                loading={isLoading}
                                endIcon={<ViewInArRoundedIcon />}
                                onClick={onSubmitPrintOrder}
                            >
                                שלח לחנות לאישור
                            </LoadingButton>
                            <a target='_blank' href='https://wa.me/972737433201'>
                                <Button
                                    variant='outlined'
                                    color='blue'
                                    endIcon={<WhatsAppIcon />}
                                >
                                    צור קשר בוואטסאפ
                                </Button>
                            </a>
                        </div>
                    </>
                )
        }
    }

    return (
        <>
            {!orderId ?
                <div>
                    <Stepper
                        activeStep={activeStep}
                        dir="rtl"
                        className="onDemand-stepper"
                    >
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div className="onDemand-step">{renderStep()}</div>
                </div>
                :
                <div className='print-order-submitted'>
                    <h1>קיבלנו את ההזמנה שלך #{orderId}</h1>
                    <h2>תודה שבחרת בנו לביצוע ההדפסה</h2>
                    <h3>נחזור אליך ממש בקרוב :)</h3>
                </div>
            }
        </>
    );
};
