import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    try {
      if (!username || !password || !email || !firstname || !surname) {
        setError("Please fill in all fields");
        return;
      }

const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/signUp`, {        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
          email,
          firstname,
          surname
        })
    });

      const respSignUp = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setError(respSignUp.message);
      }

    } catch (error) {
      setError("Something went wrong");
      console.error(error);
  }
  };

  return (
    <div className="container p-5 my-5 border">
        <h1 className="my-3">Sign Up</h1>
        
        <form onSubmit={handleSignUp}>
          <Firstname firstname={firstname} setFirstname={setFirstname} />
          <Surname surname={surname} setSurname={setSurname} />
          <Email email={email} setEmail={setEmail} />
          <Username username={username} setUsername={setUsername} />
          <Password password={password} setPassword={setPassword} />
          <Submit />
        </form>

        {error && <p className="text-danger">{error}</p>}

        <LogInLink />
    </div>
  );
}

function Firstname({firstname, setFirstname}) {
  return (
    <div className="form-group my-2 text-start">
        <label htmlFor="firstname" className="form-label">First Name:</label>
        <input type="text" className="form-control" id="firstname" placeholder="Enter First Name" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
    </div>
  );
}

function Surname({surname, setSurname}) {
  return (
    <div className="form-group my-2 text-start">
        <label htmlFor="surname" className="form-label">Surname:</label>
        <input type="text" className="form-control" id="surname" placeholder="Enter Surname" value={surname} onChange={(event) => setSurname(event.target.value)} />
    </div>
  );
}
function Email({email, setEmail}) {
  return (
    <div className="form-group my-2 text-start">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} />
    </div>
  );
}

function Username({username, setUsername}) {
  return (
    <div className="form-group my-2 text-start">
        <label htmlFor="username" className="form-label">Username:</label>
        <input type="text" className="form-control" id="username" placeholder="Enter Username" value={username} onChange={(event) => setUsername(event.target.value)} />
    </div>
  );
}

function Password({password, setPassword}) {
  return (
    <div className="form-group my-2 text-start">
     <label htmlFor="password" className="form-label">Password:</label>
     <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} />
    </div>
  );
}

function Submit() {
  return (
    <button type="submit" className="btn btn-primary my-2">Submit</button>
  );
}

function LogInLink() {
  return (
    <>
     <p className="fs-5 my-2">Already have an account? <Link to="/">Log In</Link></p>
    </>
  );
}

export default SignUp;