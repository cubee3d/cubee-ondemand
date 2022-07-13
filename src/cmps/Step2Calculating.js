import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import analyzing from '../assets/images/analyzing.json';

export const Step2Calculating = ({isDesktop}) => {
    const { t } = useTranslation(['step2']);

    return (
        <>
            <h2>{t('analyzingTitle')}</h2>
            <p>{t('analyzingP')}</p>
            <p>{t('analyzingP2')}</p>
            <div
                style={{
                    margin: 'auto',
                    height: isDesktop? 550 : 200,
                    width: isDesktop? 550 : 200,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                }}
            >
                <Lottie animationData={analyzing} loop={true} autoPlay={true} />
            </div>
        </>
    );
};
