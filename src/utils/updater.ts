interface Options {
    timer?: number;
}

export class Updater {
    oldScript: string[]; // 存储第一次值也就是 script 的 hash 信息
    newScript: string[]; // 获取新的值 也就是新的 script 的 hash 信息
    dispatch: Record<string, any[]>; // 小型发布订阅通知用户更新了

    constructor(options: Options) {
        this.oldScript = [];
        this.newScript = [];
        this.dispatch = {};
        this.handleInit(); // 初始化
        this.timing(options?.timer); // 轮询
    }

    /**
     * 读取 index html
     */
    async getHtml() {
        const html = await fetch('/').then((res) => res.text());
        return html;
    }

    /**
     * 获取 html 中的 stript
     * @param html
     */
    handleScript(html: string) {
        // 正则匹配 script 标签
        const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi);
        const stript = html.match(reg) as string[];

        return stript;
    }

    /**
     * 新旧 stript 对比
     * @param oldArr
     * @param newArr
     */
    handleCompare(oldArr: string[], newArr: string[]) {
        const lastLength = oldArr.length;
        const arr = Array.from(new Set(oldArr.concat(newArr)));

        // 如果 length 一样无更新
        if (arr.length === lastLength) {
            this.dispatch['no-update'].forEach((fn) => {
                fn();
            });
        } else {
            // 否则通知更新
            this.dispatch['update'].forEach((fn) => {
                fn();
            });
        }
    }

    /**
     * 获取初始 script
     */
    async handleInit() {
        const html: string = await this.getHtml();
        this.oldScript = this.handleScript(html);
    }

    timing(time = 10000) {
        // 轮询
        setInterval(async () => {
            const newHtml = await this.getHtml();

            this.newScript = this.handleScript(newHtml);
            this.handleCompare(this.oldScript, this.newScript);
        }, time);
    }

    /**
     * 发布订阅通知
     * @param key
     * @param fn
     * @returns
     */
    on(key: 'no-update' | 'update', fn: any) {
        (this.dispatch[key] || (this.dispatch[key] = [])).push(fn);

        return this;
    }
}

// /**
//  * 实例化该类
//  */
// const up = new Updater({
//     timer: 2000,
// });

// /**
//  * 未更新通知
//  */
// up.on('no-update', () => {
//     console.log('未更新');
// });

// /**
//  * 更新通知
//  */
// up.on('update', () => {
//     console.log('已更新');
// });
