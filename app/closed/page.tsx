import React from 'react';


const Modal = () => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div className="bg-white rounded-lg flex flex-col  shadow-lg max-w-lg w-full p-6">
        <div className="">
            <img src="/uniuyo-logo.png" alt="logo" className='mx-auto w-32' />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-10">Biometric Portal Maintenance</h2>
        <p className="mb-4 text-center font-semibold text-lg">
          The Biometric portal is currently under maintenance. Please check back later. We apologize for any inconvenience caused.
        </p>
        <button
          className="px-4 tracking-wider py-2 bg-orange-900 text-white rounded hover:bg-orange-600"
        >
          Thank You!
        </button>
      </div>
    </div>
  );
};

export default Modal;
