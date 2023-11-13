import { LanguageString } from 'src/common/interfaces/Language.interface';

export interface Day {
    _id?: string;
    position: number;
    name: LanguageString;
}
