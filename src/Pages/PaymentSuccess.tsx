
import '../Styles/PaymetSuccess.css'; 

import { CSSTransition } from 'react-transition-group';

import HomeLayout from '../Layouts/HomeLayout';



const PaymentSuccess = () => {
  return (
    <>
    <HomeLayout>
    <div className="flex justify-center items-center h-96">
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-700">Thank you for Book the Ticket.</p>
        </div>
      </CSSTransition>
    </div>
    </HomeLayout>
    </>
  );
};

export default PaymentSuccess;
