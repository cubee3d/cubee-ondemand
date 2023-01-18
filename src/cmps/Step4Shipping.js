
import { useTranslation } from "react-i18next";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { Button, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { MuiTelInput } from 'mui-tel-input';


export const Step4Shipping = ({next}) => {


    // const { t } = useTranslation(['step3']);
    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => { 
        console.log(data)
        next();
    };

  return (
    <div >        
        <Box  sx={{
            width: 500,
            height: 800,
            // backgroundColor: 'secondary.light',
        }}>
            <div>
            {/* <Divider textAlign="right" role="presentation" sx={{fontSize: '15px'}}>Contact Details</Divider> */}
                <label className="step4-title">Contact Detailes </label>
                <hr className="step4-hr"></hr>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="step4-form" dir="ltr">
                <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                    <Controller
                        name={"firstNameValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField 
                                sx={{width: '245px'}}
                                InputLabelProps={{ shrink: true }} 
                                onChange={onChange} 
                                value={value} 
                                label={"First Name"} 
                                size="normal" 
                                margin="normal"
                                required
                                />
                        )}
                    />
                    <Controller
                        name={"LasttNameValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField 
                                sx={{width: '245px'}}
                                InputLabelProps={{ shrink: true }} 
                                onChange={onChange} 
                                value={value} 
                                label={"Last Name"} 
                                size="normal" 
                                margin="normal"
                                required/>
                        )}
                    />
                </div>
                <Controller
                    name={"phoneNumberValue"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <MuiTelInput 
                            required
                            value={value} 
                            onChange={onChange}
                            forceCallingCode
                            focusOnSelectCountry
                            defaultCountry="US"
                            size="normal"
                            label={"Phone Number"} 
                            margin="normal"
                            />
                    )}
                />
                <Controller
                    name={"emailValue"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField 
                            InputLabelProps={{ shrink: true }} 
                            onChange={onChange} 
                            value={value} 
                            label={"Email"} 
                            size="normal" 
                            margin="normal"
                            type="email"
                            placeholder="ex: myname@example.com"
                            required/>
                    )}
                />
                
                <div style={{paddingTop: '20px'}}>
                    <label className="step4-title"> Delivery Address </label>
                    <hr className="step4-hr1"></hr>
                </div>
            
                <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                    <Controller
                        name={"cityValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField 
                                sx={{width: '245px'}}
                                InputLabelProps={{ shrink: true }} 
                                onChange={onChange} 
                                value={value} 
                                label={"City"} 
                                size="normal" 
                                margin="normal"
                                required
                                />
                        )}
                    />
                    <Controller
                        name={"stateValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField 
                                sx={{width: '245px'}}
                                InputLabelProps={{ shrink: true }} 
                                onChange={onChange} 
                                value={value} 
                                label={"State/Province"} 
                                size="normal" 
                                margin="normal"
                                required/>
                        )}
                    />
                </div>
              
                <Controller
                    name={"streetAddressValue"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField 
                            InputLabelProps={{ shrink: true }} 
                            onChange={onChange} 
                            value={value} 
                            label={"Street Address"} 
                            size="normal" 
                            margin="normal"
                            required/>
                    )}
                />
                <Controller
                    name={"streetAddressLine2Value"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField 
                            InputLabelProps={{ shrink: true }} 
                            onChange={onChange} 
                            value={value} 
                            label={"Street Address Line 2"} 
                            size="normal" 
                            margin="normal"
                            required/>
                    )}
                />
                <Controller
                    name={"zipCodeValue"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField 
                            InputLabelProps={{ shrink: true }} 
                            onChange={onChange} 
                            value={value} 
                            label={"Postal/Zip Code"} 
                            size="normal" 
                            margin="normal"
                            required/>
                    )}
                />

                <Button type="submit" >Submit</Button>
            </form>
               
            
        </Box>
    </div>
  );

    
    // return (
    //      <LoadingButton
    //         variant="contained"
    //         color="blue"
    //         className="whiteText"
            
           
    //         onClick={() => next()}
    //     >
    //         {t('checkout')}
    //     </LoadingButton>
    // )

}