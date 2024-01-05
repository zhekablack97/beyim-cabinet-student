import { useTranslation } from 'react-i18next';
import { Header } from '../../features/Header';

import style from '../feed/Feed.module.scss';
import styleSubject from '../../features/SubjectsFilter/SubjectsFilter.module.scss';
import styleOnboarding from './Onboarding.module.scss';
import classNames from 'classnames';
import More from '../feed/more';

import { useState } from 'react';
import { Button } from '../../features/SubjectsFilter/utils';
import { getTranslatedTooltipContent } from '../../features/OnboardingComponents/utils/TooltipData';
import { getData } from '../../features/OnboardingComponents/utils/data';
import TooltipOnBoarding from '../../features/OnboardingComponents/utils/TooltipOnboarding';
import { ImageOnboarding } from '../../features/OnboardingComponents/ImageOnboarding';
import { VideoOnboarding } from '../../features/OnboardingComponents/VideoOnboarding';
import { ActivityOnboarding } from '../../features/OnboardingComponents/ActivityOnboarding';

const Onboarding: React.FC = () => {
    const { t, i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const [withVideo, setWithVideo] = useState<boolean>(true);
    const [withPicture, setWithPicture] = useState<boolean>(true);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const data = getData();
    const tooltipData = getTranslatedTooltipContent({
        currentStep: 11,
        activeAssessment: '1',
        activeActivity: '1',
    });

    return (
        <div className={classNames(' min-h-screen', style.wrapper)}>
            <div className={styleOnboarding.overlay}></div>
            {tooltipData.map(item => {
                return (
                    <TooltipOnBoarding
                        key={item.id}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        id={item.id}
                        place={item.place}
                        content={item.content}
                        classTooltip={item.classNameTooltip}
                        classArrow={item.classArrow}
                    />
                );
            })}
            <Header />
            <main className="container  grid gap-4  grid-cols-12">
                <nav className=" col-span-2"></nav>
                <div className=" col-span-6 flex flex-col gap-4">
                    <div
                        data-tooltip-id="1"
                        className={classNames(
                            'pt-3 sticky top-[56px] z-10',
                            style.wrapperSubjectFilter,
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
                        <ImageOnboarding />
                        <VideoOnboarding />
                        <ActivityOnboarding />
                    </div>
                    <More />
                </div>
                <aside className=" col-span-4 pt-3 flex flex-col gap-4">
                    {/* <WithVideoOrImage   
                        handleChangeFilter={handleChangeFilter}
                        withPicture={withPicture}
                        withVideo={withVideo}
                    /> */}
                    {/* <SectionStatus /> */}
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
                            {t('onboarding:modal.fiveStages')}
                        </span>
                        <div
                            className={
                                styleOnboarding.modalOnBoarding__content__greetings
                            }
                        >
                            <h1> {t('onboarding:modal.greeting')}</h1>
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
                            {t('onboarding:modal.greetingText')}
                        </p>
                        <footer>
                            <button
                                className={
                                    styleOnboarding.modalOnBoarding__buttonSkip
                                }
                                onClick={() => {}}
                            >
                                {t('onboarding:modal.skip')}
                            </button>
                            <button
                                className={styleOnboarding.button_info}
                                onClick={() => {
                                    setIsOpen(false);
                                    setCurrentStep(1);
                                }}
                            >
                                <span>{t('onboarding:modal.come')}</span>
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
