import buildClient from '../api/build-client'

const LandingPage = ({ currentuser }) => {
    // const LandingPage = ({ color}) => { 

    // Executed in the BROWSER
    // console.log('I am on the component', color);
    console.log('OUR CURRENT USER: ' + JSON.stringify(currentuser));

    return <h1>Landing Page</h1>;
};

// initial props for nextjs
// executed during the SERVER renderig process
LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser')

    return data;
    // console.log('I am on the server');
    // return { color: 'red' };
}

export default LandingPage;