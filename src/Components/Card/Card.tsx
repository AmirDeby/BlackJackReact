import React from 'react';
import { ICard } from '../../cardModel';

export interface ICardProps {
    card?: ICard
}

export default class Card extends React.PureComponent<ICardProps> {
    public render() {
        const { card } = this.props
        return (
            <div>
                <img src={card.image} />
            </div>
        );
    }
}
