/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { BPMN20__tDefinitions } from "@kie-tools/bpmn-marshaller/dist/schemas/bpmn-2_0/ts-gen/types";
import { Normalized } from "../normalization/normalize";
import { addOrGetProcessAndDiagramElements } from "./addOrGetProcessAndDiagramElements";
import { visitFlowElementsAndArtifacts } from "./_elementVisitor";

export function deleteInterfaceAndOperation({
  definitions,
  serviceTaskId,
}: {
  definitions: Normalized<BPMN20__tDefinitions>;
  serviceTaskId: string;
}) {
  const interfaceId = `${serviceTaskId}_ServiceInterface`;
  const inMessageId = `${serviceTaskId}_InMessage`;
  const outMessageId = `${serviceTaskId}_OutMessage`;

  const existingInterfaceIndex = definitions.rootElement?.findIndex(
    (s) => s.__$$element === "interface" && s["@_id"] === interfaceId
  );
  const existingInMessageIndex = definitions.rootElement?.findIndex(
    (s) => s.__$$element === "message" && s["@_id"] === inMessageId
  );
  const existingOutMessageIndex = definitions.rootElement?.findIndex(
    (s) => s.__$$element === "message" && s["@_id"] === outMessageId
  );
  if (existingInterfaceIndex === undefined || existingInterfaceIndex < 0) {
    return;
  }

  const { process } = addOrGetProcessAndDiagramElements({ definitions });
  let hasCorrespondingServiceTask = false;

  visitFlowElementsAndArtifacts(process, ({ element }) => {
    if (element["@_id"] === serviceTaskId && element.__$$element === "serviceTask") {
      hasCorrespondingServiceTask = true;
      return false; // Will stop visiting.
    }
  });

  if (!hasCorrespondingServiceTask) {
    const indicesToDelete = [existingInterfaceIndex, existingInMessageIndex, existingOutMessageIndex]
      .filter((index): index is number => index !== undefined && index >= 0)
      .sort((a, b) => b - a);
    for (const index of indicesToDelete) {
      definitions.rootElement?.splice(index, 1);
    }
  }
}
