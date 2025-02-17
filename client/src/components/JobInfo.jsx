import Wrapper from '../assets/wrappers/JobInfo';
import PropTypes from 'prop-types';

const JobInfo = ({icon,text}) => {
  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  )
}
JobInfo.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default JobInfo;
