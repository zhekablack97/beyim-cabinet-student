import style from './LexicalEditor.module.scss';
import { IContent, Mode } from 'beyim-docs/dist/src/interfaces';
import { Content } from '../../types/GetOneContentResponseApiType';
import { Suspense, lazy, useEffect, useState } from 'react';
import { BeyimDocs } from 'beyim-docs';
import 'beyim-docs/dist/style.css';

type Props = {
    fieldData?: string;
};

export const LexcialEditor = ({ fieldData }: Props) => {
    return (
        <div className={style.root}>
            <BeyimDocs
                useFunctions={[
                    'UNDO',
                    'REDO',
                    'BLOCK_TYPE',
                    'ALIGNS',
                    'COLOR_PICKER',
                    'COLOR_FILL',
                    'BEYIM_FORMULAS',
                    'BEYIM_GEOMETRY',
                    'IMAGE',
                    'VIDEO',
                    'TEXT_LINK',
                    'TABLE',
                    'CLEAR_FORMATTING',
                ]}
                floatingTextFormat={[
                    'COLOR_PICKER',
                    'COLOR_FILL',
                    'BOLD',
                    'ITALIC',
                    'UNDERLINE',
                    'STRIKETHROUGH',
                    'SUBSCRIPT',
                    'SUPERSCRIPT',
                    'LINK',
                    'CLEAR_FORMATTING',
                ]}
                mode="READ_SINGLE_FIELD"
                fieldData={fieldData}
            />
        </div>
    );
};
