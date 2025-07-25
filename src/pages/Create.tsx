
import Hud from "../components/hud"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"
import { Calendar22 } from "@/components/calendar22";
import { ComboBoxResponsiveType } from "@/components/combobox-responsive-type";
import { ComboBoxResponsiveCategory } from "@/components/combobox-responsive-category";
import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"





function Create() {


  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [operationName,setOperationName] = useState("");
  const [details,setDetails] = useState("");
  const [operationMoney,setOperationMoney] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChangeType = (value: string | undefined) => {
  if (value !== undefined) {
    setSelectedType(value);
    }
  };
  const handleChangeCategory = (value: string | undefined) => {
  if (value !== undefined) {
    setSelectedCategory(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedDate || !selectedType || !selectedCategory){
      setErrorMessage(true);
      return;
    }
    const newOperation = {
      name: operationName,
      details: details,
      amount: parseFloat(operationMoney),
      date: selectedDate,
      type: selectedType,
      category: selectedCategory,
    };
    fetch("http://localhost:8000/operations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOperation),
    })
    .then(()=>navigate("/"))
    .catch((err)=>console.log(err.message))
  };

  return (
    <>
    <Hud isHome={false}></Hud>
    <div className="fixed inset-0 overflow-y-auto px-4 pt-6 pb-32">
      <div className="flex flex-col bg-neutral-700 border-t-4 border-neutral-800 p-4 rounded-xl w-full max-w-md mx-auto justify-center text-black">
          {errorMessage && (
                <div className="grid w-full max-w-xl items-start justify-center gap-4">
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Please fill in Date, Type, and Category.</AlertTitle>
                  </Alert>
                </div> 
          )}
              <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 m-2 text-neutral-100">Add a new operation</h1>
              <form onSubmit={handleSubmit} >
               

                  <div className="mb-6 mt-2">
                      <div className="grid w-full max-w-sm items-center gap-3">
                          <Label htmlFor="text" className="label-form">Operation Name</Label>
                          <Input type="text" id="operationName" placeholder="e.g.: Weekly shop "  required value={operationName} onChange={e => setOperationName(e.target.value)} />
                      </div>
                  </div>
                  <div className="mb-6">
                      <div className="grid w-full gap-3">
                          <Label htmlFor="details" className="label-form">Details</Label>
                          <Textarea placeholder="e.g.: Ice cream, bread, cereal and milk" id="details"  required value={details} onChange={e => setDetails(e.target.value)}/>
                      </div>
                  </div>
                  <div className="mb-6">
                      <div className="grid w-full max-w-sm items-center gap-3">
                          <Label htmlFor="money" className="label-form">Money</Label>
                          <Input type="number" id="operationMoney" placeholder="21.75"  required value={operationMoney} onChange={e => setOperationMoney(e.target.value)}/>
                      </div>
                  </div>
                  <div className="mb-6 ">
                      <Calendar22 value={selectedDate} onChange={setSelectedDate}></Calendar22>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <ComboBoxResponsiveType onChange={handleChangeType}></ComboBoxResponsiveType>
                    <ComboBoxResponsiveCategory  onChange={handleChangeCategory}></ComboBoxResponsiveCategory>
                  </div>
                  
                <div className="flex content-between">
                  <Button className="text-neutral-50 m-2">SAVE</Button>
                  <Button className="text-neutral-50 m-2 ">BACK</Button>
                </div>
              </form>
          </div>
        </div>
    </>
  )
}

export default Create