import { useEffect, useState } from 'react';
import Hud from '../components/hud'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom";



function OperationsTable() {
  const navigate = useNavigate();
  type OperationType = {
    id: number;
    name: string;
    details: string;
    amount: number,
    date: string,
    type: string,
    category: string
  }

  const [operations, setOperations] = useState<OperationType[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/operations")
    .then((res)=>res.json())
    .then((data)=>setOperations(data))
    .catch((err)=> console.log(err.message))
  }, []
  )
  const total = operations.reduce((acc, op) => {
    return op.type === "income" ? acc + op.amount : acc - op.amount;
  }, 0);

  return (
    <>
      <Hud isHome={false} />
      <div className="fixed inset-0 overflow-y-auto px-4 pt-6 pb-32">
        <div className="flex flex-col bg-neutral-700 border-t-4 border-neutral-800 p-4 rounded-xl w-full max-w-md mx-auto justify-center text-black">
            <Table>
            <TableCaption>A list of your recent operations.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {operations && operations.map((operation) => (
               


                  <TableRow key={operation.id} className='hover:bg-neutral-600' onClick={()=>navigate(`/details/view/${operation.id}`)}>
                      <TableCell className="font-medium text-left">{operation.name}</TableCell>
                      <TableCell className='text-left'>{operation.date.slice(0,10)}</TableCell>
                      <TableCell className='text-left '>{operation.category[0].toUpperCase() + operation.category.slice(1)}</TableCell>
                      <TableCell className="text-right">{
                      operation.type === "income" ? <><p className='text-green-500'>+ {operation.amount}</p></> 
                      :  <><p className='text-red-500'>- {operation.amount}</p></>}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{total}</TableCell>
                </TableRow>
            </TableFooter>
            </Table>
        </div>
      </div>

  
    </>
  )
}

export default OperationsTable