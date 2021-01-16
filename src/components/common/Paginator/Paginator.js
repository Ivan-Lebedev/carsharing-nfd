import React from "react"
import "./Paginator.scss"
import ReactPaginate from "react-paginate"

const Paginator = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize) || 1
  return (
    <ReactPaginate
      pageCount={pageCount}
      initialPage={currentPage}
      onPageChange={onPageChange}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      previousLabel="<<"
      nextLabel=">>"
      breakLabel="..."
      breakClassName="paginator__item"
      breakLinkClassName="paginator__page-link"
      containerClassName="paginator"
      activeClassName="paginator__item--active"
      pageClassName="paginator__item"
      pageLinkClassName="paginator__page-link"
      previousClassName="paginator__item"
      previousLinkClassName="paginator__item"
      nextClassName="paginator__item"
      nextLinkClassName="paginator__item"
    />
  )
}

export default Paginator
