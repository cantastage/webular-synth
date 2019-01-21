export interface ICache {
    // shouldn't be called from the outside of the implementer
    _updateCache(): void;
}
