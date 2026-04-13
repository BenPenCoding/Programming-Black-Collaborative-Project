import { Link } from "react-router-dom";

function LogIn() {
  return (
    <div className="container p-5 my-5 border">
        <h1 className="my-3">Log In</h1>
        <Username />
        <Password />
        <Submit />
        <SignUpLink />
    </div>
  );
}

function Username() {
  return (
    <div className="form-group my-2">
        <label htmlFor="username" className="form-label">Username:</label>
        <input type="text" className="form-control" id="username" placeholder="Enter Username" />
    </div>
  );
}

function Password() {
  return (
    <div className="form-group my-2">
     <label htmlFor="password" className="form-label">Password:</label>
     <input type="password" className="form-control" id="password" placeholder="Enter Password" />
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