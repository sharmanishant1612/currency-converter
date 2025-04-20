import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [currencies, setCurrencies] = useState({});

  const[amount,setamount]=useState(1)
  const[amountcopy,setamountcopy]=useState(1)
  const[fromcurrency,setfromcurrency]=useState("USD")
  const[tocurrency,settocurrency]=useState("INR")
  const[convertedamount,setconvertedamount]=useState(null)
  
  

  let getcountrycode=async ()=>{
    let response=await fetch("https://api.frankfurter.app/currencies")
    let data= await response.json()
    // console.log(data)
    setCurrencies(data)
  }

  let getamount= async(fromCurrency,tocurrency,amt)=>{
    const url = `https://v6.exchangerate-api.com/v6/12fd1349034b86bd44f26c1f/latest/${fromCurrency}`;

    let response=await fetch(url)
    let data=await response.json()
    let rate=data.conversion_rates[tocurrency]
  
    setconvertedamount((parseFloat(amt) * rate).toFixed(2));

    // console.log(data)
    // console.log(rate)
  }

  let handleconvertedamount= async()=>{
    
    await getamount(fromcurrency,tocurrency,amountcopy)
    setamount(amountcopy)
  }

  useEffect(()=>{
    getcountrycode()
    getamount(fromcurrency,tocurrency,amount)
  },[])

  return (
    <>
     <div className='h-screen w-screen  bg-slate-300 flex justify-center items-center'>

          <div className='lg:h-[85%] lg:w-[30%] md:h-[85%] md:w-[40%] sm:h-[85%] sm:w-[50%] h-[100%] w-[100%] bg-blue-950 rounded-md flex flex-col justify-around items-center '>

              <div className='h-[15%] w-[90%] flex justify-center items-center'>
                <p className='text-white text-2xl font-serif text-center text-[2em]'>Currency Converter</p>
              </div>

              <div className='h-[18%] w-[90%]'>
                <p className='h-[40%] text-white text-[1.2em] font-serif'>Enter Amount</p>
                <input type="number" className='h-[50%] w-[100%] bg-slate-500 rounded-md outline-none pl-3 text-white text-[1.3em]'
                min={1}
                value={amountcopy}
                onChange={(e)=>{setamountcopy(e.target.value)}}
                />
              </div>

              <div className='h-[15%] w-[90%]'>

               <div className=' h-[40%] w-[100%] flex justify-between'>
                <p className='text-l  text-white text-[1.2em] font-serif'>From</p>
                <p className='text-l  text-white text-[1.3em] font-serif'>To</p>
               </div>

                <div className=' h-[60%] w-[100%] flex  justify-between'>

                     <div className='h-[100%] w-[35%]  rounded-md'>
                      <select name="" id="" className='h-[100%] w-[100%] bg-slate-500 text-white text-[1.3em] outline-none rounded-md font-serif'
                      value={fromcurrency}
                      onChange={(e)=>{setfromcurrency(e.target.value)}}>    
                          { Object.entries(currencies).map(([code,name])=>(
                            <option key={code} >
                              {code}
                            </option>
                          ))}
                      </select>
                     </div>

                     <div className='h-[100%] w-[15%]  rounded-full bg-slate-500 flex justify-center items-center text-xl text-white'>
                     <i className="fa-duotone fa-solid fa-arrows-left-right-to-line"></i>
                     </div>

                     <div className='h-[100%] w-[35%] rounded-md'>
                        <select name="" id="" className='h-[100%] w-[100%] bg-slate-500 text-white text-[1.3em] outline-none rounded-md font-serif'
                        onChange={(e)=>{settocurrency(e.target.value)}}
                        value={tocurrency} >
                          {Object.entries(currencies).map(([code,name]) => (
                                  <option key={code} >
                                    {code} 
                                  </option>
                                ))}      

                        </select>
                     </div>

                </div> 

              </div>

              <div className='h-[15%] w-[90%]  flex justify-center items-center'>
                  <button className='h-[60%] w-[100%] bg-blue-400 rounded-md text-[1.2em] hover:bg-blue-600 font-serif'
                  onClick={handleconvertedamount}
                  >Get Exchange Rate</button>
              </div>

              <div className='h-[15%] w-[90%] '>
                <div className='h-[70%] w-100% bg-slate-500 text-white flex justify-center items-center rounded-md'>
                      <p className='text-[1.3em] font-sans'>{amount} {fromcurrency} = {convertedamount} {tocurrency}</p>
                </div>
              </div>
          </div>
     </div>
    </>
  )
}

export default App
