import { Suspense, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PostAuthRequestApiType } from '../../types';
import { usePostLoginMutation } from '../../api/authService/authServiceApi';
import { Input } from '../../ui';
import style from './Authorization.module.scss';
import classNames from 'classnames';

// import required modules
import { Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { ChangingLanguage } from '../../features/ChangingLanguage';
import Cookies from 'js-cookie';
// Import Swiper styles

const authSchema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const Authorization: React.FC = () => {
    const [postLogin] = usePostLoginMutation();
    const { t, i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    useEffect(() => {
        if (locale !== 'kk' || locale !== 'ru' || locale !== 'en') {
            console.log('язык', locale);
            // i18n.changeLanguage('kk');
            const lngLocal = localStorage.getItem('i18next') as string;

            //@ts-ignore
            // if (lngLocal !== 'kk' || lngLocal !== 'ru' || lngLocal !== 'en') {
            //     i18n.changeLanguage('kk');
            // }
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<PostAuthRequestApiType>({
        resolver: yupResolver(authSchema),
    });

    const onSubmit = (data: PostAuthRequestApiType) => {
        postLogin(data)
            .unwrap()
            .then(data => {
                Cookies.set('access_token', data.data.tokenData.access_token, {
                    expires: 1,
                    secure: true,
                });
                console.log(data, 'data');
            })
            .catch(() => {
                setError('username', {
                    type: '400',
                    message: '',
                });
                setError('password', {
                    type: '400',
                    message: t('authorization.invalidLogin'),
                });
            });
    };

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"></span>';
        },
    };

    return (
        <>
            <Helmet>
                <title>Authorization</title>
                <meta name="description" content="Lorem ipsum dolor sit amet" />
            </Helmet>
            <Suspense fallback="...loading">
                <div className="flex min-h-screen autorization">
                    <div
                        className={classNames(
                            'basis-6/12 grow-0  max-w-[50%] min-h-full',
                            style.slideBlock,
                        )}
                    >
                        <Swiper
                            className={style.wrapperSlider}
                            slidesPerView={1}
                            pagination={pagination}
                            modules={[Pagination]}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper: any) => console.log(swiper)}
                        >
                            <SwiperSlide>
                                <div
                                    className={classNames(
                                        style.slide,
                                        style.slide1,
                                        ' flex items-center px-4',
                                    )}
                                >
                                    <div className="max-w-md mx-auto">
                                        <div className="max-w-[272px] mb-[103px]">
                                            <img
                                                className="block"
                                                src={`/images/imgPlatform1${locale}.png`}
                                            />
                                        </div>
                                        <span className="max-w-md text-[32px] leading-[normal] font-bold mb-2 block">
                                            {t('authorization.slide1.title')}
                                        </span>
                                        <p className="max-w-md text-base">
                                            {t('authorization.slide1.subTitle')}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div
                                    className={classNames(
                                        style.slide,
                                        style.slide2,
                                        ' flex items-center px-4',
                                    )}
                                >
                                    <div className="max-w-md mx-auto">
                                        <div className="max-w-[272px] mb-[103px]">
                                            <img
                                                src={`/images/sliderLogin2.png`}
                                            />
                                        </div>

                                        <span className="max-w-md text-[32px] leading-[normal] font-bold mb-2 block">
                                            {t('authorization.slide1.title')}
                                        </span>
                                        <p className="max-w-md text-base">
                                            {t('authorization.slide1.subTitle')}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div
                                    className={classNames(
                                        style.slide,
                                        style.slide3,
                                        ' flex items-center px-4',
                                    )}
                                >
                                    <div className="max-w-md mx-auto">
                                        <div className="w-full mb-[103px]">
                                            <img
                                                src={`/images/sliderLogin3${locale}.png`}
                                            />
                                        </div>
                                        <span className="max-w-md text-[32px] leading-[normal] font-bold mb-2 block">
                                            {t('authorization.slide1.title')}
                                        </span>
                                        <p className="max-w-md text-base">
                                            {t('authorization.slide1.subTitle')}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
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
                            <div>
                                <ChangingLanguage />
                            </div>
                        </header>
                        <main
                            className={classNames(
                                style.main,
                                'max-w-[361px] w-full',
                            )}
                        >
                            <h1 className="text-2xl font-bold mb-1">
                                {t('authorization.title')}
                            </h1>
                            <span
                                className={classNames(
                                    'text-sm mb-6 block',
                                    style.subtitle,
                                )}
                            >
                                {t('authorization.subTitle')}
                            </span>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    placeholder="malika@nis.edu.kz"
                                    label={t('authorization.username')}
                                    register={register}
                                    name="username"
                                    className="mb-4"
                                    error={errors.username?.message}
                                />
                                <Input
                                    label={t('authorization.password')}
                                    type="password"
                                    name="password"
                                    register={register}
                                    className="mb-3"
                                    placeholder={t(
                                        'authorization.placeholdePasword',
                                    )}
                                    error={errors.password?.message}
                                />
                                <button
                                    className={classNames(
                                        style.forgetPasword,
                                        'text-sm block ml-auto mb-6 ',
                                    )}
                                >
                                    {t('authorization.forgetPasword')}
                                </button>
                                <button
                                    type="submit"
                                    className={classNames(
                                        'min-h-[52px] w-full rounded-xl text-[17px] font-medium duration-200 mb-[105px]',
                                        style.enter,
                                    )}
                                >
                                    {t('authorization.enter')}
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
                                <span className=" font-medium ">
                                    {t('authorization.enterAD')}
                                </span>
                            </a>
                        </main>
                        <footer className={style.footer}>
                            <span className="flex gap-x-1">
                                <img src="/icons/nis.svg" />
                                <span>© 2023 Beyim Tech</span>
                            </span>
                        </footer>
                    </div>
                </div>
            </Suspense>
        </>
    );
};

export default Authorization;
