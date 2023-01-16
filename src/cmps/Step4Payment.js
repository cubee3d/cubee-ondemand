import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentForm} from "./PaymentForm";
import {useState} from "react";
import onDemandService from "../services/onDemandService";

const Step4Payment = ({apikey, email}) => {

  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY;
  const stripeTestPromise = loadStripe(PUBLIC_KEY);


  const [clientSecretState, setClientSecretState] = useState(null);

  const createNewPaymentIntent = async () => {
    const res = await onDemandService.createNewPaymentIntent(
        100,
        "USD",
        email,
        apikey
    );
    setClientSecretState(res.clientSecret);
  };

  createNewPaymentIntent();

  return (
      <>
        Strip payments!!!
        <div className="stripe-and-tag">
          <div className="stripe-form">
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
                      100
                  }
                  onSuccessPayment={() => {}}
              />
            </Elements>
          </div>
        </div>
      </>
        );
};

export default Step4Payment;