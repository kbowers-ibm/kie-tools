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

import { BPMN20__tIntermediateThrowEvent } from "@kie-tools/bpmn-marshaller/dist/schemas/bpmn-2_0/ts-gen/types";
import { FormSection } from "@patternfly/react-core/dist/js/components/Form";
import * as React from "react";
import { updateFlowElement } from "../../mutations/renameNode";
import { Normalized } from "../../normalization/normalize";
import { useBpmnEditorStoreApi } from "../../store/StoreContext";
import { NameDocumentationAndId } from "../nameDocumentationAndId/NameDocumentationAndId";
import { InputOnlyAssociationFormSection } from "../assignments/AssignmentsFormSection";
import { EventDefinitionProperties } from "../eventDefinition/EventDefinitionProperties";
import { IntermediateThrowEventIcon } from "../../diagram/nodes/NodeIcons";
import { PropertiesPanelHeaderFormSection } from "./_PropertiesPanelHeaderFormSection";

export function IntermediateThrowEventProperties({
  intermediateThrowEvent,
}: {
  intermediateThrowEvent: Normalized<BPMN20__tIntermediateThrowEvent> & { __$$element: "intermediateThrowEvent" };
}) {
  const bpmnEditorStoreApi = useBpmnEditorStoreApi();

  return (
    <>
      <PropertiesPanelHeaderFormSection
        title={intermediateThrowEvent["@_name"] ?? "Intermediate throw event"}
        icon={<IntermediateThrowEventIcon variant={intermediateThrowEvent.eventDefinition?.[0]?.__$$element} />}
      >
        <NameDocumentationAndId element={intermediateThrowEvent} />

        <EventDefinitionProperties event={intermediateThrowEvent} />
      </PropertiesPanelHeaderFormSection>

      <InputOnlyAssociationFormSection element={intermediateThrowEvent} />
    </>
  );
}
