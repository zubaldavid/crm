import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Pagination,
} from 'semantic-ui-react'

class PaginateTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      pageCount:null
    }
  }

  componentWillMount() {
    const startingPage = this.startingPage ? this.props.startingPage : 1;
    const data = this.props.data;
    const pageSize = this.props.pageSize;
    const pageCount = parseInt(data.length / pageSize);
    if (data.length % pageSize > 0) {
      pageCount++;
    }
    this.setState({
      currentPage:startingPage,
      pageCount: pageCount
    })
  }

  render () {
    const { data, pageSize, startingPage } = this.state;
    const totalPages = data / pageSize;
    return (
      <div>
        <Pagination
          boundaryRange={1}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={totalPages}
        />
      </div>
    )
  }
}

PaginateTables.propTypes = {
  data: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  startingPage: PropTypes.number,
}

export default PaginateTables;
