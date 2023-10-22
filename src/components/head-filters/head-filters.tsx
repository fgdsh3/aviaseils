import { FC } from 'react';
import './head-filters.scss';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import { IHeadButton } from '../../interfaces/interfaces';
import {
  changeHeadFilter,
  cheapest,
  fastest,
  optimal,
  setLoading,
} from '../../store/reducers/ticketsSlice';

export const HeadFilters: FC = () => {
  const { headFilter } = useAppSelector((state) => state.tickets);
  const dispatch = useDispatch();

  const buttons: IHeadButton[] = [
    {
      name: cheapest,
      label: 'Cамый дешевый',
      isActive: headFilter === cheapest,
    },
    {
      name: fastest,
      label: 'Cамый быстрый',
      isActive: headFilter === fastest,
    },
    {
      name: optimal,
      label: 'Оптимальный',
      isActive: headFilter === optimal,
    },
  ];

  const createButtons = (): React.ReactNode => {
    return buttons.map((button) => {
      const buttonClasses = classNames({
        'head-filter': true,
        'head-filter--active': button.isActive,
      });
      return (
        <button
          key={button.name}
          id={button.name}
          className={buttonClasses}
          onClick={() => {
            dispatch(setLoading('sorting'));
            dispatch(changeHeadFilter(button.name));
          }}
        >
          {button.label}
        </button>
      );
    });
  };

  return <div className="head-filters">{createButtons()}</div>;
};
