interface Values {
    name: string;
    surname: string;
    email: string;
}

export const sendEmail = async (values: Values) => {
    try {
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        // handle success
        if (response.ok) {
            console.log('Email sent successfully');
        } else {
            console.error("There was a problem sending email. Pls try again!", response.statusText, response.status, response.body);
        }
    } catch (error) {
        console.log("Error sending email:", error);
        console.error("There was a problem sending email. Pls try again!");
    } finally {
        console.log("Email sent successfully!")
    }
}