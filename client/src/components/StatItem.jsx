import Wrapper from "../assets/wrappers/StatItem"
import PropTypes from 'prop-types';

const StatItem = ({count,title,icon,color,bcg}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className="title">
        {title}
      </h5>
    </Wrapper>
  )
}
StatItem.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  bcg: PropTypes.string,
};

export default StatItem
