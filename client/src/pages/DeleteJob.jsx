import { toast } from "react-toastify";
import customFetch from "../utils/customFetch"
import { redirect } from "react-router-dom";

export const action = (queryClient) => async ({params}) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    queryClient.invalidateQueries(["jobs"]);
    toast.success("Job deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/dashboard/all-jobs")
}

const DeleteJob = () => {
  return 
    
  
}

export default DeleteJob