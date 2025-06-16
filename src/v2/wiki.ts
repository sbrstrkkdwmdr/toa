import * as apitypes from '../apitypes';
import * as helper from '../helper';
import { Dict } from '../types';

export async function page(i: {
    locale: string,
    path: string,
}) {
    if (!i.path) throw new Error('Missing path');
    if (!i.locale) i.locale = 'en';
    const url = helper.baseUrl.v2 + `/wiki/${i.locale}/${i.path}`;

    return await helper.get(
        url, {}
    ) as Promise<apitypes.KudosuHistory[]>;
}