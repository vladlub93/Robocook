let loader = {
    sprites: {},
    loaded: function () {
        return Promise.all(Object.values(this.sprites))
    },
    load: function (url) {
        const promise = new Promise((res, rej) => {
            var img = new Image();
            img.loaded = false;
            img.onload = () => {
                promise.isResolved = true;
                img.loaded = true;
                res(img);
            };
            img.onerror = rej;
            img.src = url;
        });
        promise.isResolved = false;
        if (!this.sprites[url])
            this.sprites[url] = promise;
        if (!this.sprites[url].isResolved)
            this.sprites[url] = promise;
        return promise;
    }
};
export default loader;