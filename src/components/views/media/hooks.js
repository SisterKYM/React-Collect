import {useResource} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import HeaderResource from 'resources/HeaderResource';

const useAlbums = () => {
  const headers = useResource(HeaderResource.listShape(), {});

  const userAlbums = React.useMemo(
    () => [
      {
        id: 1,
        name: 'My Album',
        images: headers.filter(header => !header.partner),
      },
    ],
    [headers]
  );
  const partnerAlbums = React.useMemo(() => {
    const partnerHeaders = headers.filter(({partner}) => Boolean(partner));
    const partnerNames = _.uniq(
      partnerHeaders.map(header => header.partner.name)
    );

    return partnerNames.map((partnerName, idx) => ({
      id: userAlbums.length + idx + 1,
      name: partnerName,
      images: partnerHeaders.filter(
        ({partner}) => partner.name === partnerName
      ),
    }));
  }, [headers, userAlbums.length]);

  return {userAlbums, partnerAlbums};
};

export {useAlbums};
