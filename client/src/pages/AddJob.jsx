import { FormRow ,FormRowSelect,SubmitBtn} from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUSES, JOB_TYPE } from "../../../utils/constants";
import { Form,redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = (queryClient) => async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs",data)
    queryClient.invalidateQueries(["jobs"]);
    toast.success("Job added successfully");
    return redirect("all-jobs")
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error
  }
}

const AddJob = () => {
  
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow type="text" labelText="job location" name="jobLocation" />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUSES.PENDING}
            list={Object.values(JOB_STATUSES)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn btnName="Add Job" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
