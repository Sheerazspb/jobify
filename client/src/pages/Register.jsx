import { Link,redirect,Form} from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo , SubmitBtn} from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register",data)
    toast.success("Registration successful");
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error
  }
};

const Register = () => {
 
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" placeholder="Enter your name" name="name" />
        <FormRow type="text" placeholder="Enter your last name" name="lastName" labelText="last name" />
        <FormRow type="text" placeholder="Enter your location" name="location" />
        <FormRow type="email" placeholder="Enter your email" name="email" />
        <FormRow type="password" placeholder="Enter your password" name="password" />
       
        <SubmitBtn formBtn btnName="Register" />
        <p>
          Already have an account?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Register