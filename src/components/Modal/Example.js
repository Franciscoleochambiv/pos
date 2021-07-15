import React, { Component } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from './Modal';


class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div className="App">
        <h1>Bootstrap Components</h1>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.toggle}
        >
          Modal
        </button>

        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            <h3>This is modal header</h3>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.toggle}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </ModalHeader>
          <ModalBody>
            <p>This is modal body</p>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.toggle}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.toggle}
            >
              Save changes
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Example;

