import { useState , useCallback, useEffect , useRef} from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState(" ");

  //ref hook
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str+= "0123456789"
    if(characterAllowed) str+= "!@#$%^&*(){}~+-"
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  } , [length,numberAllowed,characterAllowed,setPassword])
  const copyPasswordToClipboard = useCallback(() => {passwordRef.current?.select();
    window.navigator.clipboard.writeText(password  )}, [password])

  useEffect(() => {passwordGenerator()}, [length,numberAllowed,characterAllowed,passwordGenerator])

  return (
  
   <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 text-white bg-[#0F172A]">
        <h1 className="text-center mb-4 font-semibold text-lg">Password Generator</h1>
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded text-black bg-amber-50"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-4 py-1 shrink-0 rounded'
          
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
              />
              <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox" 
             defaultChecked={numberAllowed}
             id="numberInput"
             onChange={() => {
              setNumberAllowed((prev) => !prev);
             }}
             />
             <label htmlFor="numberInput">Numbers</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox" 
             defaultChecked={characterAllowed}
             id="characterInput"
             onChange={() => {
              setCharacterAllowed((prev) => !prev);
             }}
             />
             <label htmlFor="characterInput">Character</label>

          </div>
          
        </div>
      </div>
    </div>
    
  )
}

export default App
