"use client";

const Footer = () => {

  const handleClick = () => {
    alert("Cellphone added to our preferential list.")
    const input = document.getElementById("inputText") as HTMLInputElement;
    if (input) {
      input.value = ""; 
    }

  }

  return (
    <div className="bg-[rgb(2,5,48)] flex flex-col items-center lg:flex-row lg:justify-between text-white relative gap-[50px] lg:gap-[60px] p-[32px] pt-[60px] pb-[60px] lg:h-[260px]">
       
       
       <div className="flex flex-col gap-[16px] items-center w-fit text-[15px] sm:text-[17px] md:text-[19px] lg:text-[15px] xl:ml-[60px]">
            <div>
            <strong>Henry Proyect 🚀 M4</strong>
            </div>
            <div>
            <strong>Call Center 24/7 📞0810-111-4587📞</strong>
            </div>
            <div>
            <strong>Work with us: AppleBe@mail.com 🔜📨</strong>
            </div>
            <div className="flex flex-col items-center sm:flex-row gap-[16px] sm:gap-[5px]">
                  <div>
                    <strong>© 2024 Patrico Veras Carrara.</strong>
                  </div>

                  <div>
                    <strong>All rights reserved.</strong>
                  </div>
            </div>      
        </div>

       
       
        <div className="flex flex-col gap-[16px] items-center text-[15px] sm:text-[17px] md:text-[19px] lg:text-[15px]">
            <div>
            <strong>Follow Us</strong>
            </div>
            <div className="flex gap-[16px]">
            <img src="https://i.pinimg.com/236x/ae/a3/35/aea335fd233887bd3057d9a01b111828.jpg" alt="Instagram" className="w-[40px] h-[40px] m-auto rounded-[8px]" />
            <img src="https://i.pinimg.com/236x/7f/e9/d7/7fe9d7012076dbda78e984253ee79f49.jpg" alt="X" className="w-[40px] h-[40px] m-auto rounded-[8px]"/>
            <img src="https://i.pinimg.com/236x/25/ea/59/25ea5941311b06c6cec08f99bf5d72a5.jpg" alt="Facebook" className="w-[40px] h-[40px] m-auto rounded-[8px]"/>
           </div>  
        </div>

        
        
        
        <div className="flex flex-col gap-[16px] items-center text-[10px] sm:text-[16px] md:text-[18px] lg:text-[13px] xl:mr-[60px]">
                <div><strong>Would you like get some Be offers throw WhatsApp??</strong></div>
                <div className="flex gap-[16px]">
                <img src="https://i.pinimg.com/236x/bf/8a/76/bf8a76719f900b8757154eb3cfbc844a.jpg" alt="WhatsApp" className="w-[40px] h-[40px] m-auto rounded-[8px]" />
                <input type="text" id='inputText' className="rounded-[8px] text-black border-solid border-green-500 border-[3px]" placeholder="  0351 152698742 " />  
                <button onClick={handleClick} className="bg-green-500 border-black border-solid border-[3px] rounded-[8px] pr-[8px] pl-[8px]"><strong>Submit</strong></button>
                </div>
                  
        </div>

    </div>
  )
}

export default Footer