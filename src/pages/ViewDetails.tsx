import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Hud from "../components/hud";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"




function ViewDetails() {
const {operationid} = useParams();
const navigate = useNavigate();

type Operation = {
  id: number | string;
  name: string;
  details: string;
  amount: number;
  date: string;
  type: string;
  category: string;
}


const [operation, setOperation] = useState<Operation | undefined>(undefined);

 
useEffect(()=>{
fetch("http://localhost:8000/operations/" + operationid)
.then((res)=>res.json())
.then((data)=>setOperation(data))
.catch((err)=>console.log(err.message))
}, [operationid]);

const deleteField=(id: string | number)=>{
    if(window.confirm("Are you sure you want to delete this field id: "+ id))
    {fetch("http://localhost:8000/operations/" + id, {
    method: 'DELETE',
    })
    .then(()=>{alert("Removed student data successfully");})
    .then(()=>navigate("/details"))
    .catch((err)=>console.log(err.message))}
}

  return (
    <>
        <Hud isHome={false}></Hud>
        <div className="fixed inset-0 overflow-y-auto px-4 pt-6 pb-32">
            <div className="flex flex-col bg-neutral-700 border-t-4 border-neutral-800 p-4 rounded-xl w-full max-w-md mx-auto justify-center text-black">
                <h1 className="text-xl font-bold text-neutral-100 m-2">View Operation Details</h1>
                { operation && 
                <Table>
                    <TableBody>
                        <TableRow className='hover:bg-neutral-600'>
                            <TableCell className="font-medium text-left text-neutral-300">ID: </TableCell>
                            <TableCell className='text-left font-semibold'>{operation.id}</TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-neutral-600' >
                            <TableCell className="font-medium text-left text-neutral-300">Operation Name: </TableCell>
                            <TableCell className='text-left font-semibold'>{operation.name}</TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-neutral-600' >
                            <TableCell className="font-medium text-left text-neutral-300">Details: </TableCell>
                            <TableCell className='text-left font-semibold'>{operation.details}</TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-neutral-600' >
                            <TableCell className="font-medium text-left text-neutral-300">Date: </TableCell>
                            <TableCell className='text-left font-semibold'>{new Date(operation.date).toLocaleDateString('es-ES')}</TableCell>
                        </TableRow>
                        <TableRow className='hover:bg-neutral-600' >
                            <TableCell className="font-medium text-left text-neutral-300">Hour: </TableCell>
                            <TableCell className='text-left font-semibold'>{new Date(operation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</TableCell>
                        </TableRow>
                        <TableRow  className='hover:bg-neutral-600' >
                            <TableCell className="font-medium text-left text-neutral-300">Category: </TableCell>
                            <TableCell className='text-left font-semibold'>{operation.category[0].toUpperCase() + operation.category.slice(1)}</TableCell>
                        </TableRow>
                        <TableRow  className='hover:bg-neutral-600' >
                            <TableCell className="font-medium text-left text-neutral-300">Type: </TableCell>
                            <TableCell className='text-left font-semibold'>{operation.type.replace(/(^|-)(\w)/g, (_, sep, char) => (sep ? ' ' : '') + char.toUpperCase()).trim()}</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>}
                {operation && 
                <div className="flex justify-between mt-4">
                    <Button className="text-neutral-100" onClick={()=>navigate("/details")}>BACK</Button>
                    <Button className="text-neutral-100" onClick={()=>navigate(`/details/edit/${operation.id}`)}>EDIT</Button>
                    <Button className="text-red-400" onClick={()=>deleteField(operation.id)}>DELETE</Button>
                </div>}
                
            </div>
        </div>
    </>
  )
}

export default ViewDetails