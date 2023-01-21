import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentForm} from "./PaymentForm";
import {useState, useEffect} from "react";
import onDemandService from "../services/onDemandService";
import {useTranslation} from "react-i18next";

const Step5Payment = ({apikey, totalPrice, currencyCode, next, items, filesPrintSettings, shippingData}) => {

  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY;
  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  const { t } = useTranslation();
  const [clientSecretState, setClientSecretState] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const createNewPaymentIntent = async () => {
    const res = await onDemandService.createNewPaymentIntent(
        totalPrice,
        currencyCode,
        shippingData.emailValue,
        apikey
    );
    setClientSecretState(res.clientSecret);
  };

  useEffect(() => {
    createNewPaymentIntent()
        .then(() => setIsloading(false))
  }, []);


  const extractFiles = () => {
    return items.map(model => {
      return {
        ...model,
        price: Math.ceil(model.price),
        color: filesPrintSettings[model.uuid].printSettings.color,
        material: filesPrintSettings[model.uuid].printSettings.material,
        layerHeight: filesPrintSettings[model.uuid].printSettings.resolution,
        isVase: !!filesPrintSettings[model.uuid].printSettings.isVase,
        isSupports: !!filesPrintSettings[model.uuid].printSettings.isSupports,
        infill: filesPrintSettings[model.uuid].printSettings.infill,
      };
    });
  }

  const onSuccess = (paymentId) => {
    const data = {
      paymentId: paymentId,
      email: shippingData.emailValue,
      currencyCode: currencyCode,
      amount: totalPrice,
      shipping: shippingData,
      data: extractFiles()
    };

    onDemandService.createOrder(data, apikey).then(next);
  }

  return (
      <>
        Strip payments!!!
        <div className="stripe-and-tag">
          <div className="stripe-form">
            {!isloading &&
                <Elements
                    stripe={stripeTestPromise}
                    options={{
                      clientSecret: clientSecretState,
                      appearance: {
                        theme: 'flat',
                        labels: 'floating',
                      },
                    }}
                >
                  <PaymentForm
                      totalPrice={
                        totalPrice
                      }
                      onSuccessPayment={onSuccess}
                  />
                </Elements>}
          </div>
        </div>
      </>
  );
};

export default Step5Payment;