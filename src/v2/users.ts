import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

type scoreListParams = {
    user_id: number,
    mode: apitypes.GameMode;
    limit?: number,
    offset?: number;
};

export async function profile(i: {
    name?: string,
    mode?: apitypes.GameMode;
    id?: string,
}) {
    if (!i.name && !i.id) throw new Error('Missing an ID or username to lookup');
    let url = helper.baseUrl.v2 + `/users/${i.name}`;
    if (i?.mode) {
        url += `/${i.mode}`;
    }
    return await helper.get(
        url,
        {}
    ) as Promise<apitypes.UserExtended>;
}

export async function users(i: {
    ids: number[];
    include_variant_statistics?: boolean;
}) {
    if (!i.ids || i.ids.length == 0) throw new Error('Missing user IDs');
    const url = helper.baseUrl.v2 + `/users`;
    let params: Dict = {
        ids: i.ids
    };
    if (i.include_variant_statistics)
        params.include_variant_statistics = i.include_variant_statistics;
    return await helper.get(
        url,
        {
            ids: i.ids
        }
    ) as Promise<apitypes.User[]>;
}

export async function recentActivity(i: {
    name: string,
    limit?: number,
}) {
    const url = helper.baseUrl.v2 + `/users/${i.name}/recent_activity`;
    if (!i?.limit) {
        i.limit = 100;
    }
    let params: Dict = {
        limit: 100,
    };
    if (i.limit) params.limit = i.limit;

    return await helper.get(
        url, params
    ) as Promise<apitypes.Event[]>;
}

export async function beatmaps(i: {
    user_id: number,
    type: 'favourite' | 'graveyard' | 'guest' | 'loved' | 'nominated' | 'pending' | 'ranked';
    limit?: number,
    offset?: number,
}) {
    if (!i.user_id) throw new Error('Missing user ID');
    if (!i.type) throw new Error('Missing type');
    const params: Dict = {
        limit: 100
    };
    if (i.limit)
        params.limit = i.limit;
    if (i.offset)
        params.offset = i.offset;
    const url = helper.baseUrl.v2 + `/users/${i.user_id}/beatmapsets/${i.type}`;

    return await helper.get(
        url, params
    ) as Promise<apitypes.Beatmapset[]>;
};

export async function mostPlayed(i: {
    user_id: number,
    limit?: number,
    offset?: number,
}) {
    if (!i.user_id) throw new Error('Missing user ID');
    const params: Dict = {
        limit: 100
    };
    if (i.limit)
        params.limit = i.limit;
    if (i.offset)
        params.offset = i.offset;
    const url = helper.baseUrl.v2 + `/users/${i.user_id}/beatmapsets/most_played`;

    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapPlaycount[]>;
};

export async function kudosu(i: {
    user_id: number,
    limit?: number,
    offset?: number,
}) {
    if (!i.user_id) throw new Error('Missing user ID');
    const params: Dict = {
        limit: 100
    };
    if (i.limit)
        params.limit = i.limit;
    if (i.offset)
        params.offset = i.offset;
    const url = helper.baseUrl.v2 + `/users/${i.user_id}/kudosu`;

    return await helper.get(
        url, params
    ) as Promise<apitypes.KudosuHistory[]>;
}

/**
 * undocumented
 * params assumed based on beatmap lookup
 */
export async function lookup(i: {
    checksum?: string,
    id?: number,
}) {
    if (!(i.checksum && i.id)) throw new Error('Please input a checksum or ID to lookup');
    const url = helper.baseUrl.v2 + `/users/lookup`;
    let params: Dict = {
    };
    if (i.checksum)
        params.checksum = i.checksum;
    if (i.id)
        params.id = i.id;
    return await helper.get(
        url, params
    ) as Promise<apitypes.User[]>;
};

export async function scores(i: {
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
    if (i.mode) params.mode = i.mode;
    if (i.limit) params.limit = i.limit;
    if (i.include_fails) params.include_fails = +i.include_fails;
    if (i.offset) params.offset = i.offset;

    const url = helper.baseUrl.v2 + `/users/${i.user_id}/scores/${i.type}`;
    return await helper.get(
        url, params
    ) as Promise<apitypes.Score[]>;
}

/**
 * past 24h
 */
export async function scoresRecent(i: scoreListParams & { include_fails: boolean; }) {
    return await scores({
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
export async function scoresBest(i: scoreListParams) {
    return await scores({
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
export async function scoresFirst(i: scoreListParams) {
    return await scores({
        user_id: i.user_id,
        mode: i.mode,
        limit: i.limit,
        include_fails: false,
        type: 'firsts',
        offset: i.offset
    });
}

export async function scoresPinned(i: scoreListParams) {
    return await scores({
        user_id: i.user_id,
        mode: i.mode,
        limit: i.limit,
        include_fails: false,
        type: 'pinned',
        offset: i.offset
    });
}