// Without captcha

// Login.jsx
// import "./Login.css";
// import '../../App.scss';
// import { useEffect, useState } from "react";
// import video from "../../LoginAssets/video.mp4";
// import logo from "../../LoginAssets/logo.png";
// import Axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
// import { FaUserShield } from "react-icons/fa";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { AiOutlineSwapRight } from "react-icons/ai";

// function Login() {
//   const [loginUserName, setLoginUserName] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [loginStatus, setLoginStatus] = useState('');
//   const [statusHolder, setStatusHolder] = useState('message');
//   const navigate = useNavigate();

//   // Login handler
//   const loginUser = async (e) => {
//     e.preventDefault();

//     if (loginUserName === '' || loginPassword === '') {
//       setLoginStatus('Username and Password are required!');
//       setStatusHolder('showMessage');
//       return;
//     }

//     try {
//       const response = await Axios.post("http://localhost:3002/login", {
//         username: loginUserName,
//         password: loginPassword,
//       });

//       if (response.data.message === "Login successful") {
//         navigate('/dashboard');
//       } else {
//         setLoginStatus(response.data.message);
//         setStatusHolder('showMessage');
//       }
//     } catch (error) {
//       setLoginStatus("Error logging in!");
//       setStatusHolder('showMessage');
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (loginStatus !== '') {
//       setTimeout(() => {
//         setStatusHolder('message');
//       }, 4000);
//     }
//   }, [loginStatus]);

//   return (
//     <div className="loginPage flex">
//       <div className="container flex">
//         <div className="videoDiv">
//           <video src={video} autoPlay muted loop></video>

//           <div className="textDiv">
//             <h2 className="title">Create And Sell Extraordinary Products</h2>
//             <p>Adopt the peace of nature</p>
//           </div>

//           <div className="footerDiv flex">
//             <span className="text">Dont have an account?</span>
//             <Link to="/register">
//               <button className="btn">Sign Up</button>
//             </Link>
//           </div>
//         </div>

//         <div className="formDiv flex">
//           <div className="headerDiv">
//             <img src={logo} alt="Logo" />
//             <h3>Welcome back!</h3>
//           </div>

//           <form className="form grid" onSubmit={loginUser}>
//             <span className={statusHolder}>{loginStatus}</span>

//             <div className="inputDiv">
//               <label htmlFor="username">Username</label>
//               <div className="input flex">
//                 <FaUserShield className="icon" />
//                 <input
//                   type="text"
//                   id="username"
//                   placeholder="Enter Username"
//                   onChange={(event) => setLoginUserName(event.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="inputDiv">
//               <label htmlFor="password">Password</label>
//               <div className="input flex">
//                 <BsFillShieldLockFill className="icon" />
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Enter Password"
//                   onChange={(event) => setLoginPassword(event.target.value)}
//                 />
//               </div>
//             </div>

//             <button type="submit" className="btn flex">
//               <span>Login</span>
//               <AiOutlineSwapRight className="icon" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// with captcha
import "./Login.css";
import "../../App.scss";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import video from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

function Login() {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null); // Captcha token
  const navigate = useNavigate();

  const siteKey = "6LfUk3QqAAAAAPqlaJ3soHP6JbOSgM-kn-DEK3DQ"; // Your reCAPTCHA site key

  const handleCaptcha = (token) => setCaptchaToken(token);

  const loginUser = async (e) => {
    e.preventDefault();

    if (!loginUserName || !loginPassword) {
      setLoginStatus("Username and Password are required!");
      return;
    }

    if (!captchaToken) {
      setLoginStatus("Please complete the reCAPTCHA!");
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3002/login", {
        username: loginUserName,
        password: loginPassword,
        captchaToken, // Pass the reCAPTCHA token
      });

      if (response.data.message === "Login successful") {
        navigate("/dashboard");
      } else {
        setLoginStatus(response.data.message);
      }
    } catch (error) {
      setLoginStatus("Error logging in!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setTimeout(() => setLoginStatus(""), 4000);
    }
  }, [loginStatus]);

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Don have an account?</span>
            <Link to="/register">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>Welcome back!</h3>
          </div>

          <form className="form grid" onSubmit={loginUser}>
            {loginStatus && <span className="showMessage">{loginStatus}</span>}

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(e) => setLoginUserName(e.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>

            <ReCAPTCHA sitekey={siteKey} onChange={handleCaptcha} />

            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;


