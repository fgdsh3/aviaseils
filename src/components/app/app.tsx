import { useAppSelector } from '../../hooks/redux';
import { TicketList } from '../ticket-list/ticket-list';
import { HeadFilters } from '../head-filters/head-filters';
import './app.scss';
import { useDispatch } from 'react-redux';
import { addTickets } from '../../store/reducers/ticketsSlice';
import { AsideFilter } from '../aside-filter/aside-filter';

export const App: React.FC = () => {
  const { sortedTickets } = useAppSelector((state) => state.tickets);

  const dispatch = useDispatch();

  return (
    <div className="app container">
      <AsideFilter />
      <div className="tickets-box">
        <HeadFilters />
        <TicketList />
        {sortedTickets.length === 0 ? null : (
          <button
            className="showmore-btn"
            onClick={() => dispatch(addTickets())}
          >
            Показать еще 5 билетов!
          </button>
        )}
      </div>
    </div>
  );
};
