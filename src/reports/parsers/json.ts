import { VNode } from '../vnode'

export const jsonParser = (source: string): VNode => {
    const rawObject = JSON.parse(source)

    return { type: '$JSON', attributes: {}, children: [], value: rawObject }
}
