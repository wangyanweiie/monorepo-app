import type { Emitter } from 'mitt';
/**
 * 刷新函数参数
 */
interface RefreshParam {
    path: string;
    name: string;
}

type Event = {
    refresh: RefreshParam;
};

declare module 'vue' {
    export interface ComponentCustomProperties {
        $bus: Emitter<Event>;
    }
}

export {};
