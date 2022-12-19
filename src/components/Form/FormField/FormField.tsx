import { FC, memo, useCallback, useState} from 'react';
import { SingleField } from '../../../types/SingleFieldEnum';
import { AtLeastOneLetter } from '../../../utils/AtLeastOneLetter';

type Props = {
  type: SingleField,
  label: string,
  placeholder: string,
  value: string,
  handleInputChange: (
    value: string,
    field: SingleField,
  ) => void,
};

export const FormField: FC<Props> = memo(({
  type, placeholder, label, value, handleInputChange,
}) => {
  const [isEmpty, setIsEmpty] = useState(false);

  const handleInput = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputedValue = event.target.value;

    handleInputChange(inputedValue, type);
    setIsEmpty(false);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEmpty(!AtLeastOneLetter.test(value));
  }, [value]);

  return (
    <div className="field">
        <label className="label">{ label }</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInput}
            onBlur={handleBlur}
          />
          
          {isEmpty
          && <span className="has-text-danger">This field can't be empty</span>}
        </div>
      </div>
  )
});
