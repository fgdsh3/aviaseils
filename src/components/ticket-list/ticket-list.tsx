import { FC, useEffect } from 'react';
import './ticket-list.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchSearchId,
  fetchTickets,
  setLoading,
  setIsStop,
  sortTickets,
} from '../../store/reducers/ticketsSlice';
import { Ticket } from '../ticket/ticket';
import { ITicket } from '../../interfaces/interfaces';

export const TicketList: FC = () => {
  const dispatch = useAppDispatch();
  const {
    tickets,
    loading,
    errorsCountInRow,
    isStop,
    visibleTicketsCount,
    sortedTickets,
    headFilter,
  } = useAppSelector((state) => state.tickets);

  let maxTicketId = 0;

  useEffect(() => {
    fetchSearchId().then(() => {
      dispatch(setLoading('pending'));
      dispatch(setIsStop(false));
    });
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      if (!isStop) {
        dispatch(fetchTickets());
      }
      dispatch(sortTickets());
    }, 100);
  }, [errorsCountInRow, tickets, isStop, loading, dispatch, headFilter]);

  const createTickets = (ticketsArray: ITicket[], ticketsCount: number) => {
    const displayedTickets = [];
    for (let i = 0; i < ticketsCount; i++) {
      const currTicket = ticketsArray[i];
      if (currTicket) {
        const ticket = (
          <Ticket
            key={maxTicketId}
            id={maxTicketId++}
            price={currTicket.price}
            carrier={currTicket.carrier}
            segments={currTicket.segments}
          />
        );
        displayedTickets.push(ticket);
      }
    }
    return displayedTickets;
  };

  const ticketListClassNames = classNames({
    'ticket-list': true,
    sorting:
      sortedTickets.length > 0
        ? loading === 'sorting' || loading === 'sorting and pending'
        : null,
  });

  return (
    <ul className={ticketListClassNames}>
      {(loading === 'sorting' || loading === 'sorting and pending') && (
        <span className="sorting-spinner" />
      )}
      {(loading === 'pending' || loading === 'sorting and pending') && (
        <span className="pending" />
      )}
      {sortedTickets.length === 0 && loading === 'loaded' ? (
        <span>Не удалось найти билеты по указанным фильтрам</span>
      ) : null}
      {errorsCountInRow >= 10 && <span>Ошибка со стороны сервера</span>}
      {createTickets(sortedTickets, visibleTicketsCount)}
    </ul>
  );
};
