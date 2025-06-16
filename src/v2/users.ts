import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

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
    if (i.limit) params['limit'] = i.limit;

    return await helper.get(
        url, params
    ) as Promise<apitypes.Event[]>;
} 