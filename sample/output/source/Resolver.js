// @flow

export default class Resolver<K, V> {

    async getAll(): Promise<Array<V>> {
        if (this._data == undefined) {
            this._data = await this._fetch();
        }
        return [...this._data.values()];
    }

    async get(id: K): Promise<V> {
        if (this._data == undefined) {
            this._data = await this._fetch();
        }
        if (!this._data.has(id)) {
            throw new Error(this.constructor.name + ' not exist id:' + id);
        }
        return this._data.get(id);
    }

    _fetch(): Promise<Map<K, V>> {
        throw Error('Not implemented');
    }

}
