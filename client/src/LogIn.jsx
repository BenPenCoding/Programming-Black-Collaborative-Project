import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      if (!username || !password) {
        setError("Please fill in all fields");
        return;
      }

const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
    });

      const respLogIn = await response.json();

      if (response.ok) {
        localStorage.setItem("token", respLogIn.token);

        navigate("/dashboard");
      } else {
        setError(respLogIn.message);
      }

    } catch (error) {
      setError("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="container p-5 my-5 border">
        <h1 className="my-3">Log In</h1>
        
        {error && <p className="text-danger">{error}</p>}
        
        <form onSubmit={handleLogIn}>
          <Username username={username} setUsername={setUsername} />
          <Password password={password} setPassword={setPassword} />
          <Submit />
        </form>

      <SignUpLink />
    </div>
  )

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

function SignUpLink() {
  return (
    <>
     <p className="fs-5 my-2">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </>
  );
}

export default LogIn;