import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentForm} from "./PaymentForm";

const Step4Payment = () => {

  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY;
  const stripeTestPromise = loadStripe(PUBLIC_KEY);


  // const createNewPaymentIntent = async () => {
  //   const t = currentUser.token;
  //   const res = await shopService.createNewPaymentIntent(
  //       total.totalPrice + shippingFee,
  //       t
  //   );
  //   setClientSecret(res.clientSecret);
  // };

  return (
      <>
        Strip payments!!!
        {/*<div className="stripe-and-tag">*/}
        {/*  <div className="stripe-form">*/}
        {/*    <Elements*/}
        {/*        stripe={stripeTestPromise}*/}
        {/*        options={{*/}
        {/*          // clientSecret: clientSecretState,*/}
        {/*          appearance: {*/}
        {/*            theme: 'flat',*/}
        {/*            labels: 'floating',*/}
        {/*          },*/}
        {/*        }}*/}
        {/*    >*/}
        {/*      <PaymentForm*/}
        {/*          totalPrice={*/}
        {/*              100*/}
        {/*          }*/}
        {/*          onSuccessPayment={() => {}}*/}
        {/*      />*/}
        {/*    </Elements>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </>
        );
};

export default Step4Payment;