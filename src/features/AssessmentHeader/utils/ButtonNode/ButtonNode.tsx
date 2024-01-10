import style from './ButtonNode.module.scss';
export const ButtonNode = () => {
    return (
        <button className={style.logo} onClick={() => {}}>
            <img src={'/icons/arrow-left.svg'} alt="Beyim logo" />
        </button>
    );
};
