import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

  const [currencies, setCurrencies] = useState({});

  const [amount,setamount] = useState(1)
  const [amountcopy,setamountcopy] =  useState(1)
  const [fromcurrency,setfromcurrency] = useState("USD")
  const [fromcurrencycopy,setfromcurrencycopy] = useState("USD")
  const [tocurrency,settocurrency] = useState("INR")
  const [tocurrencycopy,settocurrencycopy] = useState('INR')
  const [convertedamount,setconvertedamount] = useState()

  let[darkmode,setdarkmode]=useState(false)
  
  

  let getcountrycode=async ()=>{
    let response=await fetch("https://api.frankfurter.app/currencies")
    let data= await response.json() 
    console.log(data)
    setCurrencies(data)
  }

  let getamount= async(fromCurrency,tocurrency,amt)=>{
    const url = `https://v6.exchangerate-api.com/v6/12fd1349034b86bd44f26c1f/latest/${fromCurrency}`;

    let response=await fetch(url)
    let data=await response.json()
    let rate=data.conversion_rates[tocurrency]
  
    setconvertedamount((parseFloat(amt) * rate).toFixed(2));
    // setfromcurrency(fromcurrencycopy)
    // settocurrency(tocurrencycopy)

    // console.log(data)
    // console.log(rate)
  }

  let handleconvertedamount= async()=>{

    setfromcurrency(fromcurrencycopy)
    settocurrency(tocurrencycopy)
    
    await getamount(fromcurrencycopy,tocurrencycopy,amountcopy)
    setamount(amountcopy)

  }

  let swapcurrency=()=>{
    setfromcurrencycopy(tocurrencycopy)
    settocurrencycopy(fromcurrencycopy)
  }

  useEffect(()=>{
    getcountrycode()
    getamount(fromcurrency,tocurrency,amount)
  },[])

  useEffect(()=>{
    if(darkmode){
      document.documentElement.classList.add('dark')
    }
    else{
      document.documentElement.classList.remove('dark')
    }
  },[darkmode])

  return (
    <>
     <div className='h-screen w-screen  bg-slate-200 flex justify-center items-center'>

          <div className='lg:h-[85%] lg:w-[30%] md:h-[85%] md:w-[40%] sm:h-[85%] sm:w-[50%] h-[100%] w-[100%] bg-slate-400 rounded-md flex flex-col justify-around items-center dark:bg-black'>

              <div className='h-[15%] w-[100%] flex justify-center items-center'>

                   <div className='h-[100%] w-[60%] flex items-center '>
                   <p className='text-2xl font-serif  text-[2em] dark:text-white'>Currency Converter</p>
                   {/* <img src={`https://flagsapi.com/${countryList[fromcurrency]}/flat/32.png`} alt="" /> */}
                   </div>

                   <div className='h-[100%] w-[30%] flex justify-center items-center'>
                        <div className='h-[50%] w-[50%] l rounded-lg flex justify-around items-center  '>
                        {darkmode? <i className="fa-solid fa-sun text-yellow-400 text-[1.5em] p-2 hover:cursor-pointer hover:scale-110"
                        onClick={()=>{setdarkmode(false)}}
                        ></i>:<i className="fa-solid fa-moon text-[1.7em] hover:scale-110 hover:cursor-pointer"
                        onClick={()=>{setdarkmode(true)}}
                        ></i>
                        }
                        </div>
                   </div>
                </div>

              <div className='h-[18%] w-[90%]'>
                <p className='h-[40%]  text-[1.2em] font-serif dark:text-white'>Enter Amount</p>
                <input type="number" className='h-[40%] w-[100%] rounded-md outline-none pl-3  text-[1.3em]'
                min={1}
                value={amountcopy}
                onChange={(e)=>{setamountcopy(e.target.value)}}
                />
              </div>

              <div className='h-[15%] w-[90%]'>

               <div className=' h-[40%] w-[100%] flex justify-between'>
                <p className='text-l  text-[1.2em] font-serif dark:text-white'>From</p>
                <p className='text-l  text-[1.3em] font-serif dark:text-white'>To</p>
               </div>

                <div className=' h-[45%] w-[100%] flex  justify-between  '>

                     <div className='h-[100%] w-[35%]  rounded-md flex justify-between'>
                     <img src={`https://flagsapi.com/${countryList[fromcurrencycopy]}/flat/32.png`} alt="" className='h-[100%] w-[30%] object-cover bg-white rounded-l-lg'/>
                      <select name="" id="" className='h-[100%] w-[70%] text-[1.2em] outline-none rounded-r-lg font-serif '
                      value={fromcurrencycopy}
                      onChange={(e)=>{setfromcurrencycopy(e.target.value)}}>    
                          { Object.keys(currencies).map((code)=>(
                            
                            <option key={code} >
                              {code}
                            </option>
                          ))}
                      </select>
                     </div>

                     <div className='h-[100%] w-[15%]  rounded-full  flex justify-center items-center text-xl bg-white' onClick={swapcurrency}>
                     <i className="fa-duotone fa-solid fa-arrows-left-right-to-line"></i>
                     </div>

                     <div className='h-[100%] w-[35%] rounded-md flex'>

                     <img src={`https://flagsapi.com/${countryList[tocurrencycopy]}/flat/32.png`} alt="" className='h-[100%] w-[30%] object-cover bg-white rounded-l-lg'/>
                      
                        <select name="" id="" className='h-[100%] w-[70%] text-[1.2em] outline-none rounded-r-lg font-serif'
                        onChange={(e)=>{settocurrencycopy(e.target.value)}}
                        value={tocurrencycopy} >
                          {Object.keys(currencies).map((code) => (
                            
                                  <option key={code} >
                                    {code} 
                                  </option>
                                ))}      

                        </select>
                     </div>

                </div> 

              </div>

              <div className='h-[15%] w-[90%]  flex justify-center items-center'>
                  <button className='h-[45%] w-[100%] bg-blue-400 rounded-md text-[1.2em] hover:md:bg-blue-600 font-serif'
                  onClick={handleconvertedamount}
                  >Get Exchange Rate</button>
              </div>

              <div className='h-[15%] w-[90%] '>
                <div className='h-[50%] w-100% bg-white text-black flex justify-center items-center rounded-md'>
                      <p className='text-[1.3em] font-sans'>{amount} {fromcurrency} = {convertedamount} {tocurrency}</p>
                </div>
              </div>
          </div>
     </div>
    </>
  )
}

export default App
