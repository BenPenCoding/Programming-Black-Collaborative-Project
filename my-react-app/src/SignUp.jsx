import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    try {
      if (!username || !password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
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
          <Username username={username} setUsername={setUsername} />
          <Password password={password} setPassword={setPassword} />
          <Submit />
        </form>

        {error && <p className="text-danger">{error}</p>}

        <LogInLink />
    </div>
  );
}

function Username({username, setUsername}) {
  return (
    <div className="form-group my-2">
        <label htmlFor="username" className="form-label">Username:</label>
        <input type="text" className="form-control" id="username" placeholder="Enter Username" value={username} onChange={(event) => setUsername(event.target.value)} />
    </div>
  );
}

function Password({password, setPassword}) {
  return (
    <div className="form-group my-2">
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