import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

export async function build(i: {
    stream: string,
    build: boolean,
}) {
    if (!i.stream) throw new Error('Missing stream');
    if (!i.build) throw new Error('Missing build');
    const url = `/changelog/${i.stream}/${i.build}`;
    let params: Dict = {
    };
    return await helper.requests.get_v2(
        url, params
    ) as Promise<apitypes.Build>;
}

export async function listing(i: {
    from?: string,
    max_id?: number,
    stream?: string,
    to?: string,
    'message_formats[]'?: string,
}) {
    const url = `/changelog`;
    const params = helper.setParams(i, {}, ['from', 'max_id', 'stream', 'to', 'message_formats[]',]);

    return await helper.requests.get_v2(
        url, params
    ) as Promise<{
        builds: apitypes.Build[],
        search: {
            from?: string,
            limit: 21,
            max_id?: number,
            stream?: string,
            to?: string,
            streams: apitypes.UpdateStream[];
        };
    }>;
}

export async function lookup(i: {
    changelog: string,
    key?: string,
    'message_formats[]'?: string,
}) {
    if (!i.changelog) throw new Error('Missing changelog');

    const url = `/changelog/${i.changelog}`;

    const params = helper.setParams(i, {}, ['key', 'message_formats[]',]);

    return await helper.requests.get_v2(
        url, params
    ) as Promise<apitypes.BeatmapPack>;
}