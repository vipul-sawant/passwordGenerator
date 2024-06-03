import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {

  const [length, setLength] = useState(8);

  const [password, setPassword] = useState("Heloasui");

  const [numbersAllowed, setNumbersAllowed] = useState(false);

  const [charsAllowed, setCharsAllowed] = useState(false);

  const passwordRef = useRef();

  const genratePassword = useCallback(() => {
    let allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numbersAllowed) {
      allChars += "0123456789";      
    }

    if (charsAllowed) {
      allChars += "@#$&";
    }

    let output = "";

    for (let index = 0; index < length; index++) {
      let i = Math.floor(Math.random() * allChars.length);
      output += allChars.charAt(i);
    }
    setPassword(output);
  }, [length, numbersAllowed, charsAllowed, setPassword]);

  useEffect(()=>{
    genratePassword();
  }, [length, numbersAllowed, charsAllowed, genratePassword]);

  const handleChange = e => {
    const targetId = e.target.id;
    if (targetId === "numbers") {
      setNumbersAllowed((prev)=>!prev);
    } else if (targetId === "chars") {
      setCharsAllowed((prev)=>!prev);
    }
  };

  const changeLength = e => {
    const value = parseInt(e.target.value);
    setLength(value);
  };

  const copyToClipboard = useCallback(()=>{
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);

  return (
    <>
      <div className = "container">
        <h1> Password Generator </h1>
          <div className = "form-container">
              <form method = "post">
                <div className="input-container">
                    <label className="label" htmlFor="passowrd">Password</label>
                    <input type="text" id="password" value={password} ref={passwordRef} name="password" className="input" placeholder={`Enter your password here`} />
                </div>

                
                <div className="input-container">
                  <div className="input-container">
                      {/* <button type="button" onClick={genratePassword} className="submit"> Generate Password </button> */}
                      <label htmlFor="length">Length : {length}</label>
                      <input type="range" value={length} name="length" id="length" min={8} max={32} onChange={changeLength} />
                  </div>

                <div className="input-container">
                    <label htmlFor="numbers"> Numbers </label>
                    <input type="checkbox" className="checkbox" defaultChecked={numbersAllowed} name="numbers" id="numbers"  onChange={handleChange} />
                </div>

                <div className="input-container">
                    <label htmlFor="chars"> Characters </label>
                    <input type="checkbox" className="checkbox" defaultChecked={charsAllowed} name="chars" id="chars" onChange={handleChange} />
                </div>

                <div className="input-container">
                    <button type="button" onClick={copyToClipboard} className="submit">Copy</button>
                </div>
              </div>

              </form>
          </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
