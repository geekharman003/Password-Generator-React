import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
   const [length,setLength] = useState(8)
   
  //  const [color,setColor] = useState("blue")
   const [numberAllowed,setNumberAllowed] = useState(false)

   const [characterAllowed,setCharAllowed] = useState(false)
   
   const [password,setPassword] = useState("")
  
   
   const passwordGenerator = useCallback(() => {
   let pass =""
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   
   if(numberAllowed){
    str +="0123456789";
   }

   if(characterAllowed){
    str +="@#$%^*~";
   }

   for(let i=1;i<=length;i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
   }
   (setPassword(pass))
   },[length,numberAllowed,characterAllowed,setPassword])
   
   const passwordRef = useRef(null)
   
   const copyToClickBoard =()=>{
    passwordRef.current?.select()
    passwordRef.current.setSelectionRange(0,2)
  window.navigator.clipboard.writeText(password)
   }


   useEffect(() => {
    passwordGenerator()
   },[length,numberAllowed,characterAllowed,passwordGenerator])
     return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-400 text-center'>
    <h1 className='mb-5 text-white '>PASSWORD GENERATOR</h1>
    <div className='flex shadow rounded-lg soverflow-hidden mb-4'>
   <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password'readOnly ref={passwordRef}/>
   <button onClick={
    copyToClickBoard
    // changeBackground
   } className='outline-none text-white px-3 py-0.5 shrink-0 bg-blue-500'
   >Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={8} max={15} value={length} className='cursor-pointer' onChange={(e)=>{
          (setLength(e.target.value))
        }} />
        <label>Length:{length}</label>
      </div>
       <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={numberAllowed}
      id='numberInput'
      onChange={()=> {
        setNumberAllowed((prev) => !prev);
      }} />
      <label>Numbers</label>
       <input type="checkbox" defaultChecked={characterAllowed}
      id='numberInput'
      onChange={()=> {
        setCharAllowed((prev) => !prev);
      }} />
      <label>Characters</label>
       </div>
    </div>
   </div>
   </>
  )
}

export default App
