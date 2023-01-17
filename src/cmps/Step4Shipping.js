import { LoadingButton } from "@mui/lab"
import { useTranslation } from "react-i18next";

export const Step4Shipping = ({next}) => {

    const { t } = useTranslation(['step3']);
    return (
         <LoadingButton
            variant="contained"
            color="blue"
            className="whiteText"
            
           
            onClick={() => next()}
        >
            {t('checkout')}
        </LoadingButton>
    )
}