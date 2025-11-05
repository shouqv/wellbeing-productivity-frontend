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
import '../../styles/calender.css'

// crediting the source: https://schedule-x.dev/docs/frameworks/react
// and https://github.com/schedule-x/schedule-x/blob/main/packages/calendar-controls/src/calendar-controls-plugin.impl.ts
// for the below code, and i have customized it based on my needs

function Calender({ tasks, getTodayTask, setDate }) {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendarControls = useState(() => createCalendarControlsPlugin({
        showToday: true,
        showViewSelect: false,
    }))[0]


    const calendar = useCalendarApp({
        // crediting: https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        views: [createViewMonthAgenda()],
        events: [],
        plugins: [eventsService, calendarControls],
        callbacks: {
            onSelectedDateUpdate(date) {
                console.log('Date picked by user', date.toString())

                setDate(date.toString())
                getTodayTask(date.toString())
            }
        },
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

    }, [tasks, eventsService])

    return (
        <div className="calendar-container">
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default Calender