import { FC, useState, useEffect, memo, useCallback } from 'react';
import classNames from 'classnames';
import { Multi } from '../../../types/Contact';
import { MultiField } from '../../../types/MultiFieldEnum';
import { EmailPattern } from '../../../utils/EmailPattern';
import { NumberPattern } from '../../../utils/NumberPattern';
import { MultiFieldErrorsMessages } from './MultiField.ErrorMessages';

type Props = {
  field: MultiField,
  type: string,
  placeholder: string,
  isLast: boolean,
  isOne: boolean,
  data: Multi,
  handleInputFieldRemove: (
    type: MultiField, id: string,
  ) => void,
  handleInputFieldAdd: (type: MultiField) => void,
  handleMultiFieldInput: (
    type: MultiField, newValue: string, id: string
  ) => void,
};

export const MultipleField: FC<Props> = memo(({
  field,
  type,
  placeholder,
  data,
  isLast,
  isOne,
  handleInputFieldRemove,
  handleInputFieldAdd,
  handleMultiFieldInput
}) => {
  const [value, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCurrentFieldChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputedValue = event.target.value;

    setValue(inputedValue);
    setIsCorrect(false);
  }, []);

  const handleBlur = useCallback(() => {
    if (field === MultiField.EMAIL) {
      setIsCorrect(!EmailPattern.test(value));
    }

    if (field === MultiField.NUMBER) {
      setIsCorrect(!NumberPattern.test(value));
    }

    handleMultiFieldInput(field, value, data.id);
  }, [value]);

  const handleActionSelect = useCallback(() => {
    if (!isLast && !isOne) {
      handleInputFieldRemove(field, data.id)
    } else {
      handleInputFieldAdd(field);
    }
  }, [isLast, isOne]);

  useEffect(() => {
    if (data) {
      setValue(data.value);
    }
  }, [data, isLast, isOne]);

  return (
    <>
      <div
        className="control control--display-flex"
      >
        <input
          className="input"
          value={value}
          type={type}
          placeholder={placeholder}
          onInput={handleCurrentFieldChange}
          onBlur={handleBlur}
        />
        {(isLast && !isOne)
          ? (<>
              <button
                type="button"
                className="button is-danger"
                onClick={() => handleInputFieldRemove(field, data.id)}
              >
                Remove
              </button>

              <button
                type="button"
                className="button is-link"
                onClick={() => handleInputFieldAdd(field)}
              >
                Add
              </button>
            </>)
          : (<button
              type="button"
              className={classNames(
                'button',
                {'is-danger': !isLast && !isOne,
                  'is-link': isLast && isOne}
              )}
              onClick={handleActionSelect}
            >
              {!isLast && !isOne ? 'Remove' : 'Add'}
            </button>)
        }
      </div>

      {isCorrect
          && <span className="has-text-danger has-text-danger--margin-bottom">
              {MultiFieldErrorsMessages(field)}
            </span>}
    </>
  )
});
