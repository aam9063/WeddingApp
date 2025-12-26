import React from 'react';
import '../styles/EmailTemplate.css';

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    lastName,
    email
}) => {
    const event = {
        title: "Boda de Patricia y Albert, 2 de Mayo del 2026",
        description: "Boda de Patricia y Albert, 2 de Mayo del 2026",
        locationCeremonia: "Monasterio de la Santa Faz a las 17.30h, Alicante",
        locationCeremoniaEN: "Monastery of the Holy Faz at 17:30 PM, Alicante",
        locationBanquete: "Finca Torre de Reixes, Alicante",
        startTime: "2026-05-02T17:30:00",
        endTime: "2026-05-02T18:30:00",
        contacts: {
            albert: process.env.NEXT_PUBLIC_ALBERT_CONTACT,
            patricia: process.env.NEXT_PUBLIC_PATRICIA_CONTACT
        },
    };

    const { title, description, locationCeremonia, locationBanquete, startTime, endTime, contacts } = event;

    const start = new Date(startTime).toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';
    const end = new Date(endTime).toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';

    const getGoogleCalendarUrl = (lang: 'es' | 'en') => {
        const titleText = lang === 'es' ? title : "Patri & Albert Wedding, 2nd May 2026";
        const detailsText = lang === 'es' ?
            `${description}\n\nContactos:\nAlbert: ${contacts.albert}\nPatricia: ${contacts.patricia}` :
            `Patri & Albert Wedding, 2nd May 2026\n\nContacts:\nAlbert: ${contacts.albert}\nPatricia: ${contacts.patricia}`;
        const locationText = lang === 'es' ? locationCeremonia : "Santa Faz Monastery at 05:30 PM, Alicante";

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titleText)}&dates=${start}/${end}&details=${encodeURIComponent(detailsText)}&location=${encodeURIComponent(locationText)}`;
    };

    const getOutlookCalendarUrl = (lang: 'es' | 'en') => {
        const titleText = lang === 'es' ? title : "Patri & Albert Wedding, 2nd May 2026";
        const detailsText = lang === 'es' ?
            `${description}\n\nContactos:\nPatricia: ${contacts.patricia}\nAlbert: ${contacts.albert}` :
            `Patri & Albert Wedding, 02th May 2026\n\nContacts:\nPatricia: ${contacts.patricia}\nAlbert: ${contacts.albert}`;
        const locationText = lang === 'es' ? locationCeremonia : "Santa Faz Monastery at 05:30 PM, Alicante";

        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(titleText)}&body=${encodeURIComponent(detailsText)}&startdt=${startTime}&enddt=${endTime}&location=${encodeURIComponent(locationText)}`;
    };

    const getIcsContent = (lang: 'es' | 'en') => {
        const titleText = lang === 'es' ? title : "Patri & Albert Wedding, 2nd May 2026";
        const detailsText = lang === 'es' ?
            `${description}\n\nContactos:\nPatricia: ${contacts.patricia}\nAlbert: ${contacts.albert}` :
            `Patri & Albert Wedding, 02th May 2026\n\nContacts:\nPatricia: ${contacts.patricia}\nAlbert: ${contacts.albert}`;
        const locationText = lang === 'es' ? locationCeremonia : "Santa Faz Monastery at 05:30 PM, Alicante";
        return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${titleText}
DESCRIPTION:${detailsText}
LOCATION:${locationText}
DTSTART:${start}
DTEND:${end}
END:VEVENT
END:VCALENDAR`;
    };

    const getIcsUrl = (lang: 'es' | 'en') => {
        const icsContent = getIcsContent(lang);
        const icsFile = new Blob([icsContent], { type: 'text/calendar' });
        const icsUrl = URL.createObjectURL(icsFile);
        return icsUrl;
    };

    return (
        <div className="container mx-auto p-6">

            {/* Sección en Español */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">¡Bienvenido, {firstName} {lastName}!</h1>
                <p className="mb-6">
                    Te has registrado exitosamente el día de nuestra boda.
                </p>
                <h2 className="text-xl font-semibold mb-4">Detalles del Evento</h2>
                <p className="mb-4">
                    <strong>{event.title}</strong>
                    <br />
                    <strong>Ceremonia:</strong> {event.locationCeremonia}
                    <br />
                    <strong>Banquete:</strong> {event.locationBanquete}
                </p>
                <p className="mb-4">
                    Para cualquier duda puedes contactarnos a estos números de teléfono:
                </p>
                <p className="mb-4">
                    <strong>Contactar a Patri:</strong> {}
                    <br />
                    <strong>Contactar a Albert:</strong> {}
                </p>
              
            </div>

            <br></br>

            {/* Sección en Inglés */}
            <div className="mt-12">
                <h1 className="text-2xl font-bold mb-4">Welcome, {firstName} {lastName}!</h1>
                <p className="mb-6">
                    You have successfully registered on our wedding day.
                </p>
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <p className="mb-4">
                    <strong>Patri & Albert Wedding, 02th May 2026</strong>
                    <br />
                    <strong>Ceremony Location:</strong> {event.locationCeremoniaEN}
                    <br />
                    <strong>Reception Location:</strong> {event.locationBanquete}
                </p>
                <p className="mb-4">
                    For any questions, you can contact us at these phone numbers:
                </p>
                <p className="mb-4">
                    <strong>Contact Patri:</strong> {}
                    <br />
                    <strong>Contact Albert:</strong> {}
                </p>
                
            </div>
        </div>
    );
};