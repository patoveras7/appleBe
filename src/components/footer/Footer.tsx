"use client";
import styles from '../../styles/footer.module.css'

const Footer = () => {

  const handleClick = () => {
    alert("Cellphone added to our preferential list.")
    const input = document.getElementById("inputText") as HTMLInputElement;
    if (input) {
      input.value = ""; 
    }

  }

  return (
    <div className={styles.container}>
       <div className={styles.personal}>
            <div>
            <strong>Henry Proyect 🚀 M4</strong>
            </div>
            <div>
            <strong>Call Center 24/7 📞0810-111-4587📞</strong>
            </div>
            <div>
            <strong>Work with us: AppleBe@mail.com 🔜📨</strong>
            </div>
            <div>
            <strong>© 2024 Patrico Veras Carrara. All rights reserved.</strong>
           </div>
        </div>

        <div className={styles.media}>
            <div>
            <strong>Follow Us</strong>
            </div>
            <div className={styles.socialNetworks}>
            <img src="https://i.pinimg.com/236x/ae/a3/35/aea335fd233887bd3057d9a01b111828.jpg" alt="Instagram" className={styles.logo} />
            <img src="https://i.pinimg.com/236x/7f/e9/d7/7fe9d7012076dbda78e984253ee79f49.jpg" alt="X" className={styles.logo}/>
            <img src="https://i.pinimg.com/236x/25/ea/59/25ea5941311b06c6cec08f99bf5d72a5.jpg" alt="Facebook" className={styles.logo}/>
           </div>  
        </div>

        <div className={styles.WhatsApp}>
        <div><strong>Would you like get some Be offers throw WhatsApp??</strong></div>
        <div className={styles.input}>
        <img src="https://i.pinimg.com/236x/bf/8a/76/bf8a76719f900b8757154eb3cfbc844a.jpg" alt="WhatsApp" className={styles.logo} />
        <input type="text" id='inputText' className={styles.inputOK} placeholder="  0351 152698742 " />  
        </div>
        <div><button onClick={handleClick} className={styles.button}><strong>Submit</strong></button></div>  
        </div>

    </div>
  )
}

export default Footer