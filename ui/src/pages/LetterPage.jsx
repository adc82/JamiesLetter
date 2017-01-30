import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import EnvelopeContainer from '../components/EnvelopeContainer';
import Letter from '../components/Letter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/letter';


class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentDidMount() {
    if(this.props.pageState == 0) {
      setTimeout(this.props.actions.pageState, 1000);
    }
  }

  letterClickHandler(event) {
    console.log('working');
    event.preventDefault();
  }

  inputChangeHandler(event) {
    this.props.actions.inputChange(event.target.value);
  }

  render() {

    let letterClass;
    let envelopeClass;
    let displayLetter;
    switch (this.props.pageState % 4) {
      case 0:
        letterClass = "letter-offScreen";
        envelopeClass = "envelope";
        displayLetter = false;
        break;
      case 1:
        letterClass = "letter-offScreen";
        envelopeClass = "envelope-enter";
        displayLetter = true;
        break;
      case 2:
        letterClass = "letter-enter";
        envelopeClass = "envelope-exit";
        displayLetter = true;
        setTimeout(this.props.actions.pageState, 1000);
      case 3:
        letterClass = "letter-enter";
        envelopeClass = "envelope-exit";
        displayLetter = true;
        break;
    }

    let clickHandler;
    console.log(this.props);
    if(this.props.disabled) {
      console.log('yes');
      clickHandler = this.letterClickHandler;
    } else {
      console.log('no');
      clickHandler = (event) => {
        console.log('you did it');
      };
    }
    console.log(clickHandler);

    if(this.props.pageState < 3) {
      return (

        <div className="envelope-page">
          <div id="top-half" />
          <div id="bottom-half" />
          <Letter 
            className={letterClass}
            displayLetter={displayLetter}
            clickHandler={this.letterClickHandler}
            question={this.props.question}
            answer={this.props.answer}
          />
          <EnvelopeContainer
            className={envelopeClass}
          />
        </div>

      );
    } else {
      return (
        <div className="envelope-page">
          <div id="top-half" />
          <div id="bottom-half" />
          <Letter 
            className={letterClass}
            displayLetter={displayLetter}
            inputChangeHandler={this.inputChangeHandler}
            clickHandler={clickHandler}
            question={this.props.question}
            answer={this.props.answer}
          />
        </div>
      );
    }
  }
}


function mapStateToProps(state) {
  return {
    pageState: state.letter.get('pageState'),
    answer: state.letter.getIn(['riddle', 'answer']),
    question: state.letter.getIn(['riddle', 'question']),
    disabled: state.letter.getIn(['riddle', 'disabled']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
