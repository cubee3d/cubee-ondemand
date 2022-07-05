import { useState, useRef, useEffect, useContext } from 'react';
import { Button, Tooltip, Typography, Popover, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import analyzing from '../assets/images/analyzing.json';

export const Step2Calculating = () =>{
    const { t } = useTranslation(["step2"])
    return(
        <>
        <h2>{t('analyzingTitle')}</h2>
        <p>{t('analyzingP')}</p>
        <p>{t('analyzingP2')}</p>
        <div style={{
            margin: 'auto',
            height: 550,
            width: 550,
            left: 0,
            right: 0,
            textAlign: "center"
        }}>
            <Lottie animationData={analyzing} loop={true} autoPlay={true} />
        </div>
        </>
    )
}