import buildClient from '../api/build-client'

const LandingPage = ({ currentuser }) => {
    // const LandingPage = ({ color}) => { 

    // Executed in the BROWSER
    // console.log('I am on the component', color);
    console.log('LANDING PAGE BROWSER CURRENT USER: ' + JSON.stringify(currentuser));

    return currentuser ? <h1>Your signed in!!</h1> : <h1>Your NOT signed in</h1>;
};

// initial props for nextjs
// executed during the SERVER renderig process
// context = {req,res}
LandingPage.getInitialProps = async (context) => {
    console.log('LANDING PAGE: I am on the server');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser')

    return data;
    // console.log('I am on the server');
    // return { color: 'red' };
}

export default LandingPage;