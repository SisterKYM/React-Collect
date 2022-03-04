import {ReactReduxContext} from 'react-redux';
import {debounce} from 'lodash';
import React from 'react';

const AsyncConnect = React.memo(({children, depsMapper, ...props}) => {
  React.useEffect(
    debounce(() => {
      const state = props.store.getState();
      const deps =
        typeof depsMapper === 'function' ? depsMapper(props) : depsMapper;

      deps
        .filter(({key}) => !state.async.statuses[key])
        .forEach(({promise, payload}) => {
          props.store.dispatch(promise(payload));
        });
    }, 200),
    [depsMapper, props]
  );

  return children;
});

const asyncConnect = depsMapper => Component =>
  React.memo(props => (
    <ReactReduxContext.Consumer>
      {({store}) => (
        <AsyncConnect {...props} store={store} depsMapper={depsMapper}>
          <Component {...props} />
        </AsyncConnect>
      )}
    </ReactReduxContext.Consumer>
  ));

export default asyncConnect;
