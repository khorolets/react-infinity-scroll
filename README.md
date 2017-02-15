# react-infinity-scroll

Small React component for implementing infinity scroll
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

  loadMore = (page) => {
    getCriticsReviewsByCriticId(page).then((res) => {
      this.setState(
        {
          reviews: this.state.reviews.concat(res.data.results.map((review) => (<Review title={review.title} />))),
          hasMore: (res.data.next)
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


### You may also be interested

* React 8 (infinity) https://www.npmjs.com/package/react-8
* react-infinity-scroller https://www.npmjs.com/package/react-infinity-scroller
