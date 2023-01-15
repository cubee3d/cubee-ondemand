import React, { useEffect, useState, useContext } from 'react';
import {
    useElements,
    useStripe,
    PaymentElement,
} from '@stripe/react-stripe-js';
import LoadingButton from '@mui/lab/LoadingButton';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';
import Lottie from 'lottie-react';

export const PaymentForm = ({ totalPrice, onSuccessPayment }) => {
    const notificationHandler = useContext(SnackbarHandlerContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [isStripeRady, setStripeReady] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setIsLoadingPayment(true);

        const res = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/',
            },
            redirect: 'if_required',
        });

        if (res.error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            switch (res.error.code) {
                case 'incomplete_number':
                case 'incomplete_expiry':
                case 'incomplete_cvc':
                    notificationHandler.warning('יש למלא את כל השדות');
                    break;
                case 'invalid_number':
                case 'invalid_expiry':
                case 'invalid_cvc':
                    notificationHandler.warning('יש לוודא את תקינות המספרים');
                    break;
                case 'card_declined':
                    notificationHandler.error('התקבל סירוב בכרטיס');
                    break;
                default:
                    notificationHandler.error('אירעה שגיאה בעת ביצוע החיוב');
            }
            setIsLoadingPayment(false);
        } else {
            onSuccessPayment(res.paymentIntent.id);
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <>
            {!isLoading ? (
                <form onSubmit={handleSubmit}>
                    <PaymentElement
                        onReady={() => setStripeReady(true)}
                        id="payment-element"
                        children
                        options={{
                            terms: {
                                auBecsDebit: 'never',
                                bancontact: 'never',
                                card: 'never',
                                ideal: 'never',
                                sepaDebit: 'never',
                                sofort: 'never',
                                usBankAccount: 'never',
                            },
                        }}
                    />
                    <LoadingButton
                        sx={{ width: '40%' }}
                        loading={isLoadingPayment}
                        className="pay-btn"
                        type="submit"
                        variant="contained"
                        color="cubee"
                        disabled={!isStripeRady}
                        size="large"
                    >
                        {`שלם ₪${totalPrice}`}
                    </LoadingButton>
                </form>
            ) : (
                <div className="loader2">
                    <Lottie
                        loop={true}
                        autoPlay={true}
                    />
                </div>
            )}
        </>
    );
};
