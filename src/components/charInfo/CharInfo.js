import './charInfo.scss';
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";
import thor from '../../resources/img/thor.jpeg';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";

class CharInfo extends Component{
    state = {
        char: null,
        loading:false,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.charId !== prevProps.charId){
            this.updateChar();
        }

    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId){
            return;
        }

        this.onCharLoading()

        this.marvelService.getChacracter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    onCharLoading = () => {
        this.setState({
            loading:true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading:false})
    }

    onError = () => {
        this.setState({
            loading:false,
            error: true
        })
    }
    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}

        </div>
    )
}
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    let imageStyle = {};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imageStyle={objectFit: 'contain'}
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imageStyle} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.slice(0, 9).map((item, i) => (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                ))}
                {comics.length === 0 ? (
                    <li className="char__comics-item">
                        Add more...
                    </li>
                ) : null}
            </ul></>
    )

}

export default CharInfo;