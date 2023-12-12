import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PostAuthRequestApiType } from '../../types';
import { usePostLoginMutation } from '../../api/authService/authServiceApi';

const authSchema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const Tittle: React.FC = () => {
    const { t } = useTranslation('translation');

    return (
        <h1 className="text-3xl font-bold underline">
            {t('authorization.title')}
        </h1>
    );
};

const Authorization: React.FC = () => {
    const [postLogin] = usePostLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostAuthRequestApiType>({
        resolver: yupResolver(authSchema),
    });

    const onSubmit = (data: PostAuthRequestApiType) => {
        postLogin(data);
    };

    return (
        <>
            <Helmet>
                <title>About - yoursite.com</title>
                <meta name="description" content="Lorem ipsum dolor sit amet" />
            </Helmet>
            <Suspense fallback="...loading">
                <div className=''>
                    <div>
                        слайд
                    </div>
                    <div>
                        <header>
                            <div>лого</div>
                            <div>Переключение языка</div>
                        </header>
                        <main>
                            <h1>Войти</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input {...register('username')} />
                                <input
                                    type="password"
                                    {...register('password')}
                                />
                                <button>Войти </button>
                            </form>

                            <a href={`https://beyim.auth.eu-central-1.amazoncognito.com/oauth2/authorize?identity_provider=NIS-AD&redirect_uri=${process.env.REACT_APP_PUBLIC_MAIN}/authorization/&response_type=CODE&client_id=${process.env.REACT_APP_AD_CLIENT_ID}`}>Войти через AD</a>
                            <p>Войдите используя запись Active Directory</p>
                        </main>
                        <footer>© 2023 Beyim Tech</footer>
                    </div>
                </div>
            </Suspense>
        </>
    );
};

export default Authorization;
