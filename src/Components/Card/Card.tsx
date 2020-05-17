import React from 'react';
import { ICard } from '../../cardModel';

export class Card extends React.PureComponent<ICard> {
    public render() {
        const { image, id } = this.props
        return (
            <img className="playing-card" key={id}
                style={{ width: "110px" }} alt="" src={image} />);
    }
}
