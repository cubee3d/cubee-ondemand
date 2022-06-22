import Lottie from 'lottie-react';
import printer from '../assets/images/lottie.json';

export const ViewerLoader = () => {
    return (

        <div style={{
            position: 'absolute',
            margin: 'auto',
            //  marginLeft: "auto",
            // marginRight: "auto",
            left: 0,
            // top: 300,
            right: 0,
            textAlign: "center"
        }}>
            <Lottie animationData={printer} loop={true} autoPlay={true} />
        </div>
    )
}