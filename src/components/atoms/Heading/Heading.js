// @flow
import React from "react";
import type { Node } from "react";

type Props = {
  children: Node,
  className: string,
  HeadingType?: string,
  inheritedStyles?: string
};

const Heading = ({
  children,
  className,
  HeadingType = "h1",
  inheritedStyles,
  ...others
}: Props): Node => (
  <HeadingType className={className} {...others}>
    {children}
  </HeadingType>
);

Heading.defaultProps = {
  inheritedStyles: "",
  HeadingType: "h1"
};

export default Heading;
