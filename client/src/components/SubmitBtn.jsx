import { useNavigation } from "react-router-dom";
import PropTypes from 'prop-types';


const SubmitBtn = ({formBtn,btnName}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting" : btnName}
    </button>
  );
  
}
SubmitBtn.propTypes = {
  formBtn: PropTypes.bool,
  btnName: PropTypes.string.isRequired,
};

export default SubmitBtn;
