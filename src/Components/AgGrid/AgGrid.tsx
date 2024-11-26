import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AgGridResponseType, defaultColDef, gridOptions } from '../../Utils/Const';

interface AgGridPropsType {
  rows?: number;
  colDefs: any;
  maxHeight?: number;
  isGridUpdate: number;
  getTableData: (page: number, rows:number) => Promise<AgGridResponseType<any[]>>;
}
const AgGrid: React.FC<AgGridPropsType> = ({ rows = 10, colDefs,getTableData, maxHeight,isGridUpdate }) => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableHeight,setTableHeight] = useState<number>();
  const getRows = async (params: any) => {
    setLoading(true);
    const page = Math.floor(params.startRow / rows); // Calculate page number
    try {
      const {data,total}  = await getTableData(page, rows);
      let length = (data.length>0 && page == 0)?data.length:(data.length>0&&page>0)?10:1 
      // let length = data.length>0?data.length:1
      let tabelHeight = (98+(length * 61)); 
      
      setTableHeight(tabelHeight);
      data.length ? gridApi?.hideOverlay() : gridApi?.showNoRowsOverlay();      
      params.successCallback(data,total);
    } catch (err) {
      gridApi?.showNoRowsOverlay();
      params.successCallback([], 0);
    } finally {
      setLoading(false);
    }
  };

  const dataSource = {
    getRows: (params: any) => getRows(params)
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi,isGridUpdate]);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    params.api.setDatasource(dataSource);
  };

  const skeletonCellRenderer = () => <Skeleton />;
  const updatedColDefs = colDefs.map((colDef: any) => ({
    ...colDef,
    cellRenderer: loading ? skeletonCellRenderer : gridApi == null ? skeletonCellRenderer : colDef.cellRenderer,
  }));

  return (
    <div style={{ position: 'relative' }}>
      <div className="ag-theme-alpine my-1" style={{ height:(maxHeight && tableHeight!>maxHeight) ? maxHeight+"px" : tableHeight+'px' }}>
        {/* <AgGridReact rowSelection="multiple" paginationPageSizeSelector={[10,20,30,50,100]} gridOptions={gridOptions} columnDefs={updatedColDefs} defaultColDef={defaultColDef} animateRows={true} pagination={true} rowModelType="infinite" paginationPageSize={rows} cacheBlockSize={rows} onGridReady={onGridReady}/> */}
        <AgGridReact overlayLoadingTemplate="Loading..." paginationPageSizeSelector={[10,20,30,50,100]} rowSelection="multiple" gridOptions={gridOptions}  columnDefs={updatedColDefs} defaultColDef={defaultColDef} animateRows={true} pagination={true} rowModelType="infinite" paginationPageSize={rows} cacheBlockSize={rows} onGridReady={onGridReady}/>
      
      </div>
    </div>
  );
};

export default AgGrid;

