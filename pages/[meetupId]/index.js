import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return (
        <MeetupDetail 
            image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg"
            title="A First Meetup"
            address="Some Street 5, 12345 City"
            description="The meetup description"
        />
    );
} 

export async function getStaticPaths() {
    return {
        fallback: false, // 아래 해당사항 없는 params 입력 시 404에러 발생시킴
        paths: [
            { params: {
                meetupId: "m1",
            }},
            { params: {
                meetupId: "m2",
            }}
        ]
    }
} 

export async function getStaticProps(context) {
 // fetch data for a single meetup

    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                image:"https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
                id: meetupId,
                title: "A First Meetup",
                address: "Some Street 5, 12345 City",
                description: "The meetup description"
            }
        }
    }
}

export default MeetupDetails;