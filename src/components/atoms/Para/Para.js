// @flow
import React from "react";
import type { Node } from "react";

type Props = {
  children: Node,
  className?: string | void,
  inheritedStyles?: string
};

const Para = ({
  children,
  className,
  inheritedStyles,
  ...others
}: Props): Node => (
  <p className={className} {...others}>
    {children}
  </p>
);

Para.defaultProps = {
  inheritedStyles: "",
  className: ""
};

export default Para;
