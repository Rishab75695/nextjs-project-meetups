import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name='description' content="Browse a list of react meetups!"></meta>
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://test-db:5is63ThSHSTUt2Y@cluster0.bkmei72.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meeetupsCollection = db.collection("meetups");

  const meetups = await meeetupsCollection.find().toArray();

  client.close();

  // fetch data fdrom api or database
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
