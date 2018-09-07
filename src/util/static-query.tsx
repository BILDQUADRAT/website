import { StaticQuery } from 'gatsby';
import React from 'react';

const withStaticQuery = <D, P extends object = {}>(query: any) =>
  (WrappedComponent: React.ComponentType<P & { data: D }>): React.SFC<P> => {
    const renderCallback = (props: P) => (data: D) => (
      <WrappedComponent {...props} data={data} />
    );
    return (props: P) => (
      <StaticQuery
        query={query}
        render={renderCallback(props)}
      />
    );
  };

export default withStaticQuery;
