import { useAppSelector } from '../../ReduxTool/store/hooks'

const FileReader = () => {
  const csvData = useAppSelector(state=>state.wheatherslice.csvData)
  return (
    <div>
      
        <div className="table-main">
        <div className="table-name">Weather Details</div>
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="hvalue">Name</th>
              <th className="hvalue">Details</th>
            </tr>
          </thead>
          <tbody>
          {csvData.map((item:any, index:number) => (
        <div key={index}>
          {Object.keys(item).map((key, subIndex) => (
            <tr key={subIndex}>
              <td className="rheading">{key}</td>
               <td className="rvalue">  {item[key]}  </td>
            </tr>
          ))}
        </div>
      ))}
 
          </tbody>
        </table>
        {/* <div className="table-footer">
                <button className="light-sm-btn">
                    Add Obstruction
                </button>
            </div> */}
      </div>
    </div>
  )
}

export default FileReader