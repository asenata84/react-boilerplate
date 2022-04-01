import { Modal, ModalNames } from 'store/slices/modals';

export default (
  modals: Modal[],
  name: ModalNames,
): boolean => !!modals?.find((modal) => modal?.name === name)?.isOpen === true;
