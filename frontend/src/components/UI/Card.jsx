import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Card = ({ children, className, onClick, ...props }) => {
  return (
    <div
      className={classNames(
        "rounded-lg border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  className: "",
  onClick: null,
};

export default Card;
