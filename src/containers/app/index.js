import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'

//export default Tab = connect( mapState, mapDispatch )( Tabs );

const App = () => {

    return (
        <div class="container">
          <div class="row">
            <div class="col-sm">

              <header>
                <Link to="/">Home</Link>
                <Link to="/about-us">About</Link>
              </header>

              <main>
                <Route exact path="/" component={Home} />
                <Route exact path="/about-us" component={About} />
              </main>

            </div>
          </div>
        </div>
    )
}

export default App;
