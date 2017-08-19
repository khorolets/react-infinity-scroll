import React from 'react'
import PropTypes from 'prop-types'


const defaultBottomOffset = 0

export default class extends React.Component {
  /*
  This is the component for infnity scroll.
  */
  static propTypes = {
    pageStart: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loader: PropTypes.element,
    bottomOffset: PropTypes.number,
    bottomOffsetValue: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      'page': this.props.pageStart,
      'loader': this.props.loader,
      'bottomOffset': this.props.bottomOffset ? this.props.bottomOffset : defaultBottomOffset,
      'blocking': false,
    }
  }

  componentDidMount() {
    if (!('bottomOffsetValue' in this.props)) {
      window.addEventListener('scroll', this.handleWindowScroll);
    }
  }

  componentWillUnmount() {
    if (!('bottomOffsetValue' in this.props)) {
      window.removeEventListener('scroll', this.handleWindowScroll);
    }
  }

  componentWillUpdate(nextProps) {
    if ('bottomOffsetValue' in nextProps) {
      if (nextProps.bottomOffsetValue !== this.props.bottomOffsetValue) {
        this.handleOffset(nextProps.bottomOffsetValue)
      }
    }
  }

  handleWindowScroll = (e) => {
    if (
        window.pageYOffset + window.innerHeight >= document.body.offsetHeight - this.state.bottomOffset
        && this.props.hasMore
        && !this.state.blocking
      ) {
      this._performFetch()
    }
  }

  handleOffset = (bottomOffsetValue) => {
    if (this.state.bottomOffset >= bottomOffsetValue
        && this.props.hasMore
        && !this.state.blocking
      ) {
      this._performFetch()
    }
  }

  _performFetch = () => {
      this.setState({ blocking: true })
      this.setState({ page: this.state.page + 1 })
      this.setState({ page: this.state.page + 1 }, () => {
        this.props.loadMore(
          this.state.page,
          () => { this.setState({ blocking: false }) }
        )
      })
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.state.blocking ? this.props.loader : ''}
      </div>
    )
  }
}
