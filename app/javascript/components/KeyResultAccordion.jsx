import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';
import KeyResultAccordionItem from './KeyResultAccordionItem';

class KeyResultAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
  }

  handleClick(e, titleProps) {
    const index = titleProps.index;
    const newIndex = this.state.activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex })
  }

  render() {
    return (
      <Accordion className='key-result-accordion'>
        {this.props.keyResults.map((keyResult, index) => {
          return <KeyResultAccordionItem key={index} keyResult={keyResult} updateKeyResult={this.props.updateKeyResult}
                                         index={index} active={this.state.activeIndex === index}
                                         onClick={this.handleClick.bind(this)}/>;
        })}
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
