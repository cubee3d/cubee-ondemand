import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentForm} from "./PaymentForm";
import {useState, useEffect} from "react";
import onDemandService from "../services/onDemandService";

const Step5Payment = ({apikey, email, totalPrice, currencyCode, next}) => {

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


  const onSuccess = (paymentId) => {
    console.log("totalPrice: " + totalPrice + ", currency: " + currencyCode + ", email: " + email + ". paymentId: " + paymentId);
    onDemandService.createOrder(totalPrice, currencyCode, email, paymentId).then(next);

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