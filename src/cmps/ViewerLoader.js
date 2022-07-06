import Lottie from 'lottie-react';
import printer from '../assets/images/lottie.json';

export const ViewerLoader = () => {
    return (
        <div
            style={{
                position: 'absolute',
                margin: 'auto',
                left: 0,
                right: 0,
                textAlign: 'center',
            }}
        >
            <Lottie animationData={printer} loop={true} autoPlay={true} />
        </div>
    );
};
