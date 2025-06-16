import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

export async function leaderboard(i: {
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
    const url = helper.baseUrl.v2 + `beatmaps/${i.map_id}/scores/users/${i.user_id}`;
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
    const url = helper.baseUrl.v2 + `beatmaps/${i.map_id}/scores/users/${i.user_id}/all`;
    let params: Dict = {
    };
    if (i.legacy_only) params['legacy_only'] = +i.legacy_only;
    if (i.mods) params['mods'] = i.mods;
    if (i.ruleset) params['ruleset'] = i.ruleset;
    return await helper.get(
        url, params
    ) as Promise<{ scores: apitypes.Score[]; }>;
}