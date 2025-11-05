import { useEffect, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import { createViewMonthGrid } from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls"
import "temporal-polyfill/global"
import "@schedule-x/theme-default/dist/index.css"

// crediting docs: https://schedule-x.dev/docs/frameworks/react
// customized for mood calendar

function CalendarMoodTracking({ data }) {
    const emojiData = data?.emojis_this_month || []


    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendarControls = useState(() =>
        createCalendarControlsPlugin({
            showToday: true,
            showDatePicker: false,
            showViewSelect: false,
        })
    )[0]

    const calendar = useCalendarApp({
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        views: [createViewMonthGrid()],
        plugins: [eventsService, calendarControls],
        events: [],
        callbacks: {
            onSelectedDateUpdate(date) {
                console.log(date.toString())
            },
        },
    });

    useEffect(() => {
        if (emojiData?.length) {
            const mappedEvents = emojiData.map((entry, index) => ({
                id: String(index),
                title: entry.emoji,
                start: Temporal.PlainDate.from(entry.date),
                end: Temporal.PlainDate.from(entry.date),
            }));

            eventsService.set(mappedEvents)
        }
    }, [emojiData, eventsService])

    return (
        <div >
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}




export default CalendarMoodTracking
