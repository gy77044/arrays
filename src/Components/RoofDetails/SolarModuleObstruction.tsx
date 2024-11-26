import { showEsriDrawTool } from '../../ReduxTool/Slice/Consumer/ConsumerReducers'
import { setMapToolsTitle } from '../../ReduxTool/Slice/MapTools/MapToolsReducer'
import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import { IconInfo } from '../../assests/icons/DrawerIcons'

const SolarModuleObstruction = () => {
  const dispatch = useAppDispatch()
  const {obsArea,esriDraw} = useAppSelector(state=>state.consumerReducers.roofAnalysis)


//   useEffect(()=>{
// if(esriDraw){
//   const div = document.getElementById("showesritool")
    
      
//      if(div){
//       loadMultipleModules(["esri/widgets/Sketch"]).then(([Sketch]) => {
//         globalLayers.sketch = new Sketch({
//             view: globalLayers.view,
//             container: "showesritool",
//             title: "showesritool"
//         })        
//     })
//      }
       
// }
//   },[esriDraw])

  return (
    <>
      <div className="flex justify-between items-center text-brown-100 text-1.8xl font-medium">
        <div className="">Roof Area</div>
        <IconInfo />
      </div>
      <div className="h2"></div>
      <div className="w-full border-b-[0.1vh] border-primary-700/40" />
      <div className="h2"></div>
      
      <table className="btable">
        <thead className='bthead'>
          <tr>
            <th className="btable-heading">Name</th>
            <th className="btable-heading">Dimensions (in meter)</th>
          </tr>
        </thead>
        <tbody>
          <tr className='wbody-row'>
            <td className="wbody-heading">Usable Able</td>
            <td className="wbody-value">120</td>
          </tr>
          <tr className='wbody-row'>
            <td className="wbody-heading">Obstale Area</td>
            <td className="wbody-value">20</td>
          </tr>
          <tr className='wbody-row'>
            <td className="wbody-heading">Total Roof Area</td>
            <td className="wbody-value">140</td>
          </tr>
        </tbody>
      </table>
      <div className="h4"></div>
      <div className="flex justify-between items-center text-brown-100 text-1.8xl font-medium">
        <div className="">Roof Obstruction</div>
        <IconInfo />
      </div>
      <div className="h2"></div>
      <div className="w-full border-b-[0.1vh] border-primary-700/40" />
      <div className="h2"></div>
      <table className="border-collapse border-[0.2vh] border-grey-500 rounded-default">
        <thead>
          <tr>
            <th className="border-[0.2vh] border-grey-500 bg-black/5 text-1.2xl font-bold py-1.4 text-primary-200 w-[13vh] text-start pl-1">Obstruction Name</th>
            <th className="border-[0.2vh] border-grey-500 bg-black/5 text-1.2xl font-bold py-1.4 text-primary-200 w-[13vh] text-start pl-1">Dimensions ( in meter<sup>2</sup> )</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-[0.2vh] border-grey-500 text-1.2xl font-semibold py-1.4 text-primary-200 pl-1 ">Obstruction 1</td>
            <td className="border-[0.2vh] border-grey-500 text-1.2xl font-normal py-1.4 text-primary-200 pl-1  ">4x4x8</td>
          </tr>
        
          {/* {obsArea.map((item,i)=>{
            return(<> <tr key={i}>
              <td className="border-[0.2vh] border-grey-500 text-1.2xl font-semibold py-1.4 text-primary-200 pl-1 ">Obstruction {i+1}</td>
              <td className="border-[0.2vh] border-grey-500 text-1.2xl font-normal py-1.4 text-primary-200 pl-1 ">{item}</td>
            </tr></>)
          })} */}
        </tbody>
      </table>
      <div className="h1"></div>
      <div className='flex justify-end'>
        <button className='light-sm-btn' onClick={()=>{dispatch(showEsriDrawTool(true))
        dispatch(setMapToolsTitle("Layers"))}}>Add More</button>
      </div>
      <div className="h3"></div>

      {/* {esriDraw&& <div id="showesritool"></div>} */}
    </>
  )
}

export default SolarModuleObstruction
