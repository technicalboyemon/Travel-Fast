import React from "react";
import ReactPaginate from "react-paginate";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";



const PaginatePage = ({ pageCount, changePage }) => {
  return (
    <div className="d-flex justify-content-center p-4 mt-5 ">
      <ReactPaginate
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        previousLabel={<BiCaretLeft />}
        nextLabel={<BiCaretRight />}
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={3}
        onPageChange={changePage}
        // subContainerClassName="pages pagination"
        disableInitialCallback={true}
      />
    </div>
  );
};

export default PaginatePage;
