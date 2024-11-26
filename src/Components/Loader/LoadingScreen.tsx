import "../../assests/scss/AllComponents.scss";

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center h-[93vh] w-[97vw] bg-black relative">
            <div className="flex space-x-2 p-5 rounded-full justify-center items-center">
                <div className="bg-primary-600 p-1 w-[2vh] h-[2vh] rounded-full animate-bounce circle-one"></div>
                <div className="bg-primary-800 p-1 w-[2vh] h-[2vh] rounded-full animate-bounce circle-two"></div>
                <div className="bg-white p-1 w-[2vh] h-[2vh] rounded-full animate-bounce circle-three"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
