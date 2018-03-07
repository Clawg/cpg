import React from 'react'
import fire from '../../fire.js';
//import { render } from 'react-dom'

export class EntrantForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        name: '',
        guess: 0,
        wager: 0
    }
  }

  handleSubmit(e) {

    e.preventDefault();
    //console.log(this.state)
    //fire.database().ref('guessList').push(this.state)

    fire.database().ref('guessList').push(this.state, (error) => {

        if (error) {
            console.log('Error has occured during saving process')
        } else {
            console.log("Data hss been saved succesfully")
        }
    })



    e.target.reset();
    this.setState({name: '', guess: 0, wager: 0})

  }

  render() {
    return (

                <form onSubmit={(e) => this.handleSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input onChange={(e) => this.setState({name: e.target.value})} type="name" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Name" />
                    <small id="nameHelp" className="form-text text-muted">For the leaderboard!</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="prediction" className="sr-only">Your prediction</label>
                    <input onChange={(e) => this.setState({guess: e.target.value})} type="number" className="form-control" id="prediction" aria-describedby="predictionHelp" placeholder="Your prediction" />
                    <small id="predictionHelp" className="form-text text-muted">For the leaderboard!</small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="wager" className="sr-only">Wager</label>
                      <input onChange={(e) => this.setState({wager: parseFloat(e.target.value, 10)})} id="wager" type='number' className="form-control" aria-describedby="wagerHelp" placeholder="Wager" />
                      <small id="wagerHelp" className="form-text text-muted">Stella Lumens</small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="wallettAddress" className="sr-only">Stella Address</label>
                      <input onChange={(e) => this.setState({guess: e.target.value})} id="wallettAddress" type='number' className="form-control" aria-describedby="wallettAddressHelp" placeholder="Your wallett address" />
                      <small id="wallettAddressHelp" className="form-text text-muted">Where you want your winnings sent (Stella Lumens)</small>
                  </div>
                  <input className="btn btn-primary" disabled={this.props.buttonState} type="submit" value="Submit" />
                </form>
        
    )
  }
}

export default EntrantForm
