
import React, { useEffect, useState } from "react";
import { IconDelete, IconSave } from "../../assests/icons/MapToolsIcons";
import { IconEdit } from "../../assests/icons/DrawerIcons";
interface TableRow {
  id: number;
  Name: string;
  Size1: string;
}

const getIdName = (id: number) => `input${id}`

const initialData: TableRow[] = [
  { id: 1, Name: "John Doe", Size1: "10x20x30" },
  { id: 2, Name: "John Doe", Size1: "10x20x30" },
  { id: 3, Name: "John Doe", Size1: "10x20x30" },
  { id: 4, Name: "John Doe", Size1: "10x20x30" },
  { id: 5, Name: "John Doe", Size1: "10x20x30" },
  { id: 6, Name: "John Doe", Size1: "10x20x30" },
  { id: 7, Name: "John Doe", Size1: "10x20x30" },
];

const EditableTable: React.FC = () => {
  const [showEdit, setShowEdit] = useState('')
  // const initialData: Row[] = [
  //   { id: 1, name: 'Row 1', description: 'Description 1' },
  //   { id: 2, name: 'Row 2', description: 'Description 2' },
  //   { id: 3, name: 'Row 3', description: 'Description 3' },
  //   // Add more rows as needed
  // ];

  const [data, setData] = useState<TableRow[]>(initialData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<TableRow | null>(null);

  const handleEdit = (index: number, eleName: string) => {
    setEditIndex(index);
    setEditedRow({ ...data[index] });
    if(eleName){
      setShowEdit(eleName)
    }
    
  };

  const handleSave = (index: number) => {
    if (editedRow) {
      const updatedData = [...data];
      updatedData[index] = editedRow;
      setData(updatedData);
      setEditIndex(null);
      setEditedRow(null);
      setShowEdit("")
    }
  };

  const handleDelete = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof TableRow
  ) => {
    if (editedRow) {
      setEditedRow({
        ...editedRow,
        [key]: e.target.value,
      });
    }
  };


  useEffect(() => {

    if(showEdit !== ""){
      (document.getElementById(showEdit) as HTMLInputElement).focus()
    }

  }, [showEdit])

  const renderTableRows = () => {
    return data.map((row, index) => {
      const idName = getIdName(index);
      return (
        <tr key={row.id} className="trow">
        {editIndex === index ? (
          <>
            <td className="rvalue p-0 m-0">
              <input
                id={idName}
                className="w-[7vh] p-0 m-0 h-fit bg-grey-600"
                type="text"
                value={editedRow ? editedRow.Name : ""}
                onChange={(e) => handleInputChange(e, "Name")}
              />
            </td>
            <td className="rvalue p-0 m-0">
              <input
                className="w-[7vh]  p-0 m-0 h-fit bg-grey-600"
                type="text"
                value={editedRow ? editedRow.Size1 : ""}
                onChange={(e) => handleInputChange(e, "Size1")}
              />
            </td>
            <td className="rvalue p-0 m-0">
              <button className="" onClick={() => handleSave(index)}><IconSave/></button>
            </td>
          </>
        ) : (
          <>
            <td className="rvalue w-[8vh] p-0 m-0">{row.Name}</td>
            <td className="rvalue w-[8vh] p-0 m-0">{row.Size1}</td>
            <td className="rvalue flex p-0 m-0">
              <button onClick={() => handleEdit(index, idName)} className=""><IconEdit/></button>
              <button onClick={() => handleDelete(index)} className=""><IconDelete/></button>
            </td>
          </>
        )}
      </tr>
      )
    });
  };

  return (
    <table className="table">
      <thead className="thead">
        <tr>
          <th className="hvalue p-0 m-0">Name</th>
          <th className="hvalue p-0 m-0">Description</th>
          <th className="hvalue p-0 m-0">Actions</th>
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};

export default EditableTable;
