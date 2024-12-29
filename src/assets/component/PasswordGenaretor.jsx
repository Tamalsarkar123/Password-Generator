import { useCallback, useState,useEffect, useRef } from "react"

export const PasswordGenaretor=()=>{
    const [length, setLength]=useState(6);
    const [numberAlw, setnumberAlw]=useState(false);
    const [charAlw, setCharAlw]=useState(false);
    const [psw, setPsw]=useState("");
    // useRef hook

    const passwordRef=useRef(null);


    const passwordGent=useCallback(()=>{    // optimize the method
        let pass="";
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvwxyz";
        if(numberAlw)str+="0123456789"
        else if(charAlw)str+="!@#$&*_+=-?~{}[]`";

        for (let i = 1; i <=length; i++) {
            let char=Math.floor(Math.random()*str.length+1);
            
            pass+=str.charAt(char);
        }
        setPsw(pass);
    },[length,numberAlw,charAlw,setPsw]) //change dependency or  possible run then the method optimize

    const copyPswToClipbord=useCallback(()=>{
        passwordRef.current?.select();        // "current? " is optional select.
        passwordRef.current?.setSelectionRange(0,999);  // selected only 3 digi
        window.navigator.clipboard.writeText(psw);
    },[psw])

    useEffect(()=>{
        passwordGent();
    },[length,numberAlw,charAlw,passwordGent])
    return(
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-800">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow rounded-lg  overflow-hidden mb-4">
            <input type="text" value={psw} placeholder="password" className="outline-none w-full py-1 px-3  " readOnly
            ref={passwordRef}
            >
            </input>
            <button className="outline-none bg-blue-700 text-white px-3 py-2 shrink-0 active:bg-lime-500 active:text-black" onClick={copyPswToClipbord}> copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
                <input type="range"id="rg" min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}/>
                <label htmlFor="rg">Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
                <input type="checkbox"  defaultChecked={numberAlw} id="numberInput" onChange={()=>{setnumberAlw((prev)=>!prev)}}/>
                <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
                <input type="checkbox"  defaultChecked={charAlw} id="characterInput" onChange={()=>{setCharAlw((prev)=>!prev)}}/>
                <label htmlFor="charcterInput">Characters</label>
            </div>
          </div>
        </div>
    )
}