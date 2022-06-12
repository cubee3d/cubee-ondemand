/* global StlViewer */

import { useState, useRef, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Tooltip, Typography, Popover, TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
const PrettoSlider = styled(Slider)(prettoSliderSettings);

export const Step2PrintSettings = ({
    onChangeFile,
    isLoading,
    printSettings,
    setPrintSettings,
    setStlViewerColor,
    stlViewerColor,
    // stlViewer,
    onCalculate,
    selectedFile,
    // setStlViewer,
}) => {

    const [stlViewer, setStlViewer] = useState(null)
    const [initialCamera, setInitialCamera] = useState(null)
    const divRef = useRef(null);
    const [isLoadedViewer, setIsLoadedViewer] = useState(false)
    const [isAnimating, setIsAnimating] = useState(true)
    const onModelLoaded = (stlViewer1) => {
        //  Here stlViewer1 is not "loaded" as well
        setIsLoadedViewer(true)
        console.log(stlViewer1, 'model loadeds');
        setInitialCamera(stlViewer1.get_camera_state())
        console.log(stlViewer1.get_camera_state());
        setStlViewer(stlViewer1);
        // window.stlViewer1=stlViewer1
    }

    useEffect(() => {
        console.log(stlViewer, 'stlviewer instacace');
        const stlViewer1 = new StlViewer(divRef.current, {
            ready_callback: e => console.log(e),
            // all_loaded_callback: (e)=> onModelLoaded(stlViewer1),
            canvas_width: '100%',
            // on_model_mouseclick: () => onModelClick(stlViewer1),
            canvas_height: '100%',
            // loading_progress_callback: loadProgress,
            model_loaded_callback: () => onModelLoaded(stlViewer1)

        });
        //here it is loaded
        console.log(stlViewer1);
        stlViewer1.add_model({
            local_file: selectedFile,
            color: stlViewerColor,
            animation: { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, }
        });
        // onModelLoaded(stlViewer1); // just testing..
        return () => console.log('unmount')
    }, []);

    const resetCamera = () => {
        console.log(initialCamera, stlViewer);
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
        if(isAnimating) stlViewer.animate_model(1, { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, }) 
    }

    const style = {
        top: 0,
        left: 0,
        width: '600px',
        height: '650px',
        numWidth: 600,
        numHeight: 650,
        marginTop: 10,
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState('');
    const handlePopoverOpen = event => {
        setPopoverContent(popovers[event.target.id]);
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
            return { ...prevForm, infill: target.value };
        });
    };
    const handleChangeRes = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, resolution: target.value };
        });
    };
    const handleChangeSupports = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, isSupports: target.checked };
        });
    };
    const handleChangeVase = ({ target }) => {
        setPrintSettings(prevForm => {
            return { ...prevForm, isVase: target.checked };
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


    return (
        <>
            <Button
                className="back-btn"
                variant="outlined"
                size="small"
                color="black"
                style={{ flex: 1, marginLeft: 'auto' }}
                startIcon={<ArrowForwardIosIcon />}
                onClick={onChangeFile}
            >
                החלפת קובץ
            </Button>
            <div className="stl-settings-cont">
                <div className="settings">
                    <div className="setting">
                        <div className="title-question-cont">
                            <h3>חומר הדפסה</h3>
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
                            <h3>אחוזי מילוי (Infill)</h3>
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
                            <h3>רזולוציה (גובה שכבה)</h3>
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
                            marks={resMarks}
                            onChange={handleChangeRes}
                            track="inverted"
                            color="blue"
                        />
                    </div>
                    <div className="setting">
                        <h3>צבע</h3>
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
                            <h3 className="inline">הוסף תמיכות</h3>
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
                            <h3 className="inline">מצב ואזה</h3>
                            <LiveHelpIcon
                                fontSize="small"
                                id="vase"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            />
                        </div>
                    </div>
                    <div className="cta-cont">
                        <Button
                            variant="link"
                            color="white"
                            onClick={onResetSettings}
                        >
                            איפוס הגדרות
                        </Button>
                        <LoadingButton
                            variant="contained"
                            color="blue"
                            className="whiteText"
                            loading={isLoading}
                            endIcon={<ThreeDRotationIcon />}
                            onClick={onCalculate}
                        >
                            המשך
                        </LoadingButton>
                    </div>
                </div>
                <div className='viewer-cont' style={{ position: 'relative', backgroundColor: '#f5f5f5', borderRadius: 20 }}>
                    <div className='viewer-btns'>
                        <Button onClick={resetCamera} variant='outlined' color='blue'>
                            אפס תצוגה
                        </Button>
                        <Button onClick={toggleAnimation} variant='outlined' color='blue'>
                            {isAnimating? "עצור אנימציה" : "הפעל אנימציה"}
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
