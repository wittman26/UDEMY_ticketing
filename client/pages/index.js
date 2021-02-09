import axios from 'axios';

const LandingPage = ({ currentuser }) => {
    // const LandingPage = ({ color}) => { 

    // Executed in the browser
    // console.log('I am on the component', color);
    console.log('OUR CURRENT USER: ' + currentuser);

    return <h1>Landing Page</h1>;
};

// initial props for nextjs
// executed during the server renderig process
LandingPage.getInitialProps = async ( { req }) => {

    console.log(req.headers);

    // if the url is undefined (it is not a navigation to one page to anther)
    if (typeof window === 'undefined') {
        // We are no the server!
        // Request must be http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
        const { data } = await axios.get(
            //http://<servicename>.<namespace>.svc.cluster.local
            // headers: must be specified because the rules in ingress-serv.yaml configuration
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
                headers: req.headers
                // headers: {
                //     Host: 'ticketing.dev'
                // }
            })

        return data;        
    } else {
        // we are on the browser
        // requests can be made with a base url of ''
        // test by navigating to signup successfully
        const { data } = await axios.get('/api/users/currentuser')

        return data;
    }
    return {};

    // console.log('I am on the server');
    // return { color: 'red' };
}

export default LandingPage;