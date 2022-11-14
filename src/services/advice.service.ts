export class AdviceService {
    constructor(private readonly _url:string) {}
    getRandomAdvice() {
        return fetch(this._url);
    }
}