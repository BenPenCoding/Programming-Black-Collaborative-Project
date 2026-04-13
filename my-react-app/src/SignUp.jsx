import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="container p-5 my-5 border">
        <h1 className="my-3">Sign Up</h1>
        <Username />
        <Name />
        <Password />
        <Submit />
        <LogInLink />
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

function Name() {
  return (
    <div className="form-group my-2">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="name" placeholder="Enter Name" />
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

function LogInLink() {
  return (
    <>
     <p className="fs-5 my-2">Already have an account? <Link to="/">Log In</Link></p>
    </>
  );
}

export default SignUp;