interface IHeaderPost {
    iconUrl: string;
    objective: string;
    subject: string;
}

export const HeaderPost: React.FC<IHeaderPost> = ({
    iconUrl,
    objective,
    subject,
}) => {
    return (
        <header className="flex gap-2 mb-3">
            <img
                src={iconUrl}
                alt={objective}
                className="w-10 h-10  grow-0 shrink-0 rounded-full overflow-hidden"
            />
            <div className=" overflow-hidden">
                <h2 className="text-base leading-5">{subject}</h2>
                <span className=" text-sm whitespace-nowrap text-ellipsis overflow-hidden block w-96 max-w-full">
                    {objective}
                </span>
            </div>
            <div className=" ml-auto grow-0 shrink-0">
                <button>
                    <img
                        src="/icons/information.svg"
                        alt=""
                        className=" w-6 h-6 block"
                    />
                </button>
                <button>
                    <img
                        src="/icons/dots.svg"
                        alt=""
                        className=" w-6 h-6 block"
                    />
                </button>
            </div>
        </header>
    );
};
