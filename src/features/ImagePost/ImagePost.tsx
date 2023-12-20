import { Post } from '../../types/GetContentsResponseApiType';

interface IImagePost {
    data: Post;
}

export const ImagePost: React.FC<IImagePost> = ({ data }) => {
    return (
        <article className="">
            <header className="flex gap-2">
                <img
                    src={data.iconUrl}
                    alt={data.objective}
                    className="w-10 h-10"
                />
                <div>
                    <h2 className="text-base">{data.subject}</h2>
                    <span className=" text-sm whitespace-nowrap text-ellipsis overflow-hidden block w-96">
                        {data.objective}
                    </span>
                </div>
                <div className=" ml-auto">
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
        </article>
    );
};
