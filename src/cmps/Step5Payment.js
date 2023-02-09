import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentForm} from "./PaymentForm";
import {useState, useEffect} from "react";
import onDemandService from "../services/onDemandService";
import {useTranslation} from "react-i18next";
import { Box } from '@mui/system';
import { Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const Step5Payment = ({apikey, totalPrice, currencyCode, next, prev, items, filesPrintSettings, shippingData, filesSlicedInfo}) => {

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

  
  const [total, setTotal] = useState();

  useEffect(() => {
      let totalPrice = 0;
      filesSlicedInfo.forEach(file => {
          totalPrice += Math.ceil(file.price) * file.copies;
      });
      setTotal(totalPrice);
  }, []);

  const extractFiles = () => {
    return items.map(model => {
      return {
        copies: model["copies"],
        dimensions: model["dimensions"],
        fileId: model["fileId"],
        fileName: model["fileName"],
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
        <Box 
          sx={{
            paddingTop: 5,
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 550,
              height: 'fit-content',
            },
          }}
        >
          <Paper elevation={5} sx={{borderRadius: 3, direction: "ltr"}} >
            <div className='step5-backbtn'>
              <Button style={{fontSize: "15px"}}
                size="large"
                startIcon={<ArrowBack/>} 
                // variant="outlined" 
                onClick={() => {prev()}}
                >
                  Back
              </Button>
            </div>
             
              {filesSlicedInfo.map(file => (
                  <div
                      className="step5-container"
                      key={file.fileId}
                      sx={{         
                          '&:last-child td, &:last-child th': {
                              border: 0,
                          },
                      }}
                  >
                      <div className="step5-image">
                          <img
                              
                              src={file.snapshotURL}
                              style={{
                                  width: 45,
                                  height: 60,
                                  objectFit: 'contain',
                                  margin: 'auto',
                                  display: 'block',
                              }}
                          />{' '}
                      </div>
                        {file.fileName.length < 21 ? (
                          <div className='step5-item-name'>
                              <div>
                                {file.fileName}
                              </div>
                              <div style={{paddingTop: 10, paddingRight: 60, color: "grey"}}>
                                Qty: {file.copies}
                              </div>

                          </div>
                      ) : (
                          <div className='step5-item-name'>
                              {file.fileName.slice(0, 16)}...
                              {file.fileName.slice(-3)}
                          </div>
                      )}
                    
                      {file.copies > 1 ? (
                          <div className='step5-price'>
                            <div >
                              {t(currencyCode)}{' '}
                              {Math.ceil(file.price) * file.copies}
                            </div>
                            <div style={{paddingTop: 10, color: "grey", fontSize: 12}}>
                              {t(currencyCode)}{' '}
                              {Math.ceil(file.price)} each
                            </div>
                          </div>
                      ) : (
                          <div className='step5-price'>
                              {t(currencyCode)}{' '}
                              {Math.ceil(file.price)}
                          </div>
                      )}
                  </div>
              ))}

            <div className='step5-subtotal'>
              
              
              <div className='step5-title'>
                <div>
                  Subtotal             
                </div>
                <div>
                  {t(currencyCode)}{' '}
                  {total}
                </div>
              </div>
             <div style={{paddingLeft: '25px', paddingBottom: '10px'}}>
                <Divider width='500px'></Divider>
             </div>
             <div className='step5-title'>
               <div className='step5-title-grey'>
                Shipping (International)
              </div>
              <div className='step5-title-grey'>
                ?????
              </div>
             </div>
             <div className='step5-title'>
               <div className='step5-title-grey'>
                Sales Tax (%6.5)
              </div>
              <div className='step5-title-grey'>
                ?????
              </div>
             </div>
             <div style={{paddingLeft: '25px', paddingBottom: '10px'}}>
                <Divider width='500px'></Divider>
             </div>
             <div className='step5-title'>
                <div>
                  Total due           
                </div>
                <div>
                  ?????
                </div>
              </div>
              
                        
            
            </div>
          </Paper> 
        </Box>
        
        <Box 
          sx={{
            
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 550,
              height: 'fit-content',
            },
          }}
        >
          <Paper elevation={5} sx={{borderRadius: 3, direction: "ltr"}} >
        Payment Details
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
        </Paper>
        </Box>
      </>
  );
};

export default Step5Payment;