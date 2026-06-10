import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns-jalali/format';
import parse from 'date-fns-jalali/parse';
import startOfWeek from 'date-fns-jalali/startOfWeek';
import getDay from 'date-fns-jalali/getDay';
import faIR from 'date-fns/locale/fa-IR';


// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './rbc-custom.css';
import myEvents from './events'
import { useCallback, useMemo, useReducer, useState } from 'react';
import { EventCalendarActions, EventCalendarReducer } from '../../reducers/CalendarReducer';
import EventEditForm from './modals/EventEditForm';
import { addHours, addMinutes, getHours, getMinutes, isSameDay, subDays } from 'date-fns-jalali';
import { defaultEndHour, defaultStartHour, setEventToFullDay } from './Utils';

const locales = {
    'fa-IR': faIR
}

const messages = {
    allDay: 'تمام روز',
    previous: 'قبلی',
    next: 'بعدی',
    today: 'امروز',
    month: 'ماه',
    week: 'هفته',
    day: 'روز',
    date: 'تاریخ',
    time: 'ساعت',
    agenda: 'اتفاق',
    noEventsInRange: 'هیچ موردی در این بازه یافت نشد',
    showMore: (total: any) => `+${total} نمایش بیشتر`,
};


const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})


export const EventCalendar = (props: any): any => {
    const [state, dispatch] = useReducer(EventCalendarReducer, { events: [] });
    const { openEditEventForm, currentEvent, events } = state;

    const handleCloseAddEvent = (newEvent: Event, editMode: boolean) => {
        if (newEvent) {
            dispatch({
                type: EventCalendarActions.SubmitEvent,
                payload: {
                    event: newEvent,
                    editMode: editMode
                }
            })
        }
        else {
            dispatch({ type: EventCalendarActions.CloseAddEvent })
        }
    }


    const handleSelectSlot = useCallback((args: any) => {
        let { start, end } = args;
        let newEvent = { start, end, title: '' }
        if (!isSameDay(start, end)) {
            newEvent.end = subDays(end, 1)
            newEvent = setEventToFullDay(newEvent)
        }
        dispatch({
            type: EventCalendarActions.OpenAddEventModal,
            payload: {
                event: newEvent
            }
        })
    }, [events]);

    const handleSelectEvent = useCallback((event: any) => {
        dispatch({
            type: EventCalendarActions.OpenEditEventModal,
            payload: { event }
        })
    }, []);


    const formats = useMemo(() => ({
        monthHeaderFormat: 'MMMM',
        eventTimeRangeFormat: ({ start, end }: any, culture: any, localizer: any) => {
            return localizer.format(start, 'HH:mm', culture) + ' تا ' + localizer.format(end, 'HH:mm', culture);
        },
        dayHeaderFormat: (date: Date, culture: any, localizer: any) => localizer!.format(date, 'EEEE dd MMMM', culture),
        timeGutterFormat: (date: any, culture: any, localizer: any) => {
            return localizer.format(date, 'HH:mm', culture)
        }
    }), []);

    return (
        <>
            <Calendar
                min={new Date(0, 0, 0, defaultStartHour, 0, 0)}
                max={new Date(0, 0, 0, defaultEndHour, 0, 0)}
                formats={formats}
                culture={'fa'}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'day']}
                rtl={true}
                messages={messages}
                style={{ height: 500, width: '100%' }}
                // popup
                // onShowMore={handleOnShowMore}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
            />
            {
                openEditEventForm && <EventEditForm open={openEditEventForm} onClose={handleCloseAddEvent} entity={currentEvent} dispatch={dispatch} />
            }
        </>
    )
}
