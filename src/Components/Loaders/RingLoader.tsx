const RingLoader = ({opacity,color}:{opacity?:string,color?:string}) => {
  return (
    <div className={`absolute w-full h-full bg-primary-500/60 left-0 top-0`} style={{ zIndex: 500000, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white">
        <svg fill={color || 'none'} className="w-[12vh] animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
          <path clipRule='evenodd'
            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
            fill={color || 'currentColor'} fillRule='evenodd' />
        </svg>
      </div>
    </div>
  );
};

export default RingLoader;
