import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MdClose} from 'react-icons/md';
import {useFetcher, useResource} from 'rest-hooks';

import {
  Modal,
  ModalCloseButton,
  Input,
  CommonButton,
  DropdownSelect,
} from 'elements';
import {apiClient} from 'helpers';

import {ReactComponent as Search} from 'theme/images/Search.svg';
import CollectionResource from 'resources/CollectionResource';

const openPageInNewTab = (pageUrl) => {
  const reportWindow = window.open(pageUrl, 'blank');

  reportWindow.focus();
};

const inputStyle = {
  paddingRight: '2.5rem',
  paddingLeft: '1rem',
};
const dropdownStyle = {
  paddingTop: '9px',
  paddingBottom: '9px',
};
const dropdownProps = {
  width: 'auto',
  left: '-16px',
  right: '-16px',
  bodyClassName: 'br2',
};

const GenerateReportModal = ({onDismiss, isMobile}) => {
  const closeModal = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  const collections = useResource(CollectionResource.listShape(), {});

  const [input, setInput] = useState('');
  const [inputDropdownVisible, setInputDropdownVisible] = useState(false);

  const search = useCallback(
    (input) => {
      setFilteredCollections(
        collections.filter((collection) =>
          collection.name.toLowerCase().includes(input.toLowerCase())
        )
      );
    },
    [collections]
  );

  const onInputChange = useCallback(
    (e) => {
      const updatedInput = e.target.value;
      if (input !== updatedInput) {
        setInput(updatedInput);
        setInputDropdownVisible(true);
        if (updatedInput.length > 1) {
          search(updatedInput);
        }
      }
    },
    [input, search]
  );

  const [filteredCollections, setFilteredCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const clearInput = useCallback(() => {
    setInput('');
    setSelectedCollection(null);
  }, []);

  const fetchCollection = useFetcher(CollectionResource.detailShape());

  const selectCollection = useCallback(
    async (e) => {
      const collection = await fetchCollection(
        {
          id: e.target.dataset.id,
        },
        {}
      );
      setSelectedCollection(collection);
      setInput(collection.name);
      setInputDropdownVisible(false);
    },
    [fetchCollection]
  );

  const [reportType, setReportType] = useState(null);
  const reportTypeDescriptions = useMemo(() => {
    const availability = selectedCollection?.reportsAvailable;
    const map = {};
    if (availability?.payerIdentify) {
      map.visitor = 'Visitors Summary (xlsx)';
    }
    if (availability?.formsCount > 0) {
      map.form = 'Forms Summary (pdf)';
    }
    if (availability?.itemsCount > 0) {
      map.item = 'Items Summary (xlsx)';
    }
    if (availability?.paymentCount > 0) {
      map.collection = 'Collection Summary (xlsx)';
      map.order = 'Order Summary (pdf)';
    }

    return map;
  }, [selectedCollection]);
  const reportTypes = useMemo(() => {
    const types = [];
    if (reportTypeDescriptions.collection) {
      types.push({
        title: reportTypeDescriptions.collection,
        onClick: () => setReportType('collection'),
        className: 'text-14',
      });
    }
    if (reportTypeDescriptions.order) {
      types.push({
        title: reportTypeDescriptions.order,
        onClick: () => setReportType('order'),
        className: 'text-14',
      });
    }
    if (reportTypeDescriptions.item) {
      types.push({
        title: reportTypeDescriptions.item,
        onClick: () => setReportType('item'),
        className: 'text-14',
      });
    }
    if (reportTypeDescriptions.form) {
      types.push({
        title: reportTypeDescriptions.form,
        onClick: () => setReportType('form'),
        className: 'text-14',
      });
    }
    if (reportTypeDescriptions.visitor) {
      types.push({
        title: reportTypeDescriptions.visitor,
        onClick: () => setReportType('visitor'),
        className: 'text-14',
      });
    }
    return types;
  }, [reportTypeDescriptions]);

  const [fakeMeta, setFakeMeta] = useState({});

  const onInputBlur = useCallback(() => {
    if (!input) {
      setFakeMeta({
        touched: true,
        warning: 'Required',
      });
    }
  }, [input]);

  const [downloadReportCommand, setDownloadReportCommand] = useState(false);

  const downloadReport = useCallback(() => {
    setDownloadReportCommand(true);
  }, []);

  useEffect(() => {
    if (downloadReportCommand) {
      if (selectedCollection && reportType) {
        const downloadApiFile = async (url, fileName) => {
          await apiClient.fetchAndSave({url, fileName});
        };
        switch (reportType) {
          case 'collection':
            downloadApiFile(
              `users/tabs/${selectedCollection.id}/exports/payments.xlsx`,
              `${selectedCollection.name}-payments.xlsx`
            ).catch((e) => {
              console.log(e);
            });
            break;
          case 'order':
            openPageInNewTab(
              `${window.location.protocol}//${window.location.hostname}${
                window.location.port ? `:${window.location.port}` : ''
              }/collection/${selectedCollection.organizer.id}/${
                selectedCollection.id
              }/orders-report`
            );
            break;
          case 'item':
            downloadApiFile(
              `users/tabs/${selectedCollection.id}/exports/items.xlsx`,
              `${selectedCollection.name}-items.xlsx`
            ).catch((e) => {
              console.log(e);
            });
            break;
          case 'form':
            openPageInNewTab(
              `${window.location.protocol}//${window.location.hostname}${
                window.location.port ? `:${window.location.port}` : ''
              }/collection/${selectedCollection.organizer.id}/${
                selectedCollection.id
              }/forms-report`
            );
            break;
          case 'visitor':
            downloadApiFile(
              `users/tabs/${selectedCollection.id}/exports/visitors.xlsx`,
              `${selectedCollection.name}-visitors.xlsx`
            ).catch((e) => {
              console.log(e);
            });
            break;
          default:
            break;
        }
      } else {
        onInputBlur();
      }
      setDownloadReportCommand(false);
    }
  }, [downloadReportCommand, onInputBlur, reportType, selectedCollection]);

  useEffect(() => {
    if (input && fakeMeta.warning) {
      setFakeMeta({});
    }
  }, [fakeMeta.warning, input]);

  const title = reportTypeDescriptions[reportType] || 'Select a Report Type';

  return (
    <Modal
      size="SMALL"
      flexibleHeight={!isMobile}
      id={isMobile && 'CollectionsReportModal'}
      onDismiss={closeModal}
      className="dark-grey overflow-y-visible"
    >
      <div
        style={{
          padding: '2.25rem',
        }}
      >
        {isMobile && (
          <div className="mb4">
            <h2 className="avenir-roman text-18 gray-700">Generate a Report</h2>
            <ModalCloseButton
              className="pointer top-1"
              size={20}
              onClick={closeModal}
              color="medium-grey"
            />
          </div>
        )}
        <div className="relative">
          <Input
            border
            meta={fakeMeta}
            onBlur={onInputBlur}
            onChange={onInputChange}
            placeholder="Find a collection"
            style={inputStyle}
            value={input}
          />
          {!fakeMeta.warning && (
            <div className="magnifier medium-grey">
              {input ? (
                <MdClose className="pointer" size={24} onClick={clearInput} />
              ) : (
                <Search />
              )}
            </div>
          )}
          {input &&
            input.length > 1 &&
            inputDropdownVisible &&
            filteredCollections.length > 0 && (
              <div className="collections br2 avenir-roman absolute ba b--gray bg-white">
                {filteredCollections.map((collection) => (
                  <div
                    className="collection-item text-14 dark-grey pointer"
                    key={collection.id}
                    data-id={collection.id}
                    onClick={selectCollection}
                  >
                    {collection.name}
                  </div>
                ))}
              </div>
            )}
        </div>

        <div className="mt3 relative">
          <DropdownSelect
            className="bg-white ba b--gray-300"
            backgroundColor="white"
            options={reportTypes}
            title={title}
            style={dropdownStyle}
            rightArrow
            titleClassName="text-14 ml-auto"
            dropdownProps={dropdownProps}
            onClick={onInputBlur}
          />
        </div>
        <div className="flex mt4 items-center">
          <CommonButton
            className="bg-tint white pt-14 mv2 mv0-ns"
            onClick={downloadReport}
          >
            Download Report
          </CommonButton>
          <CommonButton
            className="bg-gray-250 gray-600 pt-14 ml3 mv2 mv0-ns"
            onClick={closeModal}
          >
            Cancel
          </CommonButton>
        </div>
      </div>
      <style jsx>{`
        .magnifier {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          top: 0;
          right: 0;
        }
        .collections {
          z-index: 1;
          box-shadow: 0px 3px 6px #00000029;
          left: 0;
          right: 0;
          height: 9rem;
          overflow-y: auto;
        }
        .collection-item:hover {
          background-color: #d7eef1;
        }
        .collection-item {
          display: block;
          padding: 10px 2.25rem;
          margin-bottom: 0.375rem;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedGenerateReportModal = React.memo(GenerateReportModal);

export default EnhancedGenerateReportModal;
