import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        // Initial data fetch when the component mounts
        this.onRequest();
    }

    onRequest = (offset) => {
        // Trigger loading state and fetch new characters
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        // Set newItemLoading flag to true during data loading
        this.setState(() => ({
            newItemLoading: true,
        }));
    };

    onCharListLoaded = (newCharList) => {
        // Update state by merging the new character list with the current list
        this.setState(({ offset, charList, newItemLoading }) => {
            let updatedCharList;

            if (newItemLoading) {
                // If the "load more" button is pressed, append the next 9 characters
                updatedCharList = [...charList, ...newCharList.slice(0, 9)];
            } else {
                // If it's the initial load, only show the first 9 characters
                updatedCharList = newCharList.slice(0, 9);
            }

            return {
                charList: updatedCharList,
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
            };
        });
    };


    onError = () => {
        // Error handling
        this.setState({
            error: true,
            loading: false,
        });
    };

    renderItems(arr) {
        // Render the list of characters
        const items = arr.map((item) => {
            let imgStyle = { objectFit: 'cover' };
            // Check for the default image
            if (
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'unset' };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        const { charList, loading, error, offset, newItemLoading } = this.state;
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? (
            // Render the content
            <div className="char__grid">{items}</div>
        ) : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
