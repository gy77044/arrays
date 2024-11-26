export const AllButtons = () => {
  return (
    <>
      {/* Global input with focus outline & shadow */}
      <button
       
        type="button"
        className="btn btn-md-primary"
      >
        <svg
          aria-hidden="true"
          role="status"
          className="inline mr-3 w-4 h-4 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          ></path>
        </svg>
        Loading...
      </button>
      <button
       
        type="button"
        className="btn btn-md-outlineprimary"
      >
        <svg
          aria-hidden="true"
          role="status"
          className="inline mr-2 w-4 h-4 text-gray-300 animate-spin hover:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#069FB1"
          ></path>
        </svg>
        Loading...
      </button>

      <button className="group relative py-3.5 px-7 uppercase overflow-hidden rounded-md bg-white shadow cursor-pointer">
        <div className="absolute inset-0 w-3 bg-gradient-to-tr from-custom-primary-dark to-custom-primary-default/80 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative font-sans text-sm font-semibold text-custom-primary-default group-hover:text-white">
          Proceed!
        </span>
      </button>

      <button className="btn btn-sm-primary">Primary Small</button>
      <button className="btn btn-md-primary">Primary Medium</button>
      <button className="btn btn-lg-primary">Primary Large</button>
      <button className="btn btn-sm-outlineprimary">
        Primary Outline Small
      </button>
      <button className="btn btn-md-outlineprimary">
        Primary Outline Medium
      </button>
      <button className="btn btn-lg-outlineprimary">
        Primary Outline Large
      </button>
      <button className="btn btn-link">Link</button>

      <div className="btn-main">
        <button className="col-span-12 btn btn-md-primary">
          Full Width Button
        </button>
      </div>
      <div className="btn-main">
        <button className="col-span-2 btn btn-sm-outlineprimary">
          Full Width Button
        </button>
        <button className="col-span-2 btn btn-md-primary">
          Full Width Button
        </button>
      </div>
      <button className="btn-md-primary btn" disabled>
        Primary Disabled
      </button>
    </>
  );
};

export interface IButtonProps{
  className?:string
  type?:"submit" | "reset" | "button" | undefined; 
  id?:string 
  name?:string|JSX.Element 
  onClick?:React.MouseEventHandler<HTMLButtonElement>
  disabled?:boolean
}

export const Button = (props:IButtonProps) =>{
  return (
  <>
    <button className={props.className} type={props.type} id={props.id} onClick={props.onClick} disabled={props.disabled} >{props.name}</button>
  </>
  )
}