import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PostAuthRequestApiType } from '../../types';
import { usePostLoginMutation } from '../../api/authService/authServiceApi';
import { Input } from '../../ui';
import style from './Authorization.module.scss';
import classNames from 'classnames';

const authSchema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

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

    console.log(errors, 'errors');

    return (
        <>
            <Helmet>
                <title>About - yoursite.com</title>
                <meta name="description" content="Lorem ipsum dolor sit amet" />
            </Helmet>
            <Suspense fallback="...loading">
                <div className="flex min-h-[100vh]">
                    <div className="basis-6/12">слайд</div>
                    <div className="py-10 min-h-full basis-6/12 grow flex flex-col justify-between items-center px-4">
                        <header
                            className={classNames(
                                'flex justify-between max-w-[361px] w-full mb-[100px]',
                                style.header,
                            )}
                        >
                            <div className="max-w-[131px]">
                                <img
                                    src="/icons/brandlogo.svg"
                                    alt=""
                                    className="flex w-full"
                                />
                            </div>
                            <div>Переключение языка</div>
                        </header>
                        <main
                            className={classNames(
                                style.main,
                                'max-w-[361px] w-full',
                            )}
                        >
                            <h1 className="text-2xl font-bold mb-1">Войти</h1>
                            <span
                                className={classNames(
                                    'text-sm mb-6 block',
                                    style.subtitle,
                                )}
                            >
                                Войдите используя запись Active Directory
                            </span>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    placeholder="malika@nis.edu.kz"
                                    label="Введите логин"
                                    register={register}
                                    name="username"
                                    className="mb-4"
                                    error={errors.username?.message}
                                />
                                <Input
                                    label="Пароль"
                                    type="password"
                                    name="password"
                                    register={register}
                                    className="mb-3"
                                    error={errors.password?.message}
                                />
                                <button
                                    className={classNames(
                                        style.fogetPasword,
                                        'text-sm block ml-auto mb-6 ',
                                    )}
                                >
                                    Забыли пароль?
                                </button>
                                <button
                                    type="submit"
                                    className={classNames(
                                        'min-h-[52px] w-full rounded-xl text-[17px] font-medium duration-200 mb-[105px]',
                                        style.enter,
                                    )}
                                >
                                    Войти
                                </button>
                            </form>
                            <a
                                className={classNames(
                                    'min-h-[52px] w-full rounded-xl duration-200 mb-[42px] flex justify-center gap-x-2 items-center ',
                                    style.ad,
                                )}
                                href={`https://beyim.auth.eu-central-1.amazoncognito.com/oauth2/authorize?identity_provider=NIS-AD&redirect_uri=${process.env.REACT_APP_PUBLIC_MAIN}/authorization/&response_type=CODE&client_id=${process.env.REACT_APP_AD_CLIENT_ID}`}
                            >
                                <img src="/icons/microsoft.svg" />
                                <span className=' font-medium '>Войти через AD</span>
                            </a>
                        </main>
                        <footer className={style.footer}>
                            <span className="flex gap-x-1"><img src='/icons/nis.svg'/><span >© 2023 Beyim Tech</span></span>
                        </footer>
                    </div>
                </div>
            </Suspense>
        </>
    );
};

export default Authorization;
