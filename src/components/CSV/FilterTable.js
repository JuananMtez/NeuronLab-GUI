import Table from "../Table/Table";

const FilterTable = ({preproccesings}) => {



  const columns = [
  
    { field: 'position', headerName: 'Position', width: 150, headerAlign: 'center', sortable: false},
    { field: 'preproccessing', headerName: 'Preproccessing', width: 200, headerAlign: 'center', sortable: false},
    { field: 'description', headerName: 'Description', width: 700, headerAlign: 'center', sortable: false},
  ];

  return (
    <Table columns={columns} rows={preproccesings} loading={preproccesings === undefined ? true : false} showCheck={false} height='70vh' rowPerPage={10}/>

  )
}
export default FilterTable