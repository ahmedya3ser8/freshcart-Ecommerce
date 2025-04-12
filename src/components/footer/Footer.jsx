import React from 'react'
import pay from '../../assets/pay.webp'
import appStore from '../../assets/appStore.webp'
import googlePlay from '../../assets/googlePlay.webp'

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-6">
        <div className="container">
          <div className="footer-head border-b-[1px] border-solid border-[#ccc] pb-10">
            <h3 className="text-[25px] mb-[10px]">Welcome <span className="text-[#0aad04]">ahmed</span> Get the FreshCart app</h3>
            <p className="text-[18px] text-[#777] mb-[10px]">we will send you a link , open it on your phone to download the app</p>
            <div className="flex flex-col lg:flex-row gap-6">
              <input type="text" id="footer-input" className="w-full h-[40px] rounded-[10px] outline-none p-2" />
              <button className="w-full md:w-[180px] text-[18px] h-[40px] p-2 bg-[#0aad04] text-white rounded-[10px]">Share App</button>
            </div>
          </div>
          <div className="footer-bottom flex justify-between items-center flex-col lg:flex-row pb-4">
            <div className="left flex items-center gap-5">
              <span className="text-[#777]">Payment Partners</span>
              <img src={pay} alt="pay-img" />
            </div>
            <div className="right flex items-center gap-5">
              <span className="text-[#777] text-[14px]">Get deliveries with FreshCart</span>
              <img src={appStore} alt="appStore"  className="w-[100px]"/>
              <img src={googlePlay} alt="googlePlay" className="w-[100px]" />
            </div>
          </div>
          <p className='text-center'>
            Copyright © All Right Reserved 
            <span className='text-green-600 font-semibold'>Ahmed Yasser</span>
          </p>
        </div>
    </footer>
  )
}
