import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination,
} from 'semantic-ui-react'

class PaginateTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 1,
        };
    }

    handlePaginationChange = (e, {activePage}) => {
      this.setState({ activePage });
      this.props.handlePagination(activePage);
    }

    render() {
        const {activePage} = this.state;
        const style = {
          pag: {marginLeft: '4%'}
        }
        return (
          <Pagination
  
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            boundaryRange={1}
            defaultActivePage={1}
            ellipsisItem={true}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={this.props.totalPages}
          />
        );
    }
}

PaginateTables.propTypes = {
    totalPages: PropTypes.number.isRequired,
    handlePagination: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    totalPages: PropTypes.number,
}

export default PaginateTables;
