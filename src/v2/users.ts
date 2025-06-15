import * as helper from '../helper';
import * as apitypes from '../types';

export async function profile(i: {
    name: string,
    mode?: apitypes.GameMode;
}) {
    if (!i?.mode) {
        i.mode = 'osu';
    }
    const url = helper.baseUrl.v2 + `/users/${i.name}/${i.mode}/`;
    return await helper.get(
        url,
        {}
    ) as Promise<apitypes.User>;
}

export async function recentActivity(i: {
    name: string,
    limit?: number,
}) {
    if (!i?.limit) {
        i.limit = 100;
    }
    const url = helper.baseUrl.v2 + `/users/${i.name}/recent_activity`;
    return await helper.get(
        url,
        {
            limit: i.limit
        }
    ) as Promise<apitypes.Event[]>;
} 