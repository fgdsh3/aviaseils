export interface IHeadButton {
  name: string;
  label: string;
  isActive: boolean;
}

export interface ITicket {
  price: number;
  carrier: string;
  segments: [
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
  ];
  id?: number;
}

export interface IState {
  tickets: ITicket[];
  sortedTickets: ITicket[];
  visibleTicketsCount: number;
  loading: 'sorting and pending' | 'sorting' | 'pending' | 'loaded';
  errorsCountInRow: number;
  isStop: boolean;
  headFilter: 'cheapest' | 'fastest' | 'optimal';
  asideFilter: { name: string; label: string; checked: boolean }[];
}
