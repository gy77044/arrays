import { useAppSelector } from "../../ReduxTool/store/hooks";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";

const Footer = () => {
  const { scale: {  meters, feet }, zoomlevel } = useAppSelector(state => state.mapref)
  return (
    <div className="flex max-lg:flex-col items-center justify-between gap-4 px-4 py-0.5 max-lg:gap-2 max-lg:p-1">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-2 max-lg:hidden">
        <li>
          <a href="https://terranxt.com/terms-and-conditions/" className="para-sm text-gray-600">
            Terms of Service
          </a>
        </li>
        <li>
          <a href="https://terranxt.com/privacy-policy/" className="para-sm text-gray-600">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="https://terranxt.com/#contact" className="para-sm text-gray-600">
            Contact
          </a>
        </li>
      </ul>

      <p className="para-sm text-gray-600 max-lg:order-1">
        © Terranxt Pvt Ltd. All rights reserved.
      </p>
      <ul className="flex gap-x-8 gap-y-2 flex-wrap">
        <li>
          <div  className="para-sm text-gray-600">
            Zoom: 
            <span id="zoomDiv">
            {Math.round(zoomlevel)}
          </span>          
          </div>
        </li>
        <li>
          <div  className="para-sm text-gray-600">           
            Scale: {'  '}
            <span id="scale">
             {' '}{meters} m, {' '} {feet} f 
          </span>
          </div>
        </li>
        <li>
          <div  className="para-sm text-gray-600">
            Lat, Long: <span id="footer-lat">{globalLayers?.latitude?.toFixed(5)}</span>, <span id="footer-lng">{globalLayers?.longitude?.toFixed(5)}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Footer;

// function GetCoordinates() {
//   return (
//     <div className="w-[18vh]">
//       Lat, Long:
//       <span id="footer-lat">{globalLayers?.latitude?.toFixed(5)}</span>, <span id="footer-lng">{globalLayers?.longitude?.toFixed(5)}</span>
//     </div>
//   );
// }
