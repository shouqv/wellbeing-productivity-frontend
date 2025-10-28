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
// and https://github.com/schedule-x/schedule-x/blob/main/packages/calendar-controls/src/calendar-controls-plugin.impl.ts
// for the below code, and i have customized it based on my needs
function Calender({ tasks }) {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendarControls = useState(() => createCalendarControlsPlugin())[0]


    const calendar = useCalendarApp({
        isDark: true,
        views: [createViewDay(), createViewMonthAgenda(), createViewMonthGrid(), createViewWeek()],
        events: [],
        plugins: [eventsService, calendarControls],
        callbacks: {
            onSelectedDateUpdate(date) {
                console.log('Date picked by user', date.toString())
            }
        }
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

    }, [tasks, eventsService]);

    useEffect(() => {
        if (calendar) {
            const initialDate = calendarControls.getDate()
            console.log('Initial date', initialDate.toString())
        }
    }, [calendar])

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default Calender