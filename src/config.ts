import path from 'node:path'

// 1. Add language here
const supportedRepositories = ['java', 'dart', 'kotlin', 'swift', 'ruby'] as const

export type SupportedRepositories = typeof supportedRepositories[number]

export type RepositoryConfig = {
    name: SupportedRepositories

    mainReportName: string
    betaReportName?: string
}

export type Config = {
    secrets: {
        github: string
    }

    paths: {
        sdkSpecifications: string
        featureFiles: string
    }

    repositories: Record<SupportedRepositories, RepositoryConfig>
}

export function isSupported(repo: any): repo is SupportedRepositories {
    return supportedRepositories.includes(repo)
}

export function getEntryType(config: RepositoryConfig, name: string) {
    if (name === config.mainReportName) {
        return 'main'
    } else if (name === config.betaReportName) {
        return 'beta'
    } else {
        return 'unknown'
    }
}

export const makeConfig = (): Config => ({
    secrets: {
        github: '',
    },
    paths: {
        sdkSpecifications: path.resolve(__dirname, '../specifications'),
        featureFiles: path.resolve(__dirname, '../specifications', 'features'),
    },
    // 2. And then update this config
    repositories: {
        java: {
            name: 'java',
            mainReportName: 'main.xml',
            betaReportName: 'beta.xml',
        },
        dart: {
            name: 'dart',
            mainReportName: 'report.xml',
            betaReportName: 'beta.xml',
        },
        kotlin: {
            name: 'kotlin',
            mainReportName: 'main.xml',
            betaReportName: 'beta.xml',
        },
        swift: {
            name: 'swift',
            mainReportName: 'main.json',
            betaReportName: 'beta.json',
        },
        ruby: {
            name: 'ruby',
            mainReportName: 'main.xml',
            betaReportName: 'beta.xml',
        },
    },
})
