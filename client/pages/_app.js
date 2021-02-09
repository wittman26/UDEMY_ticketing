// Boostrap mus be installed in order to work
import 'bootstrap/dist/css/bootstrap.css';

// Next will import the properties defined here
// This is an custom app component
// Component will be banana or index for example
export default ({ Component, pageProps }) => {
    return <Component {...pageProps}/>
}