import axios from 'axios';
import fs from 'fs';
import * as apitypes from './apitypes';
import { Dict } from './types';

export const credentials: {
    id: string,
    secret: string,
    auth?: apitypes.OAuth,
    key: string,
} = {
    id: '',
    secret: '',
    key: '',
};

export enum Ruleset {
    osu = 0,
    taiko = 1,
    fruits = 2,
    mania = 3
}

export const baseUrl = {
    v1: 'https://osu.ppy.sh/api',
    v2: 'https://osu.ppy.sh/api/v2'
};

export * as requests from './requests';