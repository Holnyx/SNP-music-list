import React, { FC, memo } from 'react';

type ButtonItems = {
    getTitle: string
    href: string
    className: string
}

const ReturnButton: FC<ButtonItems> = ({getTitle, href, className}) => {
    return (
      <a href={href} className={className}>{getTitle}</a>
    );
};

export default memo(ReturnButton);