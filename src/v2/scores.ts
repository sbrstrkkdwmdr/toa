import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

type scoreListParams = {
    user_id: number,
    mode: apitypes.GameMode;
    limit?: number,
    offset?: number;
};

async function all(i: {
    user_id: number,
    mode?: apitypes.GameMode;
    type: 'recent' | 'firsts' | 'best' | 'pinned',
    limit?: number,
    include_fails?: boolean,
    offset?: number;
}) {
    if (!i.user_id) throw new Error('Missing user ID');
    if (!i.type) throw new Error('Missing scores type');
    let params: Dict = {
        limit: 100,
    };
    if (i.mode) params['mode'] = i.mode;
    if (i.limit) params['limit'] = i.limit;
    if (i.include_fails) params['include_fails'] = +i.include_fails;
    if (i.offset) params['offset'] = i.offset;

    const url = helper.baseUrl.v2 + `/users/${i.user_id}/scores/${i.type}`;
    return await helper.get(
        url, params
    ) as Promise<apitypes.Score[]>;
}

/**
 * mode is needed for old score links
 */
export async function single(i: {
    id: string,
    mode?: apitypes.GameMode;
}) {
    if (!i.id) throw new Error('Missing score ID');
    let url = helper.baseUrl.v2 + `/scores/${i.id}`;
    if (i.mode) {
        url = helper.baseUrl.v2 + `/scores/${i.mode}/${i.id}`;
    }
    return await helper.get(
        url,
        {}
    ) as Promise<apitypes.Score>;
};

export async function scores(i: {
    ruleset?: apitypes.GameMode,
    cursor_string?: string,
}) {
    let url = helper.baseUrl.v2 + `/scores`;
    let params: Dict = {};
    if (i.ruleset) params['ruleset'] = i.ruleset;
    if (i.cursor_string) params['cursor_string'] = i.cursor_string;
    return await helper.get(
        url,
        params
    ) as Promise<apitypes.Score>;
};

/**
 * past 24h
 */
export async function recent(i: scoreListParams & { include_fails: boolean; }) {
    return await all({
        user_id: i.user_id,
        mode: i.mode,
        limit: i.limit,
        include_fails: i.include_fails,
        type: 'recent',
        offset: i.offset
    });
}

/**
 * top ranks
 */
export async function best(i: scoreListParams) {
    return await all({
        user_id: i.user_id,
        mode: i.mode,
        limit: i.limit,
        include_fails: false,
        type: 'best',
        offset: i.offset
    });
}

/**
 * #1 scores
 */
export async function first(i: scoreListParams) {
    return await all({
        user_id: i.user_id,
        mode: i.mode,
        limit: i.limit,
        include_fails: false,
        type: 'firsts',
        offset: i.offset
    });
}

export async function pinned(i: scoreListParams) {
    return await all({
        user_id: i.user_id,
        mode: i.mode,
        limit: i.limit,
        include_fails: false,
        type: 'pinned',
        offset: i.offset
    });
}