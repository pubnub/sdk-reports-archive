# SDK Reports Archive

This repository contains reports from ATF test runs across all SDKs. To see reports from past, use git commit history.

## Commit types

### `release` commit

    release: language 1.2.3

This commit signifies that the reports added in it belong to a release of a specific languages SDK.

### `update` commit

    update: language 1.2.3

This commit is triggered manually by a developer.

### `skip` commit

    skip: fix some scripts

This commit is done manually and is used to update the scripts in this repository.

## Folder and file structure
`./reports` directory should contain folders of respective SDKs. Two files should be in each of those folders - `main.ext` and `beta.ext` where `ext` is one of the supported formats - `xml`, `json` or `yaml`.

`./src` contains scripts used for generating `manifest.json` and `metadata.json`.

`manifest.json` and `metadata.json` contain parsed and structured information about the state of this repository at specific point in time. They should be located at the root of the repository.