// Your translation file

import { useTranslation } from 'react-i18next';

export const getData = () => {
    const { t } = useTranslation();
    const data = {
        options: [
            t('onboarding.post.option1'),
            t('onboarding.post.option2'),
            t('onboarding.post.option3'),
            t('onboarding.post.option4'),
        ],
        post: {
            microtopic: 1,
            subject: 1,
        },
        subjects: [
            {
                url: 'https://d2uomx2yoyattw.cloudfront.net/1--97944bef-fb50-456b-b802-abfddebcd1dc.png',
                name: t('onboarding.subjects.physics'),
                objective: t('onboarding.objective'),
            },
            {
                url: 'https://d2uomx2yoyattw.cloudfront.net/1--b879517f-5738-4219-8cb4-b0b29c9b61b6.png',
                name: t('onboarding.subjects.chemistry'),
                objective: t('onboarding.objective'),
            },
            {
                url: 'https://d2uomx2yoyattw.cloudfront.net/1--271d8574-fb14-4a32-b154-9098c05d360f.png',
                name: t('onboarding.subjects.biology'),
                objective: t('onboarding.objective'),
            },
        ],
        star: [
            '/icons/solar_star-bold-gray.svg',
            '/icons/solar_star-bold-gray.svg',
            '/icons/solar_star-bold-gray.svg',
            '/icons/solar_star-bold-gray.svg',
            '/icons/lightning.svg',
        ],
        starActive: [
            '/icons/solar_star-bold.svg',
            '/icons/solar_star-bold-gray.svg',
            '/icons/solar_star-bold-gray.svg',
        ],
        progress: [
            t('onboarding.progress.first'),
            t('onboarding.progress.second'),
            t('onboarding.progress.third'),
        ],
        allStar: [
            '/icons/lightningActive.svg',
            '/icons/lightningActive.svg',
            '/icons/lightningActive.svg',
        ],
    };
    return data;
};
