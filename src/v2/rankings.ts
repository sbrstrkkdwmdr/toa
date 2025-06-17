import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

export async function kudosu(i: {
    page?: number;
}) {
    let params: Dict = {};
    if (i.page) params.page = i.page;

    const url = `/rankings/kudosu`;
    return await helper.get(
        url, params
    ) as Promise<apitypes.User[]>;
}

/**
 * variant is 4k or 7k, global type only
 * 
 * country is ISO 3166-1 alpha-2, global type only
 */
export async function ranking(i: {
    mode: apitypes.GameMode,
    type: apitypes.RankingType,
    ruleset?: apitypes.GameMode,
    country?: string,
    cursor?: string,
    filter?: string,
    spotlight?: string,
    variant?: string,
}) {
    if (!i.mode) throw new Error('Missing mode');
    if (!i.type) throw new Error('Missing type');
    let params: Dict = {};
    if (i.country) params.country = i.country;
    if (i.cursor) params.cursor = i.cursor;
    if (i.filter) params.filter = i.filter;
    if (i.spotlight) params.spotlight = i.spotlight;
    if (i.variant) params.variant = i.variant;

    const url = `/rankings/${i.mode}/${i.type}`;
    return await helper.get(
        url, params
    ) as Promise<apitypes.Rankings>;
}

export async function spotlights() {
    let params: Dict = {};
    const url = `/spotlights`;
    return await helper.get(
        url, params
    ) as Promise<apitypes.SpotLights>;
}