import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
} 

export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://pjpp8588:dN7GcEjYvpxGQd8x@cluster0.8gd6qwr.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: false, // 아래 해당사항 없는 params 입력 시 404에러 발생시킴
        paths: meetups.map(meetup => ({ params: {meetupId: meetup._id.toString() }}))
    }
} 

export async function getStaticProps(context) {
 // fetch data for a single meetup

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://pjpp8588:dN7GcEjYvpxGQd8x@cluster0.8gd6qwr.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId) });

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            },
        }
    }
}

export default MeetupDetails;