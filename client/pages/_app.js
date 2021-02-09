// Boostrap must be installed in order to work
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client'
import Header from '../components/header'

// Next will import the properties defined here
// This is an custom app component
// Component will be banana or index for example
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <div>
        <Header currentUser={currentUser} />
        <Component {...pageProps} />
    </div>
}
// appContext = {Component, ctx: {req,res}}
AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser')

    let pageProps = {};
    // Initialize manually initialProps of landing page
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    console.log("AppComponent: " + JSON.stringify(data))
    return {
        pageProps,
        currentUser: data.currentuser
    };
}

export default AppComponent;