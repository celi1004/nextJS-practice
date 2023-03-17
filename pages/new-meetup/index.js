import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm"

function NewMeetupPage() {

    async function addMeetupHandler(enteredMeetup) {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetup),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        console.log(data);
    }

    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta name="description" content="Add your own meetups and create amazing networking opportunities." />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}

export default NewMeetupPage;