import { useId } from 'react'
import { setMapActive } from '../../ReduxTool/Slice/Map/MapReducer'
import { setMapToolsTitle } from '../../ReduxTool/Slice/MapTools/MapToolsReducer'
import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import globalLayers, { mapLayesNames } from '../../Utils/CustomerMaps/Maps/GlobaLMap'

const List = {
  'esri': {
    name: "esri",
    image: require('../../assests/img/MapToolsImg/satelliteImg.png'),
    sel: true
  },
  'bing': {
    name: "bing",
    image: require('../../assests/img/MapToolsImg/bing.png'),
    sel: false
  }
}
const MapData = () => {
  const mapId = useId()
  const dispatch = useAppDispatch()
  const activeMapName = useAppSelector(state=> state.mapref.activeMapName)
  

 
    const handleChnage = (e:any,ele: string) => {
      // alert(ele)
      if(ele ===activeMapName){
        return
      }else{

        globalLayers.setBinglayer(ele)
       dispatch(setMapActive(ele))
          dispatch(setMapToolsTitle(""))    
      }
      
    }
 

   
  return (
    <div className='flex flex-col justify-start h-fit overflow-y-auto custom-scrollbar-css'>
        {mapLayesNames.map((ele, i) => {
          return (
            <>
              <div key={i+mapId} onClick={(e) => handleChnage(e,ele)} id={ele} className={`flex text-primary-100 items-center hover:text-white hover:bg-primary-400 p-1 ${activeMapName === ele ? "bg-primary-200 text-white" : ""}`}>
                <img className='w-[3vh] h-[3vh] rounded-full hover:border-[0.2vh] hover:border-primary-200 cursor-pointer mr-1' src={(List[ele as keyof object] as any).image} alt="" />
                <div className='text-capitalize cursor-pointer text-1.6xl '>{(List[ele as keyof object] as any).name}</div>
              </div>
            </>
          )
        })}
      </div>
  )
}

export default MapData
