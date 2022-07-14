import { useContext } from 'react';
import { Button, Tooltip, TextField } from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import {
    popovers,
    initialPrintSettings,
    prettoSliderSettings,
    infillMarks,
    resMarks,
} from '../pages/consts';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';

const PrettoSlider = styled(Slider)(prettoSliderSettings);

export const Step2PrintSettings = ({
    isLoading,
    printSettings,
    currentUuid,
    setStlViewerColor,
    updateFilesPrintSettings,
    fileName,
    materials,
    colors,
    isDesktop
}) => {
    const { language } = useContext(LanguageContext);
    const { t } = useTranslation(['step2']);

    const handleChangeMaterial = material => {
        updateFilesPrintSettings(currentUuid, {
            ...printSettings,
            material,
        });
    };

    const handleChangeInfill = ({ target }) => {
        updateFilesPrintSettings(currentUuid, {
            ...printSettings,
            infill: target.value,
            isVase: false,
        });
    };

    const handleChangeRes = ({ target }) => {
        updateFilesPrintSettings(currentUuid, {
            ...printSettings,
            resolution: target.value,
        });
    };

    const handleChangeSupports = ({ target }) => {
        updateFilesPrintSettings(currentUuid, {
            ...printSettings,
            isSupports: target.checked,
            isVase: false,
        });
    };

    const handleChangeVase = ({ target }) => {
        updateFilesPrintSettings(currentUuid, {
            ...printSettings,
            isVase: target.checked,
            infill: 0,
            isSupports: false,
        });
    };

    const onChangeColor = color => {
        updateFilesPrintSettings(currentUuid, {
            ...printSettings,
            color,
        });
        setStlViewerColor(colors[color]);
    };

    const onResetSettings = () => {
        updateFilesPrintSettings(currentUuid, {...initialPrintSettings, color: t('anyColor')});
        setStlViewerColor(colors[t('anyColor')]);
    };

    const handleChangeCopies = ({ target }) => {
        if (target.value < 1) return;
        updateFilesPrintSettings(currentUuid, {
            ...printSettings,
            copies: target.value,
        });
    };

    return (
        <>
            <div className="settings">
                {fileName?.length < 20 ? (
                    <p>{fileName}</p>
                ) : (
                    <p>
                        {fileName.slice(0, 16)}...{fileName.slice(-3)}
                    </p>
                )}
                <div className="setting">
                    <div className="title-question-cont">
                        <h3>{t('material')}</h3>
                        {isDesktop && <Tooltip fontSize='large' arrow placement='top' title={popovers[language.lang].material}>
                            <LiveHelpIcon
                                fontSize="small"
                            />
                        </Tooltip>}
                    </div>
                    <div className="options">
                        {materials.map(material => {
                            return (
                                <Button
                                    variant="contained"
                                    color={
                                        printSettings.material === material
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
                        <h3>{t('infill')}</h3>
                        {isDesktop && <Tooltip fontSize='large' arrow placement='top' title={popovers[language.lang].infill}>
                            <LiveHelpIcon
                                fontSize="small"
                            />
                        </Tooltip>}
                    </div>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        marks={infillMarks}
                        onChange={handleChangeInfill}
                        value={printSettings.infill}
                    />
                </div>
                <div className="setting">
                    <div className="title-question-cont">
                        <h3>{t('res')}</h3>
                        {isDesktop && <Tooltip fontSize='large' arrow placement='top' title={popovers[language.lang].res}>
                            <LiveHelpIcon
                                fontSize="small"
                            />
                        </Tooltip>}
                    </div>
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
                {Object.keys(colors).length && (
                    <div className="setting">
                        <h3>{t('color')}</h3>
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
                                                Object.keys(colors)[idx] ===
                                                    printSettings.color
                                                    ? 'color-box active'
                                                    : 'color-box'
                                            }
                                            style={{
                                                backgroundColor: hexColor,
                                                boxShadow:
                                                    Object.keys(colors)[idx] ===
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
                )}
                <div className="setting">
                    <div className="switch-cont">
                        <Switch
                            color="blue"
                            checked={printSettings.isSupports}
                            onChange={handleChangeSupports}
                        />
                        <h3 className="inline">{t('add_supports')}</h3>
                        {isDesktop && <Tooltip fontSize='large' arrow placement='top' title={popovers[language.lang].support}>
                            <LiveHelpIcon
                                fontSize="small"
                            />
                        </Tooltip>}
                    </div>
                </div>
                <div className="setting">
                    <div className="switch-cont">
                        <Switch
                            color="blue"
                            checked={printSettings.isVase}
                            onChange={handleChangeVase}
                        />
                        <h3 className="inline">{t('vase_mode')}</h3>
                        {isDesktop && <Tooltip fontSize='large' arrow placement='top' title={popovers[language.lang].vase}>
                            <LiveHelpIcon
                                fontSize="small"
                            />
                        </Tooltip>}
                    </div>
                </div>
                <div className="setting">
                    {/* <div className="form-field"> */}
                    <h3 className="inline">{t('copies')}</h3>
                    <TextField
                        required
                        color="blue"
                        name="copies"
                        type="number"
                        min={1}
                        max={10}
                        className="copies-field"
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
                        {t('reset_settings')}
                    </Button>
                </div>
            </div>
        </>
    );
};
