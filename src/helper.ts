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

export function oAuth(): apitypes.OAuth {
    const str = fs.readFileSync(`./config/osuauth.json`, 'utf-8');
    credentials.auth = JSON.parse(str) as apitypes.OAuth;
    return credentials.auth;
}

export const baseUrl = {
    v1: 'https://osu.ppy.sh/api',
    v2: 'https://osu.ppy.sh/api/v2'
};

export async function PostOAuth() {
    return new Promise(async (resolve, reject) => {
        const newtoken: apitypes.OAuth = (await axios.post('https://osu.ppy.sh/oauth/token',
            `grant_type=client_credentials&client_id=${credentials.id}&client_secret=${credentials.secret}&scope=public`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            },
        ).catch(err => {
            reject(err);
            return {
                failed: true,
                data: {
                    err,
                }
            };
        })).data;
        if (newtoken?.access_token) {
            fs.writeFileSync(`./config/osuauth.json`, JSON.stringify(newtoken));
            credentials.auth = newtoken;
        }
        resolve(true);
    });
}

export async function get(url: string, params: Dict, tries: number = 0) {
    if (tries > 3) {
        throw new Error('Exceeded try count. Please ensure credentials are valid');
    }
    let inp = new URL(url);
    for (const key in params) {
        if (Array.isArray(params[key])) {
            const _temp: any[] = params[key];
            for (const elem of _temp) {
                inp.searchParams.append(key + '[]', elem);
            }
        } else {
            inp.searchParams.append(key, params[key]);
        }
    }
    if (!credentials.auth) {
        try {
            oAuth();
        } catch (error) {
            await PostOAuth();
        }
    }
    const data = (await axios.get(url, {
        headers: {
            Authorization: `Bearer ${credentials?.auth?.access_token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-version": "20220705"
        },
    }).catch(err => {
        if (err?.response?.data?.authentication == 'basic') {
            return {
                data: {
                    authentication: "basic"
                }
            };
        } else {
            return {
                data: { error: null, }
            };
        }
    })).data;
    if (data?.authentication) {
        await PostOAuth();
        return get(url, params, tries + 1);
    }
    return data;
}

export async function post(url: string, params: Dict, body: Dict, tries: number = 0) {
    if (tries > 3) {
        throw new Error('Exceeded try count. Please ensure credentials are valid');
    }
    let inp = new URL(url);
    for (const key in params) {
        if (Array.isArray(params[key])) {
            const _temp: any[] = params[key];
            for (const elem of _temp) {
                inp.searchParams.append(key + '[]', elem);
            }
        } else {
            inp.searchParams.append(key, params[key]);
        }
    }
    if (!credentials.auth) {
        try {
            oAuth();
        } catch (error) {
            await PostOAuth();
        }
    }
    const data = (await axios.post(url,
        JSON.stringify(body),
        {
            headers: {
                Authorization: `Bearer ${credentials?.auth?.access_token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-api-version": "20220705"
            },
        }).catch(err => {
            if (err?.response?.data?.authentication == 'basic') {
                return {
                    data: {
                        authentication: "basic"
                    }
                };
            } else {
                return {
                    data: { error: null, }
                };
            }
        })).data;
    if (data?.authentication) {
        await PostOAuth();
        return get(url, params, tries + 1);
    }
    return data;
}