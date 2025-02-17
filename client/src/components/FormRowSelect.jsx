import PropTypes from 'prop-types';

const FormRowSelect = ({name,labelText,list,defaultValue='',onChange}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText||name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}
FormRowSelect.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default FormRowSelect