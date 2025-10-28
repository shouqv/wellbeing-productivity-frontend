import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { useState, useEffect } from 'react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'

// crediting the source: https://schedule-x.dev/docs/frameworks/react
// for the below code, and i have customized it based on my needs
function Calender({ tasks }) {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendarControls = createCalendarControlsPlugin()


    const calendar = useCalendarApp({
        views: [createViewDay(), createViewMonthAgenda(), createViewMonthGrid(), createViewWeek()],
        events: [],
        plugins: [eventsService]
    })

    useEffect(() => {
        if (tasks?.length) {
            const mappedEvents = tasks.map(task => ({
                id: String(task.id),
                title: task.content,
                start: Temporal.PlainDate.from(task.date),
                end: Temporal.PlainDate.from(task.date),
            }));

            eventsService.set(mappedEvents);
        }
         
    }, [tasks]);

    useEffect(() => {
       
    }, []);

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default Calender