import { FC } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import {
  checkAsideFilter,
  setLoading,
} from '../../../store/reducers/ticketsSlice';
import './aside-checkbox.scss';

interface AsideFilterCheckboxProps {
  label: string;
  checked: boolean;
  name: string;
}

export const AsideFilterCheckbox: FC<AsideFilterCheckboxProps> = ({
  name,
  checked,
  label,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <input
        className="aside-checkbox"
        type="checkbox"
        id={label}
        checked={checked}
        onChange={() => {
          dispatch(setLoading('sorting'));
          dispatch(checkAsideFilter(name));
        }}
      />
      <label className="aside-checkbox-label" htmlFor={label}>
        {label}
      </label>
    </>
  );
};
