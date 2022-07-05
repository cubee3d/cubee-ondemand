/* global StlViewer */

import { Button } from '@mui/material';
import { useState, useRef, useEffect, } from 'react'
import { useTranslation } from 'react-i18next';
import { ViewerLoader } from './ViewerLoader';
const style = {
    top: 0,
    left: 0,
    width: '600px',
    height: '600px',
    numWidth: 600,
    numHeight: 600,
    marginTop: 10,
};

export const Step2STLViewer = ({
    selectedFile,
    stlViewerColor,
    isLoadedViewer,
    setIsLoadedViewer,
    triggerResetViewer
}) => {
    const { t } = useTranslation(["step2"])
    const [stlViewer, setStlViewer] = useState(null)
    const [initialCamera, setInitialCamera] = useState(null)
    const [isAnimating, setIsAnimating] = useState(true)
    const divRef = useRef(null);

    const resetCamera = () => {
        if (stlViewer) stlViewer.set_camera_state(initialCamera)
    }
    const toggleAnimation = () => {
        // isAnimating ?
        //     stlViewer.animate_model(1, { animation: null }) :
        //     stlViewer.animate_model(1, { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, })
        setIsAnimating(!isAnimating)
    }
    const onModelClick = () => {
        // stlViewer.animate_model(1, { animation: null })
    }
    const onModelRelease = () => {
        // if (isAnimating) stlViewer.animate_model(1, { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, })
    }

    const onModelLoaded = (stlViewer1) => {
        setIsLoadedViewer(true)
        setInitialCamera(stlViewer1.get_camera_state())
        setStlViewer(stlViewer1);
        setIsLoadedViewer(true)
        // setTimeout(()=>{
        //     stlViewer1.animate_model(1, { delta: { rotationx: 1, rotationy: 1.1, rotationz: 1.2, msec: 8000, loop: true }, })
        // },800)
        console.log('model loaded');
        window.viewer = stlViewer1
    }

    useEffect(() => {
        if (isLoadedViewer) {
            resetCamera()
        }
    }, [triggerResetViewer])

    useEffect(() => {
        if (stlViewer) {
            stlViewer.clean()
            // stlViewer.set_camera_state(initialCamera)
            // stlViewer.dispose()
            // document.querySelector('canvas').remove()
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
            all_loaded_callback: () => onModelLoaded(stlViewer1)

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


    useEffect(() => {
        const updateColor = () => {
            if (stlViewer) {
                stlViewer.set_color(1, stlViewerColor);
            }
        }
        updateColor()
    }, [stlViewerColor])

    return (
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
    )
}