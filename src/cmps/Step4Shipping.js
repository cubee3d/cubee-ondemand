
import { useTranslation } from "react-i18next";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { Button, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { MuiTelInput } from 'mui-tel-input';
import { ArrowBack } from "@mui/icons-material";
import PaymentIcon from '@mui/icons-material/Payment';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

export const Step4Shipping = ({next , prev, setShippingData}) => {

    const privacy = "We value your privacy. The information you share with us will be used only for shipping purposes, and will not be shared with third parties. ";

    // const { t } = useTranslation(['step3']);
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => { 
        console.log(data);
        setShippingData(data);
        next();
    };

  return (
    <div className="step4-container" >  

        <div className="step4-privacy">
            <div >
                <ShieldOutlinedIcon style={{fontSize: "19px"}}/>
            </div>           
            {privacy}       
        </div>
        <div style={{display: "flex", justifyContent: "space-around"}}>
            <Box sx={{
                width: 500,
                height: 800,
                // backgroundColor: 'secondary.light',
            }}>
                <form onSubmit={handleSubmit(onSubmit)} className="step4-form" dir="ltr">
                <div>
                {/* <Divider textAlign="right" role="presentation" sx={{fontSize: '15px'}}>Contact Details</Divider> */}
                    <label className="step4-title">Contact Detailes </label>
                    <hr className="step4-hr"></hr>
                </div>
                    <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                        <Controller
                            
                            name={"firstNameValue"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField 
                                    sx={{width: '245px'}}
                                    InputLabelProps={{ shrink: true }} 
                                    onChange={onChange} 
                                    value={value? value : ""}  
                                    label={"First Name"} 
                                    size="normal" 
                                    margin="normal"
                                    required
                                    />
                            )}
                        />
                        <Controller
                            name={"lastNameValue"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField 
                                    sx={{width: '245px'}}
                                    InputLabelProps={{ shrink: true }} 
                                    onChange={onChange} 
                                    value={value? value : ""} 
                                    label={"Last Name"} 
                                    size="normal" 
                                    margin="normal"
                                    required
                                    />
                            )}
                        />
                    </div>
                    <Controller
                        name={"phoneNumberValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <MuiTelInput 
                                required
                                value={value? value : ""} 
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
                                value={value? value : ""}  
                                label={"Email"} 
                                size="normal" 
                                margin="normal"
                                type="email"
                                placeholder="ex: myname@example.com"
                                required
                                />
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
                                    value={value? value : ""}  
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
                                    value={value? value : ""}  
                                    label={"State/Province"} 
                                    size="normal" 
                                    margin="normal"/>
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
                                value={value? value : ""}  
                                label={"Street Address"} 
                                size="normal" 
                                margin="normal"
                                required
                                />
                        )}
                    />
                    <Controller
                        name={"streetAddressLine2Value"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField 
                                InputLabelProps={{ shrink: true }} 
                                onChange={onChange} 
                                value={value? value : ""}  
                                label={"Street Address Line 2"} 
                                size="normal" 
                                margin="normal"/>
                        )}
                    />
                    <Controller
                        name={"zipCodeValue"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField 
                                InputLabelProps={{ shrink: true }} 
                                onChange={onChange} 
                                value={value? value : ""}  
                                label={"Postal/Zip Code"} 
                                size="normal" 
                                margin="normal"
                                required
                                />
                        )}
                    />
                    {/* <div style={{fontSize: "16px", padding: "13px"}}>
                        Toltal price including shipping: ${price}
                    </div> */}
                    
                    <div className="step4-btns">
                        <Button style={{fontSize: "13px"}}
                            size="large"
                            color="black"
                            startIcon={<ArrowBack />} 
                            variant="outlined" 
                            onClick={() => {prev()}}
                            >
                                Back
                        </Button>
                        <Button 
                            size="large"
                            sx={{color: "white"}}
                            startIcon=
                                {<PaymentIcon style={{color: "white", fontSize: "22px"}}/>}  
                            variant="contained" 
                            type="submit" >
                            <span style={{color: "white", fontSize: '13px'}}>Continue to Check-Out</span> 
                                
                        </Button>
                    </div>
                </form>
                
                
            </Box>
        </div>
    </div>
  );


}