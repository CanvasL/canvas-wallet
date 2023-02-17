import './index.scss';

interface IProps {
    text: string
}
const InputLabel = (props: IProps) => {
    const { text } = props;
    return (
        <div id='input-label'>
            {text}
        </div>
    )
}

export default InputLabel