import React, { Component } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  addGuess,
  toggleEntryEnabled,
  calcTotal
} from '../../modules/counter'
import ReactCountdownClock from 'react-countdown-clock'
import EntrantForm from '../../components/forms/entrant-form.js'
import fire from '../../fire';
import clone from 'ramda/src/clone'


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        messages: [],
        isLoading: true,
        guessList: [],
        wagerTotal: 0,
        timerVisibile: false,
        timeLeft: 0,
        t: '',
        timerEnabled: true
    };

    let self = this

    fire.database().ref('/.info/serverTimeOffset')
      .once('value')
      .then(function stv(data) {
        let d = data.val() + Date.now();
        let b = new Date(d)
        self.setState({t: d})

        // let m = 3600 - (b.getMinutes() * 60)
        // let s = 60 - b.getSeconds()
        // let t = m + s
        // let calculatedTimeLeft = t - 1800 //1800
        let maxTimer = 30

        setInterval(() => {
            //console.log(new Date(self.state.t + 1))
            //let newTime = (new Date(self.state.t + 1000))
            let currentTime = new Date(self.state.t)
            let secPlus1 = currentTime.setSeconds(currentTime.getSeconds() + 1)
            let min = currentTime.getMinutes()
            let sec = currentTime.getSeconds()

            //console.log(min)

            self.setState({t: secPlus1}, () => {
                // console.log(self.state.t)
                console.log(new Date(self.state.t))
                // if (min <= 30) {
                //     self.setState({timerEnabled: true})
                //     console.log('Time left less or equal 30, timerEnabled true')
                // }
                // else {
                //     self.setState({timerEnabled: false})
                //     console.log('Time left greater than 30, timerEnabled false')
                // }

                // If the timer is disabled and its less than or == to 30 start the timer

                //let newTime = new Date(self.state.t)
                //let newMin = newTime.getMinutes()
                //console.log(typeof min)

                if (self.state.timerEnabled && min <= maxTimer) {
                    let timeInSecs = ((maxTimer - (min+1)) * 60) + (60 - sec) // Time left in minutes + time left in seconds
                    self.setState({timerEnabled: false, timeLeft: timeInSecs, timerVisibile: true})
                }

                if (!self.state.timerEnabled && min > maxTimer) {
                    self.setState({timerEnabled: true})
                }
                    // else if (maxTimer > 30) {
                    //    self.setState({timerEnabled: false, timerVisibile: false})
                    // }
                //console.log(newMin)
                // If time minutes >= 00 || < 30 start a new gameEntrants
                    // Hide yer stuff
                // If time minutes >= 30
                    // Kick off 30 min timer
            })
        }, 1000)

        //var intervalId = setInterval(calculatedTimeLeft, 1000);
        // store intervalId in the state so it can be accessed later:
        //this.setState({intervalId: intervalId});


        // if (calculatedTimeLeft > 0) {
        //     self.setState({timerVisibile: true, timeLeft: calculatedTimeLeft})
        //
        // }
        // else {
        //     self.setState({timerVisibile: false})
        // }

        // Get server time
        // Send to reducer
        // setInterval that updates the state every second by adding 1


        //console.log(b.getElementsByClassName('className'))
        //console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
      }, function (err) {
        return err;
      });
  }

  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    // let guessListRef = fire.database().ref('guessList').orderByKey().limitToLast(100);
    // guessListRef.on('child_added', snapshot => {
    //     console.log(snapshot)
    //   /* Update React state when message is added at Firebase Database */
    //   // let message = { text: snapshot.val(), id: snapshot.key };
    //   // this.setState({ messages: [message].concat(this.state.messages) });
    //   this.setState({isLoading: false})
    // })



    let messagesRef = fire.database().ref('guessList').orderByKey().limitToLast(100);

    console.log(messagesRef)
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let obj = snapshot.val()
      let newGuessListState = clone(this.state.guessList)
      newGuessListState.push({name: obj.name, guess: obj.guess, wager: obj.wager, id: snapshot.key})
      //console.log('-=-=-=-=-=-=-=-=-')

      //let toNumber = parseFloat(obj.wager, 10)
      //console.log(toNumber)
      // if (!isNaN(toNumber)) {
      let t = this.state.wagerTotal + obj.wager
      this.setState({'wagerTotal': t })
      //console.log(t)
      //
      //     console.log(this.state)
      // }
      //if (obj.wager !== undefined && (typeof obj.wager === 'number' || obj.wager === 'string')) {

         // console.log()
          //
          //console.log(this.state.wagerTotal)
      //}
      this.setState({'isLoading': false, 'guessList': newGuessListState});
      //this.props.calcTotal()
    })

    messagesRef.on('value', snapshot => {

      //console.log('aaaa')
      //console.log(this.state.wagerTotal)
      this.props.calcTotal(this.state.wagerTotal)
    })

  }

  toggleTimer () {

      console.log('HI toggleTImer')
      this.setState({timerVisibile: false}, this.props.toggleEntryEnabled)
  }

  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  render () {
      return (
          <div>

            <div className={this.state.timerVisibile ? '' : 'hideClock'}>
                 <ReactCountdownClock
                    seconds={this.state.timeLeft}
                    color="#000"
                    alpha={0.7}
                    size={200}
                    onComplete={() => this.toggleTimer()}
                    showMilliseconds={true}
                    weight={10} />
            </div>

            {this.props.entryEnabled
                ?
                <EntrantForm
                  dispatch={this.props.dispatch}
                  addGuess={this.props.addGuess} />
                :
                <div>
                    <p>Entry to this draw in now closed check back soon</p>
                </div>
            }


              {this.state.isLoading === true
                ?
                <p>Loading ...</p>
                :
                <div>
                <p>Total pot {this.props.wagerTotal}</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Prediction</th>
                            <th scope="col">Wager amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.state.guessList.map((guess) => {
                                return (
                                <tr key={guess.id}>
                                    <td>{guess.name}</td>
                                    <td>{guess.guess}</td>
                                    <td>{guess.wager}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                </div>
              }
        </div>
        )
    }
}

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  gameEntrants: state.counter.entrants,
  entryEnabled: state.counter.entryEnabled,
  wagerTotal: state.counter.wagerTotal
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  addGuess,
  dispatch,
  toggleEntryEnabled,
  calcTotal,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
//const Home = props => (



    //{/*
//   <div>
//
//
//
//     <h1>Home</h1>
//     <p>Count: {props.count}</p>
//
//     <ReactCountdownClock seconds={10}
//                          color="#000"
//                          alpha={0.7}
//                          size={200}
//                          onComplete={props.toggleButtonState}
//                          showMilliseconds={true}
//                          weight={10} />
//
//     <p>
//       <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
//       <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
//     </p>
//
//     <p>
//       <button onClick={props.decrement} disabled={props.isDecrementing}>Decrement</button>
//       <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
//     </p>
//
//     <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p>
//
//
//     <table>
//         <tbody>
//             {props.gameEntrants.map((entrant, i) =>
//                 <tr key={i}>
//                     <td>{entrant.name}</td>
//                     <td>{entrant.guess}</td>
//                     <td>{entrant.wager}</td>
//                 </tr>
//             )}
//         </tbody>
//         <tfoot>
//             <tr>
//                 <td>{props.totalWager}</td>
//             </tr>
//         </tfoot>
//     </table>
//
//     <EntrantForm
//         dispatch={props.dispatch}
//         addGuess={props.addGuess}
//         buttonState={props.buttonState}
//     />
//
//   </div>*/}
//   </form>
// )
