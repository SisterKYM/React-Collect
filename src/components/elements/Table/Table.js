import {FaSort} from 'react-icons/fa';
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import TableCell from './TableCell';

class MemberTable extends React.PureComponent {
  renderCell = (cellItem, idx) => (
    <tr
      key={cellItem.id}
      className={cx('bb bl br b--gray-300', idx === 0 && 'bt')}
    >
      {cellItem.data.map((cellItemData, idx) => (
        <TableCell key={idx} leading={idx === 0} title={cellItemData.title} />
      ))}
    </tr>
  );

  renderHeaderCells = ({title, sortKey}, idx) => {
    const {sortConfig} = this.props;
    const userSorted = sortConfig && sortConfig.key === sortKey;
    const leading = idx === 0;

    const handleClickHeader = () => {
      if (sortKey) {
        this.props.onSort(sortKey);
      }
    };

    return (
      <th
        key={title}
        className={cx('pv1', leading && 'pl2', sortKey && 'pointer')}
        onClick={handleClickHeader}
      >
        <div className="table-header-cell-content flex items-center">
          {title}
          {userSorted ? (
            <>
              {' '}
              {sortConfig.direction === 'desc' ? (
                <IoMdArrowDropup size={13} />
              ) : (
                <IoMdArrowDropdown size={13} />
              )}
            </>
          ) : (
            sortKey && (
              <>
                {' '}
                <FaSort size={13} />
              </>
            )
          )}
        </div>
        <style jsx>{`
          .table-header-cell-content {
            min-height: 41px;
          }
        `}</style>
      </th>
    );
  };

  render() {
    return (
      <table className={cx('dt--fixed collapse f7', this.props.className)}>
        <thead className="white bg-gray-500">
          <tr className="ba b--gray-300">
            {this.props.headerCells.map(this.renderHeaderCells)}
          </tr>
        </thead>
        <tbody className="gray-400 bg-white">
          {this.props.cells.map(this.renderCell)}
        </tbody>
        <style jsx>{`
          tbody:before {
            content: "'-'";
            display: block;
            line-height: 1em;
            color: transparent;
          }
        `}</style>
      </table>
    );
  }
}

export default MemberTable;
