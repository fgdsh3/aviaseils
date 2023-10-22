import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IState } from '../../interfaces/interfaces';

export const cheapest = 'cheapest';
export const fastest = 'fastest';
export const optimal = 'optimal';

const initialState: IState = {
  loading: 'pending',
  visibleTicketsCount: 5,
  errorsCountInRow: 0,
  isStop: false,
  headFilter: cheapest,
  asideFilter: [
    { name: 'all', label: 'Все', checked: false },
    { name: '0', label: 'Без пересадок', checked: true },
    { name: '1', label: '1 пересадка', checked: false },
    { name: '2', label: '2 пересадки', checked: false },
    { name: '3', label: '3 пересадки', checked: false },
  ],
  tickets: [],
  sortedTickets: [],
};

export const fetchSearchId = async () => {
  const response = await axios.get(
    'https://aviasales-test-api.kata.academy/search'
  );
  const { searchId } = response.data;
  localStorage.setItem('searchId', searchId);
};

export const fetchTickets = createAsyncThunk('tickets/fetchData', async () => {
  const searchId = localStorage.getItem('searchId');
  const response = await axios.get(
    `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
  );
  return response.data;
});

export const tickets = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets(state) {
      state.visibleTicketsCount += 5;
    },
    changeHeadFilter(state, action) {
      state.headFilter = action.payload;
    },
    setLoading(state, action) {
      if (state.loading === 'pending' && action.payload === 'sorting') {
        state.loading = 'sorting and pending';
      } else {
        state.loading = action.payload;
      }
    },
    setIsStop(state, action) {
      state.isStop = action.payload as boolean;
    },
    checkAsideFilter(state, action) {
      const checkedAsideFilters: string[] = [];
      if (action.payload === 'all' && !state.asideFilter[0].checked) {
        state.asideFilter = state.asideFilter.map((filter) => {
          filter.checked = true;
          return filter;
        });
      } else if (action.payload === 'all' && state.asideFilter[0].checked) {
        state.asideFilter = state.asideFilter.map((filter) => {
          filter.checked = false;
          return filter;
        });
      } else {
        state.asideFilter = state.asideFilter.map((filter) => {
          if (filter.name === action.payload) {
            filter.checked = !filter.checked;
            if (!filter.checked) {
              state.asideFilter[0].checked = false;
            }
          }
          if (filter.checked) {
            checkedAsideFilters.push(filter.name);
          } else {
            checkedAsideFilters.splice(
              checkedAsideFilters.indexOf(filter.name)
            );
          }
          return filter;
        });
      }
      if (checkedAsideFilters.length === 4) {
        state.asideFilter[0].checked = true;
      }
    },
    sortTickets(state) {
      const { headFilter, asideFilter, tickets } = state;
      let sortedTickets = [...tickets];
      if (state.loading === 'loaded') {
        state.loading = 'sorting';
      }

      if (headFilter === cheapest) {
        sortedTickets = tickets.sort((prev, next) => prev.price - next.price);
      } else if (headFilter === fastest) {
        sortedTickets = tickets.sort(
          (prev, next) => prev.segments[0].duration - next.segments[0].duration
        );
      } else if (headFilter === optimal) {
        sortedTickets = tickets.sort(
          (prev, next) =>
            prev.segments[0].duration +
            prev.price -
            (next.segments[0].duration + next.price)
        );
      }
      const checkedAsideFilterNames = asideFilter
        .filter((filter) => filter.checked)
        .map((filter) => filter.name);

      state.sortedTickets = sortedTickets.filter((ticket) => {
        const transfersCount1 = String(
          ticket.segments[0].stops.join('').length / 3
        );
        if (
          checkedAsideFilterNames.includes(transfersCount1) ||
          checkedAsideFilterNames.includes('all')
        ) {
          return true;
        }
        return false;
      });
      if (state.loading === 'sorting') {
        state.loading = 'loaded';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state: IState) => {
      if (!state.isStop) {
        state.loading =
          state.loading === 'sorting' ? 'sorting and pending' : 'pending';
      }
    });
    builder.addCase(fetchTickets.fulfilled, (state: IState, action) => {
      state.isStop = action.payload.stop as boolean;
      state.tickets.push(...action.payload.tickets);
      if (state.isStop) {
        state.loading =
          state.loading === 'sorting and pending' ? 'sorting' : 'loaded';
      }
      state.errorsCountInRow = 0;
    });
    builder.addCase(fetchTickets.rejected, (state: IState) => {
      state.errorsCountInRow += 1;
    });
  },
});

export const {
  addTickets,
  changeHeadFilter,
  setLoading,
  sortTickets,
  setIsStop,
  checkAsideFilter,
} = tickets.actions;
