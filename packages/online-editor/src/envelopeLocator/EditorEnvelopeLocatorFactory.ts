/*
 * Copyright 2022 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  EditorEnvelopeLocator,
  EnvelopeContentType,
  EnvelopeMapping,
} from "@kie-tools-core/editor/dist/api/EditorEnvelopeLocator";

import {
  FileTypesSandbox,
  isDecision,
  isWorkflow,
  isScorecard,
  isTestScenario,
} from "@kie-tools-core/workspaces-git-fs/dist/constants/ExtensionHelper";

export const GLOB_PATTERN = {
  all: "**/*",
  dmn: "**/*.dmn",
  bpmn: "**/*.bpmn?(2)",
  scesim: "**/*.scesim",
  pmml: "**/*.pmml",
};

export const supportedFileExtensionArray = [
  FileTypesSandbox.DMN,
  FileTypesSandbox.BPMN,
  FileTypesSandbox.BPMN2,
  FileTypesSandbox.SCESIM,
  FileTypesSandbox.PMML,
];

export type SupportedFileExtensions = typeof supportedFileExtensionArray[number];

export function isModel(path: string): boolean {
  return isDecision(path) || isWorkflow(path) || isScorecard(path);
}

export function isEditable(path: string): boolean {
  return isModel(path) || isTestScenario(path);
}

export class EditorEnvelopeLocatorFactory {
  public create(args: { targetOrigin: string }) {
    return new EditorEnvelopeLocator(args.targetOrigin, [
      new EnvelopeMapping({
        type: FileTypesSandbox.BPMN,
        filePathGlob: GLOB_PATTERN.bpmn,
        resourcesPathPrefix: "gwt-editors/bpmn",
        envelopeContent: { type: EnvelopeContentType.PATH, path: "bpmn-envelope.html" },
      }),
      new EnvelopeMapping({
        type: FileTypesSandbox.DMN,
        filePathGlob: GLOB_PATTERN.dmn,
        resourcesPathPrefix: "gwt-editors/dmn",
        envelopeContent: { type: EnvelopeContentType.PATH, path: "dmn-envelope.html" },
      }),
      new EnvelopeMapping({
        type: FileTypesSandbox.PMML,
        filePathGlob: GLOB_PATTERN.pmml,
        resourcesPathPrefix: "",
        envelopeContent: { type: EnvelopeContentType.PATH, path: "pmml-envelope.html" },
      }),
    ]);
  }
}
