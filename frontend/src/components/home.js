import React from 'react';
import Auth from './auth/auth';
class Home extends React.Component {

    render() {
        return (
        <Auth>
                <div>
                    <h2>Home</h2>
                    <p>API: {__API_URL__}</p>
                </div>    
        </Auth>
        )
    }
}

export default Home;