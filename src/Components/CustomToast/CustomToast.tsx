import { ToastContainer } from 'react-toastify'
type Props = {
    ms: number
}
const CustomToast = ({ ms }: Props) => {
    return (
        <ToastContainer style={{ marginTop: "-2.2vh" }}
            autoClose={1500}
            closeOnClick
            rtl={false}
            pauseOnHover={false} />
    )
}

export default CustomToast