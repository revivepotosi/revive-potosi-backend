import { ContentType } from 'src/content-type/interfaces/ContentType.interface';
import { Day } from 'src/day/interfaces/Day.interface';
import { Role } from 'src/role/interfaces/Role.interface';

export const DAYS: Day[] = [
    {
        position: 1,
        name: {
            ES: 'Lunes',
            EN: 'Monday',
        },
    },
    {
        position: 2,
        name: {
            ES: 'Martes',
            EN: 'Tuesday',
        },
    },
    {
        position: 3,
        name: {
            ES: 'Miércoles',
            EN: 'Wednesday',
        },
    },
    {
        position: 4,
        name: {
            ES: 'Jueves',
            EN: 'Thursday',
        },
    },
    {
        position: 5,
        name: {
            ES: 'Viernes',
            EN: 'Friday',
        },
    },
    {
        position: 6,
        name: {
            ES: 'Sábado',
            EN: 'Saturday',
        },
    },
    {
        position: 7,
        name: {
            ES: 'Domingo',
            EN: 'Sunday',
        },
    },
    {
        position: 8,
        name: {
            ES: 'Festivo',
            EN: 'Holiday',
        },
    },
];

export const CONTENT_TYPES: ContentType[] = [
    {
        type: 'title',
    },
    {
        type: 'text',
    },
    {
        type: 'image',
    },
    {
        type: 'video',
    },
    {
        type: 'imageCarrousel',
    },
];

export const ROLES: Role[] = [
    {
        name: 'admin',
    },
];
