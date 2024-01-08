import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Button } from '../../features/SubjectsFilter/utils';
import { getData } from '../../features/OnboardingComponents/utils/data';
import { ImageOnboarding } from '../../features/OnboardingComponents/ImageOnboarding';
import { VideoOnboarding } from '../../features/OnboardingComponents/VideoOnboarding';
import { ActivityOnboarding } from '../../features/OnboardingComponents/ActivityOnboarding';
import { Header } from '../../features/Header';
import { TooltipOnBoarding } from '../../features/OnboardingComponents/TooltipOnboarding';
import { getTranslatedTooltipContent } from '../../features/OnboardingComponents/TooltipData';

import style from '../feed/Feed.module.scss';
import styleSubject from '../../features/SubjectsFilter/SubjectsFilter.module.scss';
import styleOnboarding from './Onboarding.module.scss';
import styleShowVideo from '../../features/WithVideoOrImage/WithVideoOrImage.module.scss';
import styleStatus from '../../features/SectionStatus/SectionStatus.module.scss';

const Onboarding: React.FC = () => {
    const { t, i18n } = useTranslation();

    const [withVideo, setWithVideo] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [activeActivity, setActiveActivity] = useState('10');
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const data = getData();
    const tooltipData = getTranslatedTooltipContent({
        currentStep: currentStep,
        activeAssessment: '1',
        activeActivity,
    });
    useEffect(() => {
        if (withVideo) {
            const element = document.getElementById(`step-1`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    }, [withVideo]);
    useEffect(() => {
        if (currentStep === 4) {
            setTimeout(() => {
                setWithVideo(true);
            }, 400);
        } else {
            setWithVideo(false);
        }
    }, [currentStep]);

    useEffect(() => {
        if (withVideo) {
            const element = document.getElementById(`step-1`);
            if (element) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    }, [withVideo]);

    return (
        <div className={classNames('min-h-screen', style.wrapper)}>
            <div className={styleOnboarding.overlay}></div>
            {tooltipData.slice(0, 14).map(item => {
                return (
                    <div
                        key={item.id}
                        className={`${
                            currentStep === +item.id ? 'block' : 'hidden'
                        }`}
                    >
                        <TooltipOnBoarding
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            id={item.id}
                            place={item.place}
                            content={item.content}
                            classTooltip={item.classNameTooltip}
                            classArrow={item.classArrow}
                            offset={item.offset}
                        />
                    </div>
                );
            })}
            <Header />
            <main className="container  grid gap-4  grid-cols-12">
                <nav className=" col-span-2"></nav>
                <div className=" col-span-6 flex flex-col gap-4">
                    <div
                        id="step-1"
                        data-tooltip-id="1"
                        className={classNames(
                            'sticky top-[68px] z-10 mb-4',
                            currentStep === 1 && 'z-210',
                        )}
                    >
                        <div
                            className={classNames(
                                styleSubject.wrapper,
                                'overflow-hidden rounded-2xl h-24  shadow-xl',
                            )}
                        >
                            <div className="flex px-2">
                                <Button
                                    imgSrc="/icons/allFeed.svg"
                                    name={t('feed.allFeed')}
                                />
                                {data?.subjects.map((item, index) => {
                                    return (
                                        <Button
                                            key={item.name}
                                            imgSrc={item.url}
                                            isActive={index === 0}
                                            name={item.name}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {!withVideo && (
                            <ImageOnboarding currentStep={currentStep} />
                        )}
                        <VideoOnboarding currentStep={currentStep} />
                        <ActivityOnboarding
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            activeActivity={activeActivity}
                            setActiveActivity={setActiveActivity}
                        />
                    </div>
                </div>
                <aside className=" col-span-4 pt-3 flex flex-col gap-5">
                    <div
                        className={classNames(
                            styleShowVideo.wrapper,
                            ' rounded-xl sticky top-[68px] px-4 py-3 flex flex-col gap-3',
                            currentStep === 4 && 'z-210',
                        )}
                    >
                        <div className="w-full" data-tooltip-id="4">
                            <input
                                className="hidden"
                                type="checkbox"
                                checked={withVideo}
                                name=""
                                id="videoFilterFeed"
                            />
                            <label
                                htmlFor="videoFilterFeed"
                                className="flex items-center "
                            >
                                <img
                                    src="/icons/videoFilter.svg"
                                    alt=""
                                    className="w-6 h-6 block mr-2"
                                />
                                <span className="text-sm font-semibold cursor-pointer">
                                    {t('feed.video')}
                                </span>
                                <span
                                    className={classNames(
                                        ' ml-auto w-11 h-6 rounded-3xl flex items-center p-1 duration-200',
                                        styleShowVideo.checked,
                                    )}
                                />
                            </label>
                        </div>
                        <hr
                            className={classNames('h-[1px]', styleShowVideo.hr)}
                        />
                        <div className="">
                            <input
                                className="hidden"
                                type="checkbox"
                                name=""
                                id="pictureFilterFeed"
                            />
                            <label
                                className="flex items-center "
                                htmlFor="pictureFilterFeed"
                            >
                                <img
                                    src="/icons/imageFilter.svg"
                                    alt=""
                                    className="w-5 h-5 block mr-3"
                                />
                                <span className="text-sm font-semibold cursor-pointer">
                                    {t('feed.picture')}
                                </span>
                                <span
                                    className={classNames(
                                        'ml-auto w-11 h-6 rounded-3xl flex items-center p-1 duration-200',
                                        styleShowVideo.checked,
                                    )}
                                />
                            </label>
                        </div>
                    </div>
                    <div
                        className={classNames(
                            'p-4 rounded-2xl sticky top-[181px]',
                            styleStatus.wrapper,
                            currentStep === 2 ||
                                currentStep === 3 ||
                                currentStep === 14 ||
                                currentStep === 15
                                ? 'z-210'
                                : '',
                        )}
                        data-tooltip-id="3"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h2
                                    className={classNames(
                                        styleStatus.section,
                                        'text-sm font-medium',
                                    )}
                                    data-tooltip-id="14"
                                >
                                    Раздел
                                </h2>

                                {data.progress.map((item, index) => {
                                    return (
                                        <h3
                                            key={item}
                                            className={classNames(
                                                styleStatus.nameSection,
                                                'mb-3',
                                                'font-semibold',
                                            )}
                                        >
                                            {item}
                                        </h3>
                                    );
                                })}
                            </div>
                            <div className="flex grow-0 shrink-0 gap-2">
                                <button
                                    type="button"
                                    className={classNames(
                                        'border-2 w-8 h-8 flex items-center justify-center rounded-[10.7px]',
                                        styleStatus.borderButton,
                                    )}
                                >
                                    <img
                                        src="/icons/buttonNext.svg"
                                        className="rotate-180 block"
                                        alt=""
                                    />
                                </button>
                                <button
                                    className={classNames(
                                        'border-2 w-8 h-8 flex items-center justify-center rounded-[10.7px]',
                                        styleStatus.borderButton,
                                    )}
                                >
                                    <img
                                        src="/icons/buttonNext.svg"
                                        className=" block"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">fewfw</div>
                    </div>
                </aside>
            </main>
            {isOpen && (
                <div className={styleOnboarding.modalOnBoarding}>
                    <div className={styleOnboarding.modalOnBoarding__content}>
                        <span
                            className={
                                styleOnboarding.modalOnBoarding__content__stages
                            }
                        >
                            {t('onboarding.modal.fiveStages')}
                        </span>
                        <div
                            className={
                                styleOnboarding.modalOnBoarding__content__greetings
                            }
                        >
                            <h1> {t('onboarding.modal.greeting')}</h1>
                            <img
                                src={'/images/Party.png'}
                                alt="party"
                                width={32}
                                height={32}
                            />
                        </div>
                        <p
                            className={
                                styleOnboarding.modalOnBoarding__content__description
                            }
                        >
                            {t('onboarding.modal.greetingText')}
                        </p>
                        <footer>
                            <button
                                className={
                                    styleOnboarding.modalOnBoarding__buttonSkip
                                }
                                onClick={() => {}}
                            >
                                {t('onboarding.modal.skip')}
                            </button>
                            <button
                                className={styleOnboarding.button_info}
                                onClick={() => {
                                    setIsOpen(false);
                                    setCurrentStep(1);
                                }}
                            >
                                <span>{t('onboarding.modal.come')}</span>
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
