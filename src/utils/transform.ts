import Formula from '@hapi/formula';
import to from './await-to';

export interface EnumType {
    [key: string]: number | string;
}

interface Option {
    label: string;
    value: number;
}

interface RadioOption {
    label: number;
    labelName: string;
}

/**
 * 将枚举转换为options
 */
export function transformEnumToLabelValueOptions(enumeration: EnumType): Option[] {
    const arrayList = Object.entries(enumeration);
    return arrayList
        .map(([label, value]) => {
            return {
                label,
                value: value as number,
            };
        })
        .slice(arrayList.length / 2);
}

/**
 * 将枚举转换为 radio options
 */
export function transformEnumToRadioOptions(enumeration: EnumType): RadioOption[] {
    const arrayList = Object.entries(enumeration);
    return arrayList
        .map(([labelName, label]) => {
            return {
                label: label as number,
                labelName,
            };
        })
        .slice(arrayList.length / 2);
}

/**
 * 根据计算公式获取计算结果
 * @param formulaString 计算公式字符串
 * @param options 计算公式配置
 * @param evaluate 特殊字符替代数据
 */
export async function calc(
    formulaString: string,
    options: Formula.Options,
    evaluate: unknown,
): Promise<number | string | Error> {
    const [err, formula] = await to<Formula.Parser<string | number>>(
        new Promise((resolve, reject) => {
            try {
                const formulaObj = new Formula.Parser(formulaString, options);
                resolve(formulaObj);
            } catch (err) {
                reject(new Error(`'${formulaString}' 公式错误`));
            }
        }),
    );

    if (err) {
        return err;
    }

    return formula.evaluate(evaluate);
}
