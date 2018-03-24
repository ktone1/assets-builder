// auto generated from card/attribute.yaml
// @flow
import msgpack from 'msgpack-lite';
import Resolver from './resolver';


type CardAttribute = {
    id: number;
    name: string;
};


class _CardAttributeResolver extends Resolver<number, CardAttribute> {
    async _fetch(): Promise<Map<number, CardAttribute> {
        const data = await fetch('http://example.com/' + 'CardAttribute.dat').then(response => {
            return response.arrayBuffer();
        }).then(arrayBuffer => {
            return msgpack.decode(new Uint8Array(arrayBuffer));
        });
        let map = new Map();
        for (let i = 0; i < data.length; i++) {
            map.set(data[i][0], {
                id: data[i][0],
                name: data[i][1],
            });
        }
        return map;
    }
}


const CardAttributeResolver = new _CardAttributeResolver();
export default CardAttributeResolver;
