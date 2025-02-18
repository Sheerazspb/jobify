import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, useNavigate } from "react-router-dom";
import { JOB_TYPE, JOB_STATUSES, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

  const SearchContainer = () => {
    const submit = useSubmit();
    const navigate = useNavigate();
    const { searchValues } = useAllJobsContext();
    const { search, jobStatus, jobType, sort } = searchValues;
    const debounce = (onChange) => {
      let timeout;
      return (e) => {
        const form = e.currentTarget.form;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          onChange(form);
        }, 1000);
      };
    };

  const handleReset = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    form.reset();
    const formData = new FormData();
    formData.append("search", "");
    formData.append("jobStatus", "all");
    formData.append("jobType", "all");
    formData.append("sort", "newest");

    submit(formData);
    navigate("/dashboard/all-jobs");
   };

    return (
      <Wrapper>
        <Form className="form">
          <h5 className="form-title">search form</h5>
          <div className="form-center">
            <FormRow
              type="search"
              name="search"
              defaultValue={search}
              onChange={debounce((form) => {
                submit(form);
              })}
            />
            <FormRowSelect
              labelText="job status"
              name="jobStatus"
              list={["all", ...Object.values(JOB_STATUSES)]}
              defaultValue={jobStatus}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <FormRowSelect
              labelText="job type"
              name="jobType"
              list={["all", ...Object.values(JOB_TYPE)]}
              defaultValue={jobType}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <FormRowSelect
              name="sort"
              list={[...Object.values(JOB_SORT_BY)]}
              defaultValue={sort}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />

            <button
              type="button"
              className="btn form-btn delete-btn"
              onClick={handleReset}
            >
              Reset Search Values
            </button>
          </div>
        </Form>
      </Wrapper>
    );
  };

export default SearchContainer;
