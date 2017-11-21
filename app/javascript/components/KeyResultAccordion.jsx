import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';
import KeyResultAccordionItem from './KeyResultAccordionItem';

class KeyResultAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
  }

  handleClick(index) {
    const newIndex = this.state.activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex })
  }

  handleProgressChange(index, progressRate) {
    const totalProgressRate = this.getTotalProgressRate(this.props.keyResults, index, progressRate);
    this.props.onProgressChange(totalProgressRate);
  }

  updateProgress(index, progressRate) {
    const totalProgressRate = this.getTotalProgressRate(this.props.keyResults, index, progressRate);
    this.props.updateProgress(totalProgressRate);
  }

  getTotalProgressRate(keyResults, index, progressRate) {
    const totalProgressRate = keyResults.map((keyResult, i) =>
      i === index ? progressRate : keyResult.get('progressRate')
    ).reduce((sum, x) => sum + x) / keyResults.size;
    return Math.round(totalProgressRate);
  }

  render() {
    return (
      <Accordion className='key-result-accordion'>
        {this.props.keyResults.map((keyResult, index) => (
          <KeyResultAccordionItem key={index}
                                  keyResult={keyResult}
                                  updateKeyResult={this.props.updateKeyResult}
                                  index={index}
                                  active={this.state.activeIndex === index}
                                  updateProgress={this.updateProgress.bind(this)}
                                  onProgressChange={this.handleProgressChange.bind(this)}
                                  onClick={this.handleClick.bind(this)}/>
        ))}
      </Accordion>
    );
  }
}

KeyResultAccordion.propTypes = {
  keyResults: PropTypes.object,
  updateKeyResult: PropTypes.func
};

KeyResultAccordion.defaultProps = {
  keyResults: [],
  updateKeyResult: () => {}
};

export default KeyResultAccordion;
