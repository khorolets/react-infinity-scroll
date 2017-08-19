# react-infinity-scroll

Small React component for implementing infinity scroll

## Demo

I've created a demo with `create-react-app` so you can see my component in action. The source can be found in `gh-pages` branch, don't judge me, please, I was in a hurry.

Demo: https://khorolets.github.io/react-infinity-scroll/

### Installation

```
$ npm install react-infinity-scroll --save
```

### Usage

```javascript
import React from 'react'

import Review from '../components/review_critics'
import InfinityScroll from 'react-infinity-scroll'

import { getCriticsReviews } from '../actions/media'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'reviews': [],
      'hasMore': false,
    }
  }

  componentWillMount() {
    getCriticsReviews(1)
      .then(
        (res) => {
          this.setState({
            reviews: res.data.results.map((review) => (<Review title={review.title} />))
        })
      }
    )
  }

  loadMore = (page, callback = undefined) => {
    getCriticsReviewsByCriticId(page).then((res) => {
      this.setState(
        {
          reviews: [
            ...this.state.reviews,
            res.data.results.map((review) => (<Review title={review.title} />))
          ],
          hasMore: (res.data.next)
        },
        () => {
          if (callback !== undefined) {
            callback()
          }
        }
      )
    })
  }

  render() {
    return (
        <InfinityScroll
            pageStart={1}
            bottomOffset={250}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            loader={<div className="loader">Loading ...</div>}
          >
            {this.state.reviews}
        </InfinityScroll>
    )
  }
}
```

### Using `InfinityScroll` inside other elements (e.g. modals)

If you need to use `InfinityScroll` in modal or other div which is scrollable you need to listen that scroll instead of default `window` one.

`InfinityScroll` won't add listeners to `window` if you provide `bottomOffsetValue` which is representing current distance to the bottom of the element.

So you need manually to:

1. Add listener to an element that has a scroll you're interested in.

```javascript
componentDidMount() {
  document.getElementsByClassName('vmodal-wrapper')[0]
    .addEventListener('scroll', this._calculateOffset)
}

componentWillUnmount() {
  document.getElementsByClassName('vmodal-wrapper')[0]
    .removeEventListener('scroll', this._calculateOffset)
}
```


2. Create a method that calculates current offset

```javascript
_calculateOffset = () => {
    const modalWrapper = document.getElementsByClassName('vmodal-wrapper')[0]
    const modalBody = document.getElementsByClassName('vmodal-body')[0]
    return this.setState(
      {
        bottomOffsetValue: modalBody.offsetHeight - modalWrapper.scrollTop,
      }
    )
  }
```

3. Pass that method to `InfinityScroll`

```javascript
<InfinityScroll
  pageStart={1}
  bottomOffset={1000}

  bottomOffsetValue={this.state.bottomOffsetValue}

  loadMore={this.props.loadMore}
  hasMore={this.props.hasMore}
  loader={<div className="text-center loader">Loading...</div>}
>
...
</InfinityScroll>
```

That's it.


### You may also be interested

* React 8 (infinity) https://www.npmjs.com/package/react-8
* react-infinity-scroller https://www.npmjs.com/package/react-infinity-scroller
