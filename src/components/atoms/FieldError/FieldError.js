// @flow
import React from 'react';
import type { Node } from 'react';
import Para from '../Para';
type Props = {
  className?: string | void,
  children: Node,
  dataSlnmId?: string,
  inheritedStyles?: string
};

const FieldError = ({ className, children, ...others }: Props): Node => (
  <Para className={className} aria-live="assertive" role="alert" {...others}>
    {children}
  </Para>
);

FieldError.defaultProps = {
  className: 'error'
};

export default FieldError;
