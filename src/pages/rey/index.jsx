import React, { useRef, useState } from 'react'
import { FiImage } from "react-icons/fi";
 import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function Rey() {
    const inputref=useRef() 
    const handleclick=()=>inputref.current.click()
    const TAGS = [
  "#Məsuliyyət", "#Səliqə", "#Vaxta nəzarət", "#Ünsiyyətcil",
  "#Dəqiq", "#Peşəkar", "#Təcrübəli", "#Səmərəli", "#Çevik", "#Səbirli"
];



  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [ratingError, setRatingError] = useState("");
const [textError, setTextError] = useState("");
const [tagError, setTagError] = useState("");

const [imageError, setImageError] = useState("");

const [tags, setTags] = useState([]);
const tagselector=(tag)=>{
    if(tags.includes(tag)){
        setTags(tags.filter((t)=>t!==tag))
        setError('')
    }else if
 (tags.length<=5){
    setTags([...tags,tag])
    setError('')
 }else{
    setError("5 tagdan artıq seçə bilməzsiniz")
 }

    

}
const handleSubmit = (e) => {
  e.preventDefault();

  let isValid = true;

  if (rating === 0) {
    setRatingError("Lütfən bir reytinq seçin");
    isValid = false;
  } else {
    setRatingError("");
  }

  if (text.trim() === "") {
    setTextError("Zəhmət olmasa rəyinizi yazın");
    isValid = false;
  } else {
    setTextError("");
  }

  if (tags.length === 0) {
    setTagError("Zəhmət olmasa ən azı bir etiket seçin");
    isValid = false;
  } else {
    setTagError("");
  }

  if (!isValid) return;

  alert(`Göndərildi! Rating: ${rating}, Etiketlər: ${tags.join(", ")}`);
};
const [images, setImages] = useState([]);
const [inputKey, setInputKey] = useState(Date.now());

const handleImageChange = (e) => {
  const selectedFiles = Array.from(e.target.files);
  const totalImages = [...images, ...selectedFiles];

  const oversized = selectedFiles.some((file) => file.size > 5 * 1024 * 1024);
  if (oversized) {
    setImageError("Şəklin ölçüsü 5MB-dan çox ola bilməz.");
    setInputKey(Date.now()); 
    return;
  }

  if (totalImages.length > 3) {
    setImageError("Ən çox 3 şəkil yükləyə bilərsiniz.");
    setInputKey(Date.now()); 
    return;
  }

  setImages(totalImages); 
  setImageError("");
};





  return (
   <form className='mx-auto p-6  max-w-[1400px]' onSubmit={handleSubmit}>
    <h2 className='font-bold text-xl mb-4'>Xidmət haqqında rəy yazın</h2>
    <div className='mb-4'>
       <label className='block font-semibold mb-3'>Adınızı və soyadınızı qeyd edin</label>
       <input type="text" placeholder='Adınızı qeyd edin' className='w-full border rounded p-[5px] mb-[30px]' >
       
       </input>
    </div>

    <div className='mb-4'>
        <label className='block mb-2 font-semibold '>
               Xidmətlə bağlı təəssüratınız necə idi?
        </label>
  <div className="flex gap-[3px] text-[25px] mb-[10px] cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
       <div className='relative'   onClick={() => setRating(star === rating ? 0 : star)}>
       
          <CiStar className="text-yellow-400" />
           {console.log("Current rating:", rating)}
          {
           
            star<=rating &&(

                  <FaStar className="text-yellow-400 absolute top-0 right-0 " />
            )
          }
        </div>
      ))}
    </div>
    {ratingError && (
        <p className="text-red-500 text-sm mb-[30px] font-semibold">Lütfən bir reytinq seçin</p>
      )}


        <textarea placeholder='"Yaşadığınız təcrübəni bizimlə bölüşün" ' className='w-full border h-[147px] rounded p-2'     onChange={(e) => setText(e.target.value)}></textarea>
 {textError && (
        <p className="text-red-500 text-sm mb-[30px] font-semibold">"Zəhmət olmasa rəyinizi yazın</p>
      )}


    </div>

    <div>
        <label  className='block mb-2 font-semibold  mt-[40px]'>Şəkil əlavə edin</label>
       <div className=' w-48 h-48 border-dashed  border flex flex-col items-center justify-center mb-[50px]' onClick={handleclick}>
         <span className="mb-1" >Şəkil əlavə edin</span>
         <FiImage />
         <input type="file" ref={inputref}   key={inputKey}  className="hidden"  accept="image/*"  multiple 
  onChange={handleImageChange} />

       </div>
       {images.length > 0 && (
  <div className='flex gap-4 flex-wrap mb-4'>
    {images.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)}
        alt={`şəkil-${index}`}
        className='w-[100px] h-[100px] object-cover rounded border'
      />
    ))}
  </div>
)}

      
    </div>
     {imageError && (
  <p className="text-red-500 text-sm mt-2 font-semibold">{imageError}</p>
)}

    <div className='mb-4 w-[750px]'>
         <p className="font-semibold mb-[20px]">
          Xidməti xarakterizə edən etiketləri seçin (maks. 5 ədəd)
        </p>
        <div className='flex flex-wrap gap-[10px]'>
            {TAGS.map((tag) =>(
                <button type="button" onClick={()=>tagselector(tag)}    className={`border px-[10px] py-[7px] rounded text-[16px]
                ${tags.includes(tag) 
      ? "border-red-600  bg-[rgba(205,228,242,1)] " 
      : "bg-[rgba(205,228,242,1)] text-[rgba(26,72,98,1)]"
                 }`} key={tag}>{tag}</button>
            ))}
             
    

        </div>   
        {error && (
  <p className="text-red-500 text-sm mb-[10px] font-semibold">{error}</p>
)}
          </div>
         {tagError && (
        <p className="text-red-500 text-sm mb-[30px] font-semibold">"Zəhmət olmasa ən azı bir etiket seçin</p>
      )}

    
      
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Göndər
      </button>
   </form>
  )
}

export default Rey