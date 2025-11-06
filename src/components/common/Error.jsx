import { FaExclamationTriangle } from 'react-icons/fa';

const Error = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
      <p className="text-gray-600">{message || 'Something went wrong. Please try again later.'}</p>
    </div>
  );
};

export default Error;