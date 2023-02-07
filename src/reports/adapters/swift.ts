import { Metadata, ReportEntry } from '../../manifest'
import { findFeature, findScenario } from '../helpers'
import { VNode } from '../vnode'

type ReportStructure = Array<{
    name: string
    id: string
    keyword: string
    description: string
    uri: string
    tags: Array<{ name: string; line: number }>
    elements: Array<{
        description: string
        test_env: string
        id: string
        steps: Array<{
            match: unknown
            result: {
                status: 'passed'
                duration: number
            }
            line: number
            name: string
            keyword: string
        }>
        keyword: string
        type: 'scenario'
        line: number
        tags: Array<{ name: string; line: number }>
        name: string
    }>
}>

export const jsonSwiftAdapter = (document: VNode, metadata: Metadata): Array<ReportEntry> => {
    function* featureReportGenerator(features: ReportStructure): Generator<ReportEntry> {
        for (const feature of features) {
            yield* scenarioReportGenerator(feature)
        }
    }

    function* scenarioReportGenerator(feature: ReportStructure[number]): Generator<ReportEntry> {
        for (const scenario of feature.elements) {
            const [status, duration] = scenario.steps.reduce(
                ([status, duration], step) => {
                    if (step.result.status === 'passed') {
                        return ['passed', duration + step.result.duration] as const
                    } else {
                        return ['failed', duration + step.result.duration] as const
                    }
                },
                ['passed', 0] as readonly ['passed' | 'failed', number],
            )

            yield {
                scenario: findScenario(scenario.name, metadata)?.id ?? scenario.name,
                feature: findFeature(feature.name, metadata)?.id ?? feature.name,
                status: status,
                duration: duration,
            }
        }
    }

    const report: ReportStructure = document.value

    return [...featureReportGenerator(report)]
}
