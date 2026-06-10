import { CalendarEvent } from '../components/eventCalendar/types'
export enum EventCalendarActions {
    ShowMore = 'showMore',
    CloseShowMore = 'closeShowMore',
    AddEvent = 'addEvent',
    OpenAddEventModal = 'openAddEventModal',
    OpenEditEventModal = 'openEditEventModal',
    SubmitEvent = 'submitEvent',
    CloseAddEvent = 'closeAddEvent'
}

type EventCalendarState = {
    events: any,
    openEditEventForm?: boolean,
    currentEvent?: CalendarEvent | null,
}

interface Action {
    type: EventCalendarActions;
    payload?: any;
}

export function EventCalendarReducer(state: EventCalendarState = { events: [] }, action: Action): EventCalendarState {
    const { type } = action;
    switch (type) {
        // case EventCalendarActions.ShowMore: {
        //     const { showMoreEvents, showMoreDate } = action.payload!;
        //     return {
        //         ...state,
        //         openShowMoreModal: true,
        //         showMoreEvents: showMoreEvents,
        //         showMoreDate: showMoreDate
        //     };
        // }
        // case EventCalendarActions.CloseShowMore: {
        //     return {
        //         ...state,
        //         openShowMoreModal: false,
        //         showMoreEvents: null,
        //         showMoreDate: null
        //     };
        // }
        case EventCalendarActions.OpenAddEventModal: {
            const { event } = action.payload!;
            return {
                ...state,
                openEditEventForm: true,
                currentEvent: {
                    ...event,
                    title: '',
                    allDay: false
                }
            }
        }
        case EventCalendarActions.OpenEditEventModal: {
            const { event } = action.payload!;
            return {
                ...state,
                openEditEventForm: true,
                currentEvent: event
            }
        }
        case EventCalendarActions.SubmitEvent: {
            const { event } = action.payload!;
            let _events = [...state.events];
            if (event.id != null) {
                let eventToUpdateIndex = _events.findIndex((e: { id: any; }) => e.id == event.id);
                _events[eventToUpdateIndex] = event;
            }
            else {
                _events.push({ ...event, id: state.events.length });
            }
            return {
                ...state,
                events: _events,
                openEditEventForm: false,
                currentEvent: null
            }
        }
        case EventCalendarActions.CloseAddEvent: {
            return {
                ...state,
                openEditEventForm: false,
                currentEvent: null
            }
        }

        default:
            return state;
    }
}