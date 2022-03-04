import {FaCaretLeft, FaCaretRight} from 'react-icons/fa';
import PropTypes from 'prop-types';
import React from 'react';
import ReactPaginate from 'react-paginate';
import cx from 'classnames';

const CONTROL_SIZE = 16;

const Paginator = ({
  marginPages = 2,
  onPageChange,
  page,
  perPage,
  total,
  pagesDisplayed = 5,
}) => {
  const linkClassName =
    'paginator flex justify-center items-center db tc b--gray-300 pointer';

  return (
    <div className="paginator-wrapper ba b--gray-300">
      <ReactPaginate
        disableInitialCallback
        activeClassName="active bg-light-aqua"
        breakClassName={cx(linkClassName, 'gray-600 cursor-default')}
        containerClassName="flex items-center"
        initialPage={page}
        marginPagesDisplayed={marginPages}
        nextLabel={<FaCaretRight size={CONTROL_SIZE} />}
        nextLinkClassName={cx(linkClassName, 'medium-grey bl navigate-button')}
        onPageChange={onPageChange}
        pageLinkClassName={cx(linkClassName, 'gray-600 text-14')}
        pageCount={perPage ? Math.ceil(total / perPage) : 1}
        pageRangeDisplayed={pagesDisplayed}
        previousLabel={<FaCaretLeft size={CONTROL_SIZE} />}
        previousLinkClassName={cx(
          linkClassName,
          'medium-grey br navigate-button'
        )}
      />
      <style jsx>{`
        .paginator-wrapper {
          padding: 3px;
          border-radius: 4px;
        }
        :global(.active) {
          border-radius: 4px;
        }
        :global(.paginator) {
          height: 32px;
          width: 32px;
          line-height: 32px;
          border-radius: 4px;
          outline: none;
        }
        :global(.navigate-button) {
          border-color: #eaedf3;
          border-width: 1px;
        }
      `}</style>
    </div>
  );
};

const EnhancedPaginator = Object.assign(React.memo(Paginator), {
  propTypes: {
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    marginPages: PropTypes.number,
    onPageChange: PropTypes.func,
    pagesDisplayed: PropTypes.number,
  },
});

export default EnhancedPaginator;
