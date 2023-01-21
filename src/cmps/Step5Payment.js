import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentForm} from "./PaymentForm";
import {useState, useEffect} from "react";
import onDemandService from "../services/onDemandService";

const Step5Payment = ({apikey, email, totalPrice, currencyCode, next, items, filesPrintSettings, shippingData}) => {

  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY;
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  const [clientSecretState, setClientSecretState] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const createNewPaymentIntent = async () => {
    const res = await onDemandService.createNewPaymentIntent(
        totalPrice,
        currencyCode,
        email,
        apikey
    );
    setClientSecretState(res.clientSecret);
  };

  useEffect(() => {
    createNewPaymentIntent()
        .then(() => setIsloading(false))
  }, []);


  // const extractFiles = () => {
  //   return filesSlicedInfo.map(model => {
  //     let printTime;
  //     printTime = Math.floor(model.printTime) > 0 ? Math.floor(model.printTime) : '';
  //     printTime = Math.floor(model.printTime) > 0 ? (printTime += t('hours')) : (printTime);
  //     printTime += Math.floor(Number((model.printTime - Math.floor(model.printTime)).toFixed(2))
  //         * 60);
  //     printTime += t('minutes');
  //     return {
  //       ...model,
  //       printTime,
  //       price: Math.ceil(model.price),
  //       color: filesPrintSettings[model.uuid].printSettings.color,
  //       material: filesPrintSettings[model.uuid].printSettings.material,
  //       layerHeight: filesPrintSettings[model.uuid].printSettings.resolution,
  //       isVase: filesPrintSettings[model.uuid].printSettings.isVase ? 'Yes' : 'No',
  //       isSupports: filesPrintSettings[model.uuid].printSettings.isSupports ? 'Yes' : 'No',
  //       infill: filesPrintSettings[model.uuid].printSettings.infill,
  //       downloadURL: `${process.env.REACT_APP_DOWNLOAD_BASE_URL}${model.fileId}`,
  //       snapshotURL: null,
  //     };
  //   });
  // }

  const onSuccess = (paymentId) => {
    console.log("info: " + items);
    console.log("filesPrintSettings: " + filesPrintSettings);
    const data = {
      paymentId: paymentId,
      email: email,
      currencyCode: currencyCode,
      amount: totalPrice,
      items: items,
      test: filesPrintSettings,
      shipping: shippingData
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