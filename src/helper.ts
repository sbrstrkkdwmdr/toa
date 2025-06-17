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

let headerVersion = '20220705';

/**
 * YYYYMMDD
 * 
 * note that when using an api version below 20220705, Score is of type LegacyScore
 */
export function setVersion(version: string) {
    headerVersion = version;
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

export function checkCredentials(version: 1 | 2): [boolean, string] {
    if (version == 1 && !credentials.key) {
        return [false, 'Missing API key. Please use add a key with v1.login(key)'];
    } else if (version == 2) {
        let msgs = '';
        let p = true;
        if (!credentials.id) {
            msgs += 'Missing client ID. Please input the ID with v2.login(id,secret)\n';
            p = false;
        }
        if (!credentials.secret) {
            msgs += 'Missing client secret. Please input the secret with v2.login(id,secret)\n';
            p = false;
        }
        return [p, msgs];
    }
    return [true, ''];
}

export async function checkAuth() {
    try {
        oAuth();
    } catch (error) {
        await PostOAuth();
    }
    if (fs.existsSync(`./config/osuauth.json`)) {
        const stat = fs.statSync(`./config/osuauth.json`);
        if (credentials.auth?.expires_in ?? 0 <= stat.mtimeMs) {
            await PostOAuth();
        }
    } else {
        await PostOAuth();
    }
}

export async function get(url: string, params: Dict, tries: number = 0) {
    if (tries > 3) {
        throw new Error('Exceeded try count. Please ensure credentials are valid');
    }
    const c = checkCredentials(2);
    if (c[0]) {
        throw new Error(c[1]);
    }
    await checkAuth();
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
    const data = (await axios.get(url, {
        headers: {
            Authorization: `Bearer ${credentials?.auth?.access_token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-version": headerVersion
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
    const c = checkCredentials(2);
    if (c[0]) {
        throw new Error(c[1]);
    }
    await checkAuth();
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

export async function get_v1(url: string, params: Dict, tries: number = 0) {
    if (tries > 3) {
        throw new Error('Exceeded try count. Please ensure credentials are valid');
    }
    const c = checkCredentials(1);
    if (c[0]) {
        throw new Error(c[1]);
    }
    await checkAuth();
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
    const data = (await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }).catch(err => {
        return {
            data: { error: err, }
        };
    })).data;
    return data;
}