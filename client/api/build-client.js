import axios from 'axios';

export default ({ req }) => {
    // if the url is undefined (it is not a navigation to one page to anther)
    if (typeof window === 'undefined') {
        // We are no the server!

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // we are on the browser
        return axios.create({
            baseURL: '/'
        });
    }
}


/************************ */

    // // if the url is undefined (it is not a navigation to one page to anther)
    // if (typeof window === 'undefined') {
    //     // We are no the server!
    //     // Request must be http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
    //     const { data } = await axios.get(
    //         //http://<servicename>.<namespace>.svc.cluster.local
    //         // headers: must be specified because the rules in ingress-serv.yaml configuration
    //         'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
    //             headers: req.headers
    //             // headers: {
    //             //     Host: 'ticketing.dev'
    //             // }
    //         })

    //     return data;        
    // } else {
    //     // we are on the browser
    //     // requests can be made with a base url of ''
    //     // test by navigating to signup successfully
    //     const { data } = await axios.get('/api/users/currentuser')

    //     return data;
    // }