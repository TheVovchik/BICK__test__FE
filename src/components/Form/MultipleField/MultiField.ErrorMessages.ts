import { MultiField } from "../../../types/MultiFieldEnum";

export function MultiFieldErrorsMessages(field: MultiField) {
  switch (field) {
    case MultiField.EMAIL:
      return 'Please enter a valid email address';
    
    case MultiField.NUMBER:
      return 'Please enter 10 digits phone number';

    default:
      return;
  }
}