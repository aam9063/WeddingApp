import  {FC} from "react";

interface Event {
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
}

const AddToCalendar: FC = () => {
    const event: Event = {
        title: "Boda de Patricia y Albert",
        description: "Boda de Patricia y Albert",
        location: "Monasterio de la Santa Faz, Alicante",
        startTime: "2026-05-02T17:30:00",
        endTime: "2026-05-02T18:30:00" 
    };

    const {title, description, location, startTime, endTime} = event;

    const start = new Date(startTime).toISOString().replace(/-|:|\.\d+/g, '');
    const end = new Date(endTime).toISOString().replace(/-|:|\.\d+/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

    const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&startdt=${startTime}&enddt=${endTime}&location=${encodeURIComponent(location)}`;

    const icsContent = `
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${title}
    DESCRIPTION:${description}
    LOCATION:${location}
    DTSTART:${start}
    DTEND:${end}
    END:VEVENT
    END:VCALENDAR
    `;
    const icsFile = new Blob([icsContent], {type: 'text/calendar'});
    const icsUrl = URL.createObjectURL(icsFile);

    return (
        <div>
            <ul>
                <li><a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">Google Calendar</a></li>
                <li><a href={outlookCalendarUrl} target="_blank" rel="noopener noreferrer">Outlook Calendar</a></li>
                <li><a href={icsUrl} download="event.ics">iCalendar</a></li>
            </ul>
        </div>
    );
};

export default AddToCalendar;