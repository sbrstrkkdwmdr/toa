import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

export async function scores(i: {
    id: number,
    mode: apitypes.GameMode,
    legacy_only?: boolean,
    mods?: apitypes.ModAcronym[],
    limit?: number;
    type?: string;
}) {
    if (!i.id) throw new Error('Missing beatmap ID');
    if (!i.id) throw new Error('Missing ruleset');
    const url = helper.baseUrl.v2 + `/beatmaps/${i.id}/scores`;
    let params: Dict = {
    };
    if (i.legacy_only) params['legacy_only'] = +i.legacy_only;
    if (i.mods) params['mods'] = i.mods;
    if (i.limit) params['limit'] = i.limit;
    if (i.type) params['type'] = i.type;
    return await helper.get(
        url,
        {
            ruleset: i.mode,
            mods: i.mods ?? [],
            limit: i.limit ?? 100,
        }
    ) as Promise<apitypes.BeatmapScores<apitypes.Score>>;
}

export async function userScore(i: {
    user_id: number,
    map_id: number,
    legacy_only?: boolean,
    mods?: apitypes.ModAcronym[],
    ruleset?: apitypes.GameMode,
}) {
    const url = helper.baseUrl.v2 + `/beatmaps/${i.map_id}/scores/users/${i.user_id}`;
    let params: Dict = {
    };
    if (i.legacy_only) params['legacy_only'] = +i.legacy_only;
    if (i.mods) params['mods'] = i.mods;
    if (i.ruleset) params['ruleset'] = i.ruleset;
    return await helper.get(url, params) as Promise<apitypes.BeatmapUserScore>;
}

export async function userScores(i: {
    user_id: number,
    map_id: number,
    legacy_only?: boolean,
    mods?: apitypes.ModAcronym[],
    ruleset?: apitypes.GameMode,
}) {
    const url = helper.baseUrl.v2 + `/beatmaps/${i.map_id}/scores/users/${i.user_id}/all`;
    let params: Dict = {
    };
    if (i.legacy_only) params['legacy_only'] = +i.legacy_only;
    if (i.mods) params['mods'] = i.mods;
    if (i.ruleset) params['ruleset'] = i.ruleset;
    return await helper.get(
        url, params
    ) as Promise<{ scores: apitypes.Score[]; }>;
}

export async function map(i: {
    id: number;
}) {
    if (!i.id) throw new Error('Missing beatmap ID');
    const url = helper.baseUrl.v2 + `/beatmaps/${i.id}`;
    let params: Dict = {
    };
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapExtended>;
}

export async function maps(i: {
    ids: number[];
}) {
    if (!i.ids || i.ids.length == 0) throw new Error('Missing beatmap IDs');
    const url = helper.baseUrl.v2 + `/beatmaps`;
    let params: Dict = {
        ids: i.ids
    };
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapExtended[]>;
}

export async function mapLookup(i: {
    filename?: string,
    checksum?: string,
    id?: number,
}) {
    if (!(i.filename && i.checksum && i.id)) throw new Error('Please input a filename, checksum or ID to lookup');
    const url = helper.baseUrl.v2 + `/beatmaps/lookup`;
    let params: Dict = {
    };
    if (i.filename)
        params['filename'] = i.filename;
    if (i.checksum)
        params['checksum'] = i.checksum;
    if (i.id)
        params['id'] = i.id;
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapExtended>;
}

export async function attributes(i: {
    id: number;
    mods?: apitypes.ModAcronym[] | number,
    ruleset?: apitypes.GameMode,
    ruleset_id?: helper.Ruleset;
}) {
    if (!i.id) throw new Error('Missing beatmap ID');
    const url = helper.baseUrl.v2 + `/beatmaps/${i.id}`;
    let params: Dict = {
    };
    let body: Dict = {

    };
    if (i.mods)
        body['mods'] = i.mods;
    if (i.ruleset)
        body['ruleset'] = i.ruleset;
    if (i.ruleset_id)
        body['ruleset_id'] = i.ruleset_id;

    return await helper.post(
        url, params, body
    ) as Promise<apitypes.BeatmapDifficultyAttributes>;
}

export async function mapset(i: {
    id: number;
}) {
    if (!i.id) throw new Error('Missing beatmapset ID');
    const url = helper.baseUrl.v2 + `/beatmapsets/${i.id}`;
    let params: Dict = {
    };
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapsetExtended>;
}

/**
 * WIP
 */
export async function mapsetLookup(i: {
    filename?: string,
    checksum?: string,
    id?: number,
}) {
    if (!(i.filename && i.checksum && i.id)) throw new Error('Please input a filename, checksum or ID to lookup');
    const url = helper.baseUrl.v2 + `/beatmapsets/lookup`;
    let params: Dict = {
    };
    if (i.filename)
        params['filename'] = i.filename;
    if (i.checksum)
        params['checksum'] = i.checksum;
    if (i.id)
        params['id'] = i.id;
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapsetExtended>;
}

export async function search(i: {
    cursor_string?: string;
}) {
    const url = helper.baseUrl.v2 + `/beatmapsets/search`;
    let params: Dict = {
        cursor_string: i?.cursor_string ?? ''
    };
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapsetSearch>;
}

export async function packs(i: {
    type?: string,
    cursor_string?: string;
}) {
    const url = helper.baseUrl.v2 + `/beatmaps/packs`;
    let params: Dict = {
    };
    if (i.type)
        params['type'] = i.type;
    if (i.cursor_string)
        params['cursor_string'] = i.cursor_string;
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapPack[]>;
}

export async function pack(i: {
    pack: string,
    legacy_only: boolean,
}) {
    const url = helper.baseUrl.v2 + `/beatmaps/packs/${i.pack}`;
    let params: Dict = {
    };
    if (i.legacy_only)
        params['legacy_only'] = +i.legacy_only;
    return await helper.get(
        url, params
    ) as Promise<apitypes.BeatmapPack>;
}