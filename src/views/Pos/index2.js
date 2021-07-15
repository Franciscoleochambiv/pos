import React, {Component} from 'react'
import {render} from 'react-dom'
import glamorous, {Div} from 'glamorous'
import {css} from 'glamor'
import matchSorter from 'match-sorter'
import starWarsNames from 'starwars-names'
import Downshift from 'downshift'
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
} from './components'

function ExampleDownshift({itemToString, items, ...rest}) {
  return (
    <Downshift itemToString={itemToString} {...rest}>
      {({
        getLabelProps,
        getInputProps,
        getButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => (
        <div className={css({width: 250, margin: 'auto'})}>
          <Label {...getLabelProps()}>Find a Star Wars character</Label>
          <Div position="relative">
            <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Enter a name',
              })}
            />
            {selectedItem ? (
              <ControllerButton
                onClick={clearSelection}
                aria-label="clear selection"
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </Div>
          {!isOpen ? null : (
            <Menu>
              {items.map((item, index) => (
                <Item
                  key={item.id}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                >
                  {itemToString(item)}
                </Item>
              ))}
            </Menu>
          )}
        </div>
      )}
    </Downshift>
  )
}

class App extends React.Component {
  allItems = starWarsNames.all.map(s => ({name: s, id: s.toLowerCase()}))
  state = {items: this.allItems}
  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({items: this.getItems(changes.inputValue)})
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to controll some of the internal state yourself
  }
  handleChange = (selectedItem, downshiftState) => {
    this.setState({items: this.allItems})
    // handle the new selectedItem here
  }
  getItems = value => {
    return value
      ? matchSorter(this.allItems, value, {
          keys: ['name'],
        })
      : this.allItems
  }
  itemToString(i) {
    return i ? i.name : ''
  }
  render() {
    return (
      <Div
        css={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <h2>match-sorter example</h2>
        <ExampleDownshift
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          items={this.state.items}
          itemToString={this.itemToString}
        />
      </Div>
    )
  }
}

render(<App />, document.getElementById('root'))
