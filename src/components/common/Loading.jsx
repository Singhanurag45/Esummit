import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#13518e"
        ariaLabel="loading"
      />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;