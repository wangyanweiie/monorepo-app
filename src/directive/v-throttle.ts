const throttle = {
    mounted(el: any, binding: Record<string, any>) {
        // 节流时间
        const throttleTime = binding.value || 2000;

        let cbFun: any;

        el.addEventListener(
            'click',
            (event: any) => {
                if (!cbFun) {
                    // 第一次执行
                    cbFun = setTimeout(() => {
                        cbFun = null;
                    }, throttleTime);
                } else {
                    event && event.stopImmediatePropagation();
                }
            },
            true,
        );
    },
};

export default throttle;
