import * as Yup from 'yup';
import messages from './messages';

export const someValidationSchema = Yup.object().shape({
  name: Yup.string().trim().max(255, messages?.orgNameLength).required(messages?.required),
  streetAddress: Yup.string().max(600, messages?.maxLength),
  city: Yup.string().max(255, messages?.maxLength),
  state: Yup.string().max(255, messages?.maxLength),
  zipCode: Yup.string().max(12, messages?.maxLength),
});
