import React, { useRef, useState } from 'react';
import profilSekil from "../assets/img.png";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formDataErrors, setFormDataErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
  first_name: "",  // ⬅️ dəyişdi
  last_name: "",   // ⬅️ dəyişdi
  birth_date: "",  // ⬅️ dəyişdi
  mobile_number: "",  // ⬅️ dəyişdi
  password: "",
  password2: "",
  gender: "",
  profession_area: "",
  profession_speciality: "",
  experience_years: "",
  cities: [],
  education: "",
  educationField: "",
  languages: [],
  profile_image: null,
  socialLinks: {
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
  },
  work_images: [],
  about: "",
});
const educationOptions = [
  { id: 1, label: "Tam ali" },
  { id: 2, label: "Natamam ali" },
  { id: 3, label: "Orta" },
  { id: 4, label: "Peşə təhsili" },
  { id: 5, label: "Orta ixtisas təhsili" },
  { id: 6, label: "Yoxdur" },
];

const handleLanguageChange = (e) => {
  const value = parseInt(e.target.value); // string gəlir, rəqəmə çeviririk
  const isChecked = e.target.checked;

  setFormData((prevData) => {
    let updatedLanguages = [...prevData.languages];

    if (isChecked) {
      // əgər seçilibsə və artıq yoxdursa, əlavə et
      if (!updatedLanguages.includes(value)) {
        updatedLanguages.push(value);
      }
    } else {
      // əgər seçilməyibsə, sil
      updatedLanguages = updatedLanguages.filter((id) => id !== value);
    }
  console.log("Yeni dillər:", updatedLanguages);
    return { ...prevData, languages: updatedLanguages };
  });

};

const languageOptions = [
  { id: 1, label: "Azərbaycan" },
  { id: 2, label: "İngilis" },
  { id: 3, label: "Rus" },
  { id: 4, label: "Türk" },
];

const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_image: file }));
    }
  };

const handlePortfolioChange = (e) => {
  const files = Array.from(e.target.files);
  setFormData((prev) => ({ ...prev, work_images: files }));

};
const validateForm = () => {
  const errors = {};

  if (step === 1) {
    if (!formData.first_name) errors.first_name = "Zəhmət olmasa, məlumatları daxil edin";
    if (!formData.last_name) errors.last_name = "Zəhmət olmasa, məlumatları daxil edin";
    if (!formData.birth_date) errors.birth_date = "Zəhmət olmasa, məlumatları daxil edin";
    if (!formData.mobile_number) errors.mobile_number = "Zəhmət olmasa, məlumatları daxil edin";
    if (!formData.password) errors.password = "Zəhmət olmasa, məlumatları daxil edin";
    if (!formData.password2) errors.password2 = "Zəhmət olmasa, məlumatları daxil edin";
    if (formData.password !== formData.password2)
      errors.password2 = "Şifrələr uyğun deyil";
    if (!formData.gender) errors.gender = "Zəhmət olmasa, məlumatları daxil edin";
  }

  if (step === 2) {
    if (!formData.profession_area) errors.profession_area = "Zəhmət olmasa, məlumatları daxil edin";
    if (!formData.profession_speciality) errors.profession_speciality = "Zəhmət olmasa, məlumatları daxil edin";
    if (!formData.experience_years) errors.experience_years = "Zəhmət olmasa, məlumatları daxil edin";
    if (formData.cities.length === 0) errors.cities = "Zəhmət olmasa, məlumatları daxil edin";
  
  }

  if (step === 3) {
    if (!formData.education) errors.education = "TZəhmət olmasa, məlumatları daxil edin";
    if (!formData.educationField) errors.educationField = "Zəhmət olmasa, məlumatları daxil edin";
   
 
      if (formData.languages.length === 0) errors.languages = "Zəhmət olmasa, məlumatları daxil edin";
  }

  setFormDataErrors(errors);

  return Object.keys(errors).length === 0;
};

const handleNext = ()=> {
  // e.preventDefault();
  const isValid = validateForm();
  if (!isValid) return; // səhv varsa false qaytar

  setStep((prev) => prev + 1); // step dəyiş
 
};
console.log("step",step)



const handleFinalSubmit = async (e) => {
  
  e.preventDefault(); // submit bloklanır

  const isValid = validateForm(); // son stepi yoxla
  if (!isValid) return;
  const formDataToSend = new FormData();

  formDataToSend.append("first_name", formData.first_name);
  formDataToSend.append("last_name", formData.last_name);
  formDataToSend.append("birth_date", formData.birth_date);
  formDataToSend.append("mobile_number", formData.mobile_number);
  formDataToSend.append("password", formData.password);
  formDataToSend.append("password2", formData.password2);
  formDataToSend.append("gender", formData.gender);
  formDataToSend.append("profession_area", formData.profession_area);
  formDataToSend.append("profession_speciality", formData.profession_speciality);
  formDataToSend.append("experience_years", formData.experience_years);
  formData.cities.forEach((cityId) => {
    formDataToSend.append("cities", cityId); // backend array kimi qəbul etməlidir
  });
  formData.languages.forEach((langId) => {
    formDataToSend.append("languages", langId); // array kimi
  });
  formDataToSend.append("education", formData.education);
  formDataToSend.append("educationField", formData.educationField);
  formDataToSend.append("about", formData.about);

 
  formDataToSend.append("facebook", formData.socialLinks.facebook);
  formDataToSend.append("instagram", formData.socialLinks.instagram);
  formDataToSend.append("tiktok", formData.socialLinks.tiktok);
  formDataToSend.append("linkedin", formData.socialLinks.linkedin);


  if (formData.profile_image) {
    formDataToSend.append("profile_image", formData.profile_image);
    console.log(formData.profile_image)
  }

 
  formData.work_images.forEach((file, index) => {
    formDataToSend.append("work_images", file); // eyni adla əlavə etmək backend array kimi qəbul edirsə
  });

  try {
    const res = await fetch("https://9459-213-172-90-209.ngrok-free.app/api/users/register/", {
      method: "POST",
      body: formDataToSend,
      credentials: "include"
    });

    const result = await res.json();
    if (res.ok) {
      alert("Qeydiyyat uğurludur!");
    } else {
      console.error("Server error: ", result);
      alert("Xətalar: " + JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Xəta baş verdi.");
  }
};


const handleFinalStepClick = (e) => {
  const nextPassed = handleNext(e);
  if (nextPassed) {
    handleFinalSubmit(); // error yoxdursa qeydiyyatı tamamla
  }
};



  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
   const handleUploadClick2 = () => {
    fileInputRef2.current.click();
  };


const handleChange = (e) => {
  const { name, value, type, multiple, options } = e.target;

  if (multiple) {
    const values = Array.from(options)
      .filter((opt) => opt.selected)
      .map((opt) => parseInt(opt.value));

    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  } else {
    // Xəta yoxlaması yalnız "first_name" üçün
    if (name === "first_name"||name === "last_name") {
       const azOnlyLettersRegex = /^[AaBbCcÇçDdEeƏəFfGgĞğHhİiIıJjKkLlMmNnOoÖöPpRrSsŞşTtUuÜüVvYyZz]+$/;
      if (value.length > 20) {
        setFormDataErrors((prev) => ({
          ...prev,
          [name]: "Ən çox 20 simvol ola bilər.",
        }));
      } else if (!azOnlyLettersRegex.test(value)) {
        setFormDataErrors((prev) => ({
          ...prev,
          [name]: "Yalnız Azərbaycan hərfləri ilə yazılmalıdır.",
        }));
      } else {
        setFormDataErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }


   if (name === "mobile_number") {
  const valueWithoutSpaces = value.replace(/\s/g, ""); // boşluqları sil
  const onlyDigits = /^\d+$/;

  if (!onlyDigits.test(valueWithoutSpaces)) {
    setFormDataErrors((prev) => ({
      ...prev,
      [name]: "Yalnız rəqəmlərdən ibarət olmalıdır.",
    }));
  } else if (valueWithoutSpaces.length !== 9) {
    setFormDataErrors((prev) => ({
      ...prev,
      [name]: "Simvol sayı 9 olmalıdır. 50 123 45 67 formatında daxil edin.",
    }));
  } else {
    setFormDataErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
}

if (name === "password") {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#\-\_\+])[A-Za-z\d!@#\-\_\+]{8,15}$/;

  if (!passwordRegex.test(value)) {
    setFormDataErrors((prev) => ({
      ...prev,
      [name]:
        "Şifrəniz ən azı 8 simvoldan ibarət olmalı, özündə minimum bir böyük hərf, rəqəm və xüsusi simvol (məsələn: !, @, #, -, _, +) ehtiva etməlidir.",
    }));
  } else {
    setFormDataErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
}


if (name === "password2") {
  if (value !== formData.password) {
    setFormDataErrors((prev) => ({
      ...prev,
      password2: "Şifrələr uyğun deyil.",
    }));
  } else {
    setFormDataErrors((prev) => ({
      ...prev,
      password2: "",
    }));
  }
}



    // Form dəyərini güncəllə
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  }
};

  const handleClick = () => {
    navigate("/login");
  };

console.log(formData.education)
console.log(formData.cities)

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const { name, surname, dob, phone, password, confirmPassword, gender } = formData;

  //   if (!name || !surname || !dob || !phone || !password || !confirmPassword || !gender) {
  //     alert("Zəhmət olmasa bütün sahələri doldurun.");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     alert("Şifrələr uyğun deyil.");
  //     return;
  //   }

  //   setStep(2);
  // };

  return (
    <div>
      <div className="bg-[rgba(26,72,98,1)] h-[100px] flex justify-between px-[20px] py-[20px]">
        <h2 className='text-white'>Paputi</h2>
       <p className="text-white cursor-pointer" onClick={handleClick}>
      Hesabınız var? Daxil olun
    </p>
      </div>

      <div className="bg-gradient flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A4852] mb-2 text-center">
          Peşə Sahibləri Platformasına <br /> Xoş Gəlmisiniz!
        </h1>
        <p className="text-[#6C757D]">Peşəkar xidmətlərinizi paylaşmaq üçün qeydiyyatdan keçin.</p>
      </div>

      <div className="relative w-full min-h-screen ">
        <img src={profilSekil} className="w-full  h-[full] object-cover" />
        <div className="absolute inset-0 flex justify-center items-start pt-[80px] bg-[rgba(0,0,0,0.25)]">
            
            
          {step === 1 && (
            <form 
            
              className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-lg w-[90%] max-w-md"
            >
                <div className='flex justify-evenly '>
                    <div className='w-8 h-8 flex items-center justify-center rounded-full  bg-[rgba(26,72,98,1)] text-white '>
                        1
                    </div>
                       <div className="w-[40px] h-[2px] bg-[rgba(195,200,209,1)] flex mt-3" />
                    
                     <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(195,200,209,1)] '>
                        2
                    </div>
                       <div className="w-[40px] h-[2px] bg-[rgba(195,200,209,1)] flex mt-3" />
                     <div className='w-8 h-8 flex items-center justify-center rounded-full  bg-[rgba(195,200,209,1)] '>
                        3
                    </div>
                </div>
                <p className='text-center'>Addım 1/3 </p>
                
              <h2 className="text-[rgba(26,72,98,1)] text-[25px]">Şəxsi məlumatlar</h2>

              <div className="py-[10px]">
                <label className="text-sm font-semibold">Ad <span className="text-red-500">*</span></label>
                <input
                  type="text"
                 name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Adınızı daxil edin"
                  className="w-full mt-1 p-2  rounded-md border-[1px] border-[rgba(195,200,209,1)] "
                />
          {formDataErrors.first_name && (
  console.log("Error göstərilir:", formDataErrors.first_name), // burda çıxmalıdır
  <p className="text-red-500 text-sm mt-1">{formDataErrors.first_name}</p>
)}

  
              </div>
              <div className="py-[10px]">
                <label className="text-sm font-semibold">Soyad <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Soyadınızı daxil edin"
                  className="w-full mt-1 p-2 border-[1px] border-[rgba(195,200,209,1)]  rounded-md"
                />
                 {formDataErrors.last_name&& (
  console.log("Error göstərilir:", formDataErrors.last_name), // burda çıxmalıdır
  <p className="text-red-500 text-sm mt-1">{formDataErrors.last_name}</p>
)}

              </div>
              <div className="py-[10px]">
                <label className="text-sm font-semibold">Doğum tarixi <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  placeholder="Gün / ay / il"
                  className="w-full mt-1 p-2 border-[1px] border-[rgba(195,200,209,1)]  rounded-md"
                />
                {formDataErrors.birth_date&& (
  console.log("Error göstərilir:", formDataErrors.birth_date), // burda çıxmalıdır
  <p className="text-red-500 text-sm mt-1">{formDataErrors.birth_date}</p>
)}
              </div>
              <div className="py-[10px]">
                <label className="text-sm font-semibold">Mobil nömrə <span className="text-red-500">*</span></label>
                <div className="flex mt-1">
                  <span className="bg-gray-100 px-4 py-2 border border-r-0 rounded-l-md">+994</span>
                  <input
                    type="text"
                   name="mobile_number"
      value={formData.mobile_number}
                    onChange={handleChange}
                    placeholder="50 123 45 67"
                    className="w-full p-2 border-[1px] border-[rgba(195,200,209,1)]  rounded-r-md"
                  />

                </div>
                {formDataErrors.mobile_number&& (
  console.log("Error göstərilir:", formDataErrors.mobile_number), // burda çıxmalıdır
  <p className="text-red-500 text-sm mt-1">{formDataErrors.mobile_number}</p>
)}
              </div>
              <div className="py-[10px] relative">
                <label className="text-sm font-semibold">Şifrə <span className="text-red-500">*</span></label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifrənizi daxil edin"
                  className="w-full mt-1 p-2 border-[1px] border-[rgba(195,200,209,1)] rounded-md"
                />
               
                 <div
        className="absolute right-3 top-[30%] translate-y-[10px] cursor-pointer text-gray-600"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <FaEye  size={20} /> : < FaEyeSlash size={20} />}
      </div>
       {formDataErrors.password ? (
    <p className="text-red-500 text-sm mt-1">{formDataErrors.password}</p>
  ) : (
    // Əks halda, təlimat mesajını göstər
    <p className="text-[12px] text-[rgba(101,111,131,1)] mt-1">
      Şifrəniz ən azı 8 simvoldan ibarət olmalı, özündə minimum bir böyük hərf, rəqəm və xüsusi simvol (məsələn: !, @, #, -, _, +) ehtiva etməlidir
    </p>
  )}
              </div>
              
              <div className="py-[10px] relative">
                <label className="text-sm font-semibold">Şifrəni təkrar yazın <span className="text-red-500">*</span></label>
                <input
             type={showPassword ? "text" : "password"}
                 
              name="password2"
    value={formData.password2}
                  onChange={handleChange}
                  placeholder="Şifrənizi təkrar daxil edin"
                  className="w-full mt-1 p-2 border-[1px] rounded-md border-[rgba(195,200,209,1)] "
                />
                {formDataErrors.password2&& (
  console.log("Error göstərilir:", formDataErrors.password2), // burda çıxmalıdır
  <p className="text-red-500 text-sm mt-1">{formDataErrors.password2}</p>
)}
                   <div
        className="absolute right-3 top-[45%] translate-y-[10px] cursor-pointer text-gray-600"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <FaEye  size={20} /> : < FaEyeSlash size={20} />}
      </div>
              </div>
              <div className="py-[10px]">
                <label className="text-sm font-semibold">Cins <span className="text-red-500">*</span></label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="MALE" onChange={handleChange} />
                    Kişi
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="FEMALE" onChange={handleChange} />
                    Qadın
                  </label>
                </div>
                {formDataErrors.gender&& (
  console.log("Error göstərilir:", formDataErrors.gender), // burda çıxmalıdır
  <p className="text-red-500 text-sm mt-1">{formDataErrors.gender}</p>
)}
              </div>
              <button type="button" className=" flex justify-center items-center bg-[rgba(26,72,98,1)] text-white py-2 rounded-md mt-4 w-full"  onClick={handleNext}>
                 Növbəti <IoIosArrowForward className='pt-[2px]' />

              </button>
              <p className="text-sm mt-4 text-gray-600 flex items-center justify-center gap-[3px]">
                      Hesabınız var?{" "}
                      <a href="/login" className="text-[rgba(49,135,184,1)] hover:underline">
                        Daxil olun
                      </a>
                    </p>
            </form>
          )}

          {step === 2 && (

            
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-[90%] max-w-md ">
                <div className='flex justify-evenly '>
                    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(195,200,209,1)]'>
                        1
                    </div>
                      <div className="w-[40px] h-[2px] bg-[rgba(26,72,98,1)] flex justify-between items-center mt-3" />
                     <div className='w-8 h-8 flex items-center justify-center rounded-full  bg-[rgba(26,72,98,1)]  text-white '>
                        2
                    </div>
                      <div className="w-[40px] h-[2px] bg-[rgba(195,200,209,1)] flex mt-3" />
                     <div className='w-8 h-8 flex items-center justify-center rounded-full  bg-[rgba(195,200,209,1)] '>
                        3
                    </div>
                </div>
                <p className='text-center'>Addım 2/3 </p>
                 <h3 className="text-xl font-bold text-[#1A4852] mb-4 ">Peşə məlumatları</h3>
               <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Peşə sahəsi <span className="text-red-500">*</span></label>
      <select
  name="profession_area"

  onChange={handleChange}
  className="w-full border p-2 rounded-md   bg-[rgba(195,200,209,1)]"
  value={formData.profession_area}
>
  <option value="">Peşə sahəsini seçin</option>
  <option value="İT">İT</option>
  <option value="Təhsil">Təhsil</option>
  <option value="Səhiyyə">Səhiyyə</option>
  <option value="İnşaat">İnşaat</option>
</select>
{formDataErrors.profession_area&& (

  <p className="text-red-500 text-sm mt-1">{formDataErrors.profession_area}</p>
)}

    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Peşə ixtisası <span className="text-red-500">*</span></label>
      <select
  name="profession_speciality"
  value={formData.profession_speciality}
  onChange={handleChange}
  className="w-full border p-2 rounded-md bg-[rgba(195,200,209,1)]"
>
  <option value="">Peşə ixtisasını seçin</option>
  <option value="Frontend Developer">Frontend Developer</option>
  <option value="Backend Developer">Backend Developer</option>
  <option value="UI/UX Designer">UI/UX Designer</option>
  <option value="Mobile Developer">Mobile Developer</option>
</select>
{formDataErrors.profession_speciality&& (

  <p className="text-red-500 text-sm mt-1">{formDataErrors.profession_speciality}</p>
)}
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">İş təcrübəsi <span className="text-red-500">*</span></label>
      <input
        type="text"
        name="experience_years" 
        value={formData.experience_years}
        placeholder="Məsələn: 4"
           onChange={handleChange}
        className="w-full border p-2 rounded-md"
      />
      {formDataErrors.experience_years&& (

  <p className="text-red-500 text-sm mt-1">{formDataErrors.experience_years}</p>
)}
    </div>

 <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Fəaliyyət göstərdiyi ərazi <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <select
      name="cities"
      value={formData.cities}
     multiple
      onChange={handleChange}
      className="w-full  border border-gray-300 bg-[rgba(195,200,209,1)] p-2 pr-10 rounded-md focus:outline-none focus:ring-2"
    >
      <option value="">Ərazini seçin</option>
      <option value="1">Bakı</option>
      <option value="2">Gəncə</option>
      <option value="3">Sumqayıt</option>
      <option value="4">Şəki</option>
      <option value="5">Qəbələ</option>
    </select>
   
  </div>
  {formDataErrors.cities&& (

  <p className="text-red-500 text-sm mt-1">{formDataErrors.cities}</p>
)}
</div>

     <div className="flex justify-between items-center">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="border border-[#1A4852] text-[#1A4852] py-2 px-4 rounded-md hover:bg-gray-100 w-[30%] flex justify-center items-center"
      >
       <IoIosArrowBack className='pt-[2px]'/> Geri 
      </button>
      <button
        type="button"
        className=" flex justify-center items-center bg-[rgba(26,72,98,1)] text-white py-2 px-6 rounded-md w-[65%] "  
     onClick={handleNext}
      >
        Növbəti <IoIosArrowForward className='pt-[2px]' />

      </button>
      
    </div>
     <p className="text-sm mt-4 text-gray-600 flex items-center justify-center gap-[3px]">
                      Hesabınız var? 
                      <a href="/login" className="text-[rgba(49,135,184,1)] hover:underline">
                         Daxil olun
                      </a>
                    </p>

              
            </div>
          )}
      {step === 3 && (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-[90%] max-w-md">
     <div className='flex justify-evenly pb-[10px]'>
                    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(195,200,209,1)]'>
                        1
                    </div>
                       <div className="w-[40px] h-[2px] bg-[rgba(26,72,98,1)]  flex mt-3" />
                     <div className='w-8 h-8 flex items-center justify-center rounded-full  bg-[rgba(195,200,209,1)]  '>
                        2
                    </div>
                       <div className="w-[40px] h-[2px] bg-[rgba(26,72,98,1)]    flex mt-3" />
                     <div className='w-8 h-8 flex items-center justify-center rounded-full  bg-[rgba(26,72,98,1)]  text-white '>
                        3
                    </div>
                 
                </div>
                   <p className='text-center pb-[10px]'>Addım 3/3 </p>
    <h2 className="text-xl font-bold text-[#1A4852] mb-1 r">Əlavə məlumatlar</h2>

  
   <div className="mb-4">
  <label className="block text-sm font-medium mb-1">Təhsil <span className="text-red-500">*</span></label>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
    {educationOptions.map((option) => (
      <label key={option.id} className="flex items-center gap-2">
        <input
          type="radio"
          name="education"
          value={option.id}
          checked={formData.education === option.id}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              education: parseInt(e.target.value), 
            }))
          }
        />
        {option.label}
      </label>
    ))}
  </div>
  {formDataErrors.education&& (

  <p className="text-red-500 text-sm mt-1">{formDataErrors.education}</p>
)}
</div>


    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Təhsil ixtisası <span className="text-red-500">*</span></label>
      <input
        type="text"
        placeholder="Təhsil ixtisasını daxil edin"
        name='educationField'
        className="w-full border p-2 rounded-md"
        value={formData.educationField}
          onChange={handleChange}
      />
      {formDataErrors.educationField&& (

  <p className="text-red-500 text-sm mt-1">{formDataErrors.educationField}</p>
)}
    </div>

    
   <div className="mb-4">
  <label className="block text-sm font-medium mb-1">Dil bilikləri <span className="text-red-500">*</span></label>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-[20px]">
    {languageOptions.map((lang) => (
      <label key={lang.id} className="flex items-center  gap-[5px]">
        <input
          type="checkbox"
          name="languages"
          value={lang.id}
          checked={formData.languages.includes(lang.id)}
          onChange={handleLanguageChange}
        />
        {lang.label}
      </label>
    ))}
  </div>
  {formDataErrors.languages&& (

  <p className="text-red-500 text-sm mt-1">{formDataErrors.languages}</p>
)}
</div>


    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Profil şəkli</label>
      <div className="border-2 border-dashed rounded-md py-6 text-center text-gray-500 cursor-pointer" onClick={handleUploadClick}> 
        <span className="text-sm">📷 Şəkil yükləmək üçün klikləyin.</span>
        <input type="file" className="hidden"  ref={fileInputRef} onChange={handleProfileImageChange}  />
      </div>
    </div>
    {formData.profile_image && (
  <img
    src={URL.createObjectURL(formData.profile_image)}
    alt="Profil şəkli"
    className="mt-2 w-32 h-32 object-cover rounded-full mx-auto"
  />
)}

    
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">Sosial şəbəkə linkləri</label>
      <p className="text-xs text-gray-500 mb-2">
        Peşənizlə əlaqədar sosial şəbəkə səhifəsinin (olduqda) linkini əlavə edə bilərsiniz.
      </p>
      {[
        { name: "Facebook", placeholder: "Facebook profil linki", color: "#1877F2" },
        { name: "Instagram", placeholder: "Instagram profil linki", color: "#C13584" },
        { name: "TikTok", placeholder: "TikTok profil linki", color: "#000" },
        { name: "LinkedIn", placeholder: "Linkedin profil linki", color: "#0A66C2" },
      ].map((network) => (
        <input
          key={network.name}
          type="text"
          placeholder={network.placeholder}
          className="w-full border p-2 rounded-md mb-2"
        />
      )
      
      )}
      <div className="mb-4" >
      <label className="block text-sm font-medium mb-2">
        Gördüyünüz işlər (Nümunə işlərinizin şəkilləri)
      </label>
      <div className="border-2 border-dashed rounded-md py-6 px-4 text-center text-gray-500 cursor-pointer " onClick={handleUploadClick2}>
        <span className="text-sm block mb-1">📁 JPG/PNG faylları yükləyin (maksimum 10 fayl)</span>
        <input type="file" multiple accept="image/png, image/jpeg" className="hidden"  ref={fileInputRef2} onChange={handlePortfolioChange} />
      </div>
     {formData.work_images?.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-2 justify-center">
    {formData.work_images.map((file, index) => (
      <img
        key={index}
        src={URL.createObjectURL(file)}
        alt={`İş şəkli ${index + 1}`}
        className="w-24 h-24 object-cover rounded-md"
      />
    ))}
  </div>
)}

    </div>

 
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">Haqqınızda</label>
      <textarea
        placeholder="Əlavə qeydlərinizi daxil edin"
        className="w-full border rounded-md p-2 min-h-[100px] resize-none"
      />
    </div>
     <div className="flex justify-between items-center">
      <button
        type="button"
             onClick={()=>setStep(2)}
       
        className="border border-[#1A4852] text-[#1A4852] py-2 px-4 rounded-md hover:bg-gray-100 w-[30%] flex justify-center items-center"
      >
          <IoIosArrowBack />Geri
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-[rgba(26,72,98,1)] text-white text-sm px-6 py-2 rounded-md hover:bg-[#153b45] w-[65%]"
        onClick={handleFinalSubmit}
      >
        Qeydiyyatı tamamla 
<IoIosArrowForward />

      </button>
      
    </div>
     <p className="text-sm mt-4 text-gray-600 flex items-center justify-center gap-[3px]">
                      Hesabınız var?{" "}
                      <a href="/login" className="text-[rgba(49,135,184,1)] hover:underline">
                        Daxil olun
                      </a>
                    </p>
    </div>
  </div>
)}
 
        </div>
      </div>
    </div>
  );
}

export default Register;
