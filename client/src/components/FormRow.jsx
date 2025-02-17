// eslint-disable-next-line react/prop-types
const FormRow = ({name,labelText,placeholder,type,defaultValue='',onChange}) => {
   return (
     <div className="form-row">
       <label htmlFor={name} className="form-label">
         {labelText || name}
       </label>
       <input
         type={type}
         id={name}
         className="form-input"
         name={name}
         placeholder={placeholder}
         defaultValue={defaultValue}
         onChange={onChange}
         required
       />
     </div>
   );
};

export default FormRow;