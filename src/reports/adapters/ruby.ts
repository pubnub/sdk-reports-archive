import { Metadata, ReportEntry } from '../../manifest'
import { findFeature, findScenario } from '../helpers'
import { VNode } from '../vnode'

export const xmlRubyAdapter = (document: VNode, metadata: Metadata): Array<ReportEntry> => {
    function* scenarioReportGenerator(document: VNode): Generator<ReportEntry> {
        for (const feature of document.children) {
            for (const scenario of feature.children) {
                const status = scenario.children.some((child) => child.type === 'skipped') ? 'skipped' : 'passed'
                const stdout = scenario.children.find(
                    (child) => child.type === 'system-out' && child.children.length > 0,
                )?.children[0].text
                const stderr = scenario.children.find(
                    (child) => child.type === 'system-err' && child.children.length > 0,
                )?.children[0].text

                yield {
                    scenario: findScenario(scenario.attributes.name, metadata)?.id ?? scenario.attributes.name,
                    feature: findFeature(feature.attributes.name, metadata)?.id ?? feature.attributes.name,
                    status: status,
                    duration: parseFloat(scenario.attributes.time),
                    stdout: stdout,
                    stderr: stderr,
                }
            }
        }
    }

    return [...scenarioReportGenerator(document)]
}
