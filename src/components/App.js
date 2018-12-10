import React from 'react';
import TopPanel from './TopPanel';
import MapboxSet from './MapboxSet';
import Legend from './Legend';
import Summary from './Summary';

import '../Page.less';
import 'mapbox-gl/dist/mapbox-gl.css';

class App extends React.Component {
    render(){
        return (
            <div>
                <TopPanel />
                <div>
                    <MapboxSet />
                </div>
            </div>
        );
    }

}

export default App;




