// auto generated from card/master.yaml
// @flow
import msgpack from 'msgpack-lite';
import Resolver from './resolver';
import type {CardAttribute} from './CardAttribute';
import CardAttributeResolver from './CardAttribute';


type CardMaster = {
    id: number;
    name: string;
    attribute: CardAttribute;
};


class _CardMasterResolver extends Resolver<number, CardMaster> {
    async _fetch(): Promise<Map<number, CardMaster> {
        const data = await fetch('http://example.com/' + 'CardMaster.dat').then(response => {
            return response.arrayBuffer();
        }).then(arrayBuffer => {
            return msgpack.decode(new Uint8Array(arrayBuffer));
        });
        let map = new Map();
        for (let i = 0; i < data.length; i++) {
            map.set(data[i][0], {
                id: data[i][0],
                name: data[i][1],
                attribute: await CardAttributeResolver.get(data[i][2]),
            });
        }
        return map;
    }
}


const CardMasterResolver = new _CardMasterResolver();
export default CardMasterResolver;
