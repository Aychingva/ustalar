import React from 'react'
import profilSekil from "../assets/img.png";

function Login() {
  return (
  <div>
        <div className="bg-[rgba(26,72,98,1)] h-[100px] flex justify-between px-[20px] py-[20px]">
          <h2 className='text-white'>Paputi</h2>
        
        </div>
  
        <div className="bg-gradient flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A4852] mb-2 text-center">
            Peşə Sahibləri Platformasına <br /> Xoş Gəlmisiniz!
          </h1>
          <p className="text-[#6C757D]">Peşəkar xidmətlərinizi paylaşmaq üçün qeydiyyatdan keçin.</p>
        </div>
  
        <div className="relative w-full min-h-screen ">
          <img src={profilSekil} className="w-full  h-full object-cover" />
            <div className="absolute inset-0 flex justify-center items-start pt-[80px] bg-[rgba(0,0,0,0.25)]">
              <form className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-lg w-[50%] max-w-md">
                 <h2 className="text-[rgba(26,72,98,1)] text-[25px]">Şəxsi məlumatlar</h2>
<div className="py-[10px]">
                <label className="text-sm font-semibold">Mobil nömrə *</label>
                <div className="flex mt-1">
                  <span className="bg-gray-100 px-4 py-2 border border-r-0 rounded-l-md">+994</span>
                  <input
                    type="text"
                   name="mobile_number"
     
                    placeholder="50 123 45 67"
                    className="w-full p-2 border rounded-r-md"
                  />
                </div>
              </div>
             < div className="py-[5px] ">
                <label className="text-sm font-semibold">Şifrə *</label>
                <input
                  type="password"
                  name="password"
               
                  placeholder="Şifrənizi daxil edin"
                  className="w-full mt-1 p-2 border rounded-md"
                />
               
              </div>
              <div className=''>
                 <p className='text-[12px] text-[rgba(49,135,184,1)]'>Şifrəni unutmusuz?</p>
              </div>
              <div className='flex justify-end '>
                <button className='flex items-center bg-[rgba(26,72,98,1)]  text-white text-sm px-6 py-2 rounded-md hover:bg-[#153b45]'>Daxil ol</button>
              </div>
              <div>
                <p className="text-sm mt-4 text-gray-600 flex items-center justify-center">
                      Hesabınız yoxdur?{" "}
                      <a href="/" className="text-[rgba(49,135,184,1)] hover:underline">
                        Qeydiyyatdan keçin
                      </a>
                    </p>

              </div>
              </form>
            </div>
        </div>
        </div>
  )
}

export default Login