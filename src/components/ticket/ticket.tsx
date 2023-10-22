import formatDate from '../../helpers/format-date';
import formatDuration from '../../helpers/format-duration';
import formatPrice from '../../helpers/format-price';
import formatStopsCount from '../../helpers/format-transfers-count';
import { ITicket } from '../../interfaces/interfaces';
import './ticket.scss';

export function Ticket({ price, segments, id }: ITicket) {
	return (
		<li className="ticket-list__item" key={id}>
			<div className="ticket-list__item-head">
				<span className="ticket-list__item-price">{formatPrice(price)} Р</span>
				<img className="ticket-list__item-logo" src="" alt="" />
			</div>
			<div className="descr-row">
				<dl className="city-time">
					<dt>{`${segments[0].destination} - ${segments[0].origin}`}</dt>
					<dd>{formatDate(segments[0].date, segments[0].duration)}</dd>
				</dl>
				<dl className="travel-time">
					<dt>В пути</dt>
					<dd>{formatDuration(segments[0].duration)}</dd>
				</dl>
				<dl className="transfers">
					<dt>{formatStopsCount(segments[0].stops)}</dt>
					<dd>{segments[0].stops.join(', ')}</dd>
				</dl>
			</div>
			<div className="descr-row descr-row-second">
				<dl className="city-time">
					<dt>{`${segments[1].destination} - ${segments[1].origin}`}</dt>
					<dd>{formatDate(segments[1].date, segments[1].duration)}</dd>
				</dl>
				<dl className="travel-time">
					<dt>В пути</dt>
					<dd>{formatDuration(segments[1].duration)}</dd>
				</dl>
				<dl className="transfers">
					<dt>{formatStopsCount(segments[1].stops)}</dt>
					<dd>{segments[1].stops.join(', ')}</dd>
				</dl>
			</div>
		</li>
	);
}
