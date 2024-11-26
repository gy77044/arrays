import React, { FC, ReactNode, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css'; 
import Toast from './Toast';
import { IconErrorPage } from '../../assests/icons/Icons';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const handleErrors = () => {      
      Toast({messageText:"Something wrong happen", messageType:"E", toastId:"abc"});
      setHasError(true);
    };

    window.addEventListener('error', handleErrors);

    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);  
  if (hasError) {
    return (
       <>
       <div className="grid h-screen place-content-center bg-white px-4 relative z-20">
       <div className="text-center flex flex-col ">
       <IconErrorPage />
       <h1 className="heading-lg-bold mt-6 ">Uh-oh!</h1>
       <p className="para-lg text-gray-500 m-2">Something went wrong!</p>
       <div className='flex gap-[10px]'>
       <button className="light-md-btn" type="button" onClick={()=>window.location.href='/Partner/Dashboard'}>Go Back Home</button>
       <button className="dark-md-btn" type="button" onClick={()=>window.location.reload()}>Reload Page</button>
       </div>
      </div>
      </div>
        </>
    )
  }
  return <>{children}</>;
};

export default ErrorBoundary;