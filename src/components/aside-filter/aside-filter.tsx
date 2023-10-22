import { useAppSelector } from '../../hooks/redux';
import { AsideFilterCheckbox } from './aside-checkbox/aside-checkbox';
import './aside-filter.scss';

export function AsideFilter() {
  const { asideFilter } = useAppSelector((state) => state.tickets);

  const createRadioBtns = () => {
    return asideFilter.map((filter) => {
      return (
        <AsideFilterCheckbox
          key={filter.name}
          name={filter.name}
          label={filter.label}
          checked={filter.checked}
        />
      );
    });
  };

  return (
    <aside className="aside-filter">
      <h4 className="aside-filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</h4>
      {createRadioBtns()}
    </aside>
  );
}
