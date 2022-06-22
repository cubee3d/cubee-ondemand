/* global StlViewer */

import { useState, useRef, useEffect, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';

import { Button, Tooltip, Typography, Popover, TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import {
    materials,
    popovers,
    colors,
    initialPrintSettings,
    prettoSliderSettings,
    infillMarks,
    resMarks,
} from '../pages/consts';
import Switch from '@mui/material/Switch';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { ViewerLoader } from './ViewerLoader';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';

const PrettoSlider = styled(Slider)(prettoSliderSettings);

export const Step2PrintSettings = ({
    onChangeFile,
    isLoading,
    printSettings,
    setPrintSettings,
    setStlViewerColor,
    stlViewerColor,
    onCalculate,
    selectedFile,
}) => {
    const { language, setLanguage } = useContext(LanguageContext)
    const [stlViewer, setStlViewer] = useState(null)
    const [initialCamera, setInitialCamera] = useState(null)
    const divRef = useRef(null);
    const [isLoadedViewer, setIsLoadedViewer] = useState(false)
    const [isAnimating, setIsAnimating] = useState(true)
    const notificationHandler = useContext(SnackbarHandlerContext);
    const { t } = useTranslation(["step2"])

    const onModelLoaded = (stlViewer1) => {
        setIsLoadedViewer(true)
        setInitialCamera(stlViewer1.get_camera_state())
        setStlViewer(stlViewer1);
        setIsLoadedViewer(true)
        console.log('model loaded');
    }

    useEffect(() => {
        if (stlViewer) {
            stlViewer.clean()
            stlViewer.set_camera_state(initialCamera)
            // stlViewer.dispose()
            // stlViewer.remove_model(1)
            setIsLoadedViewer(false)
            stlViewer.add_model({
                local_file: selectedFile.file,
                color: stlViewerColor,
                
                // animation: { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, }
            });

        }
        else {
            const stlViewer1 = new StlViewer(divRef.current, {
                canvas_width: '100%',
                canvas_height: '100%',
                model_loaded_callback: () => onModelLoaded(stlViewer1),
                all_loaded_callback: () => console.log('loaded file')
                // jszip_path: "./scripts/jszip.min.js",
                // jszip_utils_path: "./scripts/jszip-utils.min.js"
            });
            stlViewer1.add_model({
                local_file: selectedFile.file,
                color: stlViewerColor,
                // animation: { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, }
            });
        }

        return () => console.log('unmount debug')
    }, [selectedFile]);

    const resetCamera = () => {
        stlViewer.set_camera_state(initialCamera)
    }

    const toggleAnimation = () => {
        isAnimating ?
            stlViewer.animate_model(1, { animation: null }) :
            stlViewer.animate_model(1, { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, })
        setIsAnimating(!isAnimating)
    }

    const onModelClick = () => {
        stlViewer.animate_model(1, { animation: null })
    }
    const onModelRelease = () => {
        if (isAnimating) stlViewer.animate_model(1, { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, })
    }

    const style = {
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        numWidth: 600,
        numHeight: 600,
        marginTop: 10,
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState('');
    const handlePopoverOpen = event => {
        setPopoverContent(popovers[language.lang][event.target.id]);
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const isPopoverOpen = Boolean(anchorEl);

    const handleChangeMaterial = material => {
        setPrintSettings(prevForm => {
            return { ...prevForm, material };
        });
    };
    const handleChangeInfill = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, infill: target.value, isVase: false };
        });
    };
    const handleChangeRes = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, resolution: target.value };
        });
    };
    const handleChangeSupports = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, isSupports: target.checked, isVase: false };
        });
    };
    const handleChangeVase = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, isVase: target.checked, infill: 0, isSupports: false };
        });
    };
    const onChangeColor = color => {
        setPrintSettings(prevForm => {
            return { ...prevForm, color };
        });
        setStlViewerColor(colors[color]);
        stlViewer.set_color(1, colors[color]);
    };
    const onResetSettings = () => {
        setPrintSettings(initialPrintSettings);
        setStlViewerColor(colors[initialPrintSettings.color]);
        stlViewer.set_color(1, colors[initialPrintSettings.color]);
    };
    const handleChangeCopies = ({ target }) => {
        if (target.value < 1) return
        setPrintSettings(prevForm => {
            return { ...prevForm, copies: target.value };
        });
    }

    if (!selectedFile) return <></>
    return (
        <>
            <Button
                className="back-btn"
                variant="outlined"
                size="small"
                color="black"
                style={{ flex: 1, marginLeft: 'auto', direction: language.dir === 'ltr' ? 'rtl' : 'unset' }}
                startIcon={language.lang === 'heb' ? <ArrowForwardIosIcon /> : <></>}
                endIcon={language.lang === 'en' ? <ArrowBackIosIcon /> : <></>}
                onClick={onChangeFile}
                disabled={isLoading}
            >
                {t("replace_file")}
            </Button>
            <div className="stl-settings-cont">
                <div className="settings">
                    <div className="setting">
                        <div className="title-question-cont">
                            <h3>{t("material")}</h3>
                            <LiveHelpIcon
                                fontSize="small"
                                id="material"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            />
                        </div>
                        <div className="options">
                            {materials.map(material => {
                                return (
                                    <Button
                                        variant="contained"
                                        color={
                                            printSettings.material == material
                                                ? 'blue'
                                                : 'grey'
                                        }
                                        className={
                                            printSettings.material === material
                                                ? 'mat-btn active'
                                                : 'mat-btn'
                                        }
                                        onClick={() =>
                                            handleChangeMaterial(material)
                                        }
                                        key={material}
                                    >
                                        {material}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="setting">
                        <div className="title-question-cont">
                            <h3>{t("infill")}</h3>
                            <LiveHelpIcon
                                fontSize="small"
                                id="infill"
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
                    <div className="setting">
                        <div className="title-question-cont">
                            <h3>{t("res")}</h3>
                            <LiveHelpIcon
                                fontSize="small"
                                id="res"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            />
                        </div>
                        {/* <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> */}
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            value={printSettings.resolution}
                            min={0.1}
                            max={0.3}
                            step={0.01}
                            marks={resMarks[language.lang]}
                            onChange={handleChangeRes}
                            track="inverted"
                            color="blue"
                        />
                    </div>
                    <div className="setting">
                        <h3>{t("color")}</h3>
                        <div className="colors">
                            {Object.values(colors).map((hexColor, idx) => {
                                return (
                                    <Tooltip
                                        key={idx}
                                        title={Object.keys(colors)[idx]}
                                        arrow
                                    >
                                        <div
                                            className={
                                                Object.keys(colors)[idx] ==
                                                    printSettings.color
                                                    ? 'color-box active'
                                                    : 'color-box'
                                            }
                                            style={{
                                                backgroundColor: hexColor,
                                                boxShadow:
                                                    Object.keys(colors)[idx] ==
                                                        printSettings.color
                                                        ? `0px 0px 10px 2px ${hexColor}`
                                                        : '0px 0px 0px 0px',
                                            }}
                                            onClick={() =>
                                                onChangeColor(
                                                    Object.keys(colors)[idx]
                                                )
                                            }
                                        />
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </div>
                    <div className="setting">
                        <div className="switch-cont">
                            <Switch
                                color="blue"
                                checked={printSettings.isSupports}
                                onChange={handleChangeSupports}
                            />
                            <h3 className="inline">{t("add_supports")}</h3>
                            <LiveHelpIcon
                                fontSize="small"
                                id="support"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            />
                        </div>
                    </div>
                    <div className="setting">
                        <div className="switch-cont">
                            <Switch
                                color="blue"
                                checked={printSettings.isVase}
                                onChange={handleChangeVase}
                            />
                            <h3 className="inline">{t("vase_mode")}</h3>
                            <LiveHelpIcon
                                fontSize="small"
                                id="vase"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            />
                        </div>
                    </div>
                    <div className="setting">
                        {/* <div className="form-field"> */}
                        <h3 className="inline">{t("copies")}</h3>
                        <TextField
                            required
                            color="blue"
                            name="copies"
                            type="number"
                            min={1}
                            max={10}
                            className='copies-field'
                            value={printSettings.copies}
                            size={'small'}
                            onChange={handleChangeCopies}
                        />
                        {/* </div> */}
                    </div>
                    <div className="cta-cont">
                        <Button
                            variant="link"
                            color="white"
                            onClick={onResetSettings}
                            disabled={isLoading}
                        >
                            {t("reset_settings")}
                        </Button>
                        <LoadingButton
                            variant="contained"
                            color="blue"
                            className="whiteText"
                            loading={isLoading}
                            endIcon={<ThreeDRotationIcon />}
                            onClick={onCalculate}
                            loadingPosition="center"
                        // loadingIndicator={"מחשב"}
                        >
                            {t("continue")}
                        </LoadingButton>
                    </div>
                </div>
                <div className='viewer-cont' style={{ position: 'relative', backgroundColor: '#f5f5f5', borderRadius: 20 }}>
                    <div className='viewer-btns'>
                        <Button onClick={resetCamera} variant='outlined' color='blue'>
                            {t("reset_viewer")}
                        </Button>
                        <Button onClick={toggleAnimation} variant='outlined' color='blue'>
                            {isAnimating ? t("stop_animation") : t("start_animation")}
                        </Button>
                    </div>
                    {!isLoadedViewer && <ViewerLoader />}
                    <div className="bigdiv" style={style} ref={divRef} onMouseDown={onModelClick} onMouseUp={onModelRelease} />
                </div>
            </div>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                color="cubee"
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
    );
};
