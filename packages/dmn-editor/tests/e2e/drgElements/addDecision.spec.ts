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

import { test, expect } from "../__fixtures__/base";
import { EdgeType } from "../__fixtures__/edges";
import { DefaultNodeName, NodeType } from "../__fixtures__/nodes";

test.beforeEach(async ({ editor }) => {
  await editor.open();
});

test.describe("Add node - Decision", () => {
  test.describe("Add to the DRG", () => {
    test.describe("add from the palette", () => {
      test("should add Decision node from palette", async ({ palette, nodes, diagram }) => {
        await palette.dragNewNode({ type: NodeType.DECISION, targetPosition: { x: 100, y: 100 } });

        expect(nodes.get({ name: DefaultNodeName.DECISION })).toBeAttached();
        await expect(diagram.get()).toHaveScreenshot("add-decision-node-from-palette.png");
      });
    });

    test.describe("add from nodes", () => {
      test("should add connected Decision node from Input Data node", async ({ diagram, palette, nodes, edges }) => {
        await palette.dragNewNode({
          type: NodeType.INPUT_DATA,
          targetPosition: { x: 100, y: 100 },
        });
        await nodes.dragNewConnectedNode({
          from: DefaultNodeName.INPUT_DATA,
          type: NodeType.DECISION,
          targetPosition: { x: 500, y: 500 },
        });

        expect(await edges.get({ from: DefaultNodeName.INPUT_DATA, to: DefaultNodeName.DECISION })).toBeAttached();
        expect(await edges.getType({ from: DefaultNodeName.INPUT_DATA, to: DefaultNodeName.DECISION })).toEqual(
          EdgeType.INFORMATION_REQUIREMENT
        );
        await expect(diagram.get()).toHaveScreenshot("add-decision-node-from-input-data-node.png");
      });

      test("should add connected Decision node from Decision node", async ({ diagram, palette, nodes, edges }) => {
        await palette.dragNewNode({
          type: NodeType.DECISION,
          targetPosition: { x: 100, y: 100 },
          thenRenameTo: "Decision - A",
        });
        await nodes.dragNewConnectedNode({
          from: "Decision - A",
          type: NodeType.DECISION,
          targetPosition: { x: 100, y: 300 },
        });

        expect(await edges.get({ from: "Decision - A", to: DefaultNodeName.DECISION })).toBeAttached();
        expect(await edges.getType({ from: "Decision - A", to: DefaultNodeName.DECISION })).toEqual(
          EdgeType.INFORMATION_REQUIREMENT
        );
        await expect(diagram.get()).toHaveScreenshot("add-decision-node-from-decision-node.png");
      });

      test("should add connected Decision node from BKM node", async ({ diagram, palette, nodes, edges }) => {
        await palette.dragNewNode({
          type: NodeType.BKM,
          targetPosition: { x: 100, y: 100 },
        });
        await nodes.dragNewConnectedNode({
          from: DefaultNodeName.BKM,
          type: NodeType.DECISION,
          targetPosition: { x: 500, y: 500 },
        });

        expect(await edges.get({ from: DefaultNodeName.BKM, to: DefaultNodeName.DECISION })).toBeAttached();
        expect(await edges.getType({ from: DefaultNodeName.BKM, to: DefaultNodeName.DECISION })).toEqual(
          EdgeType.KNOWLEDGE_REQUIREMENT
        );
        await expect(diagram.get()).toHaveScreenshot("add-decision-node-from-bkm-node.png");
      });

      test("should add connected Decision node from Decision Service node", async ({
        diagram,
        palette,
        nodes,
        edges,
      }) => {
        await palette.dragNewNode({
          type: NodeType.DECISION_SERVICE,
          targetPosition: { x: 100, y: 100 },
        });
        await nodes.dragNewConnectedNode({
          from: DefaultNodeName.DECISION_SERVICE,
          type: NodeType.DECISION,
          targetPosition: { x: 500, y: 500 },
        });

        expect(
          await edges.get({ from: DefaultNodeName.DECISION_SERVICE, to: DefaultNodeName.DECISION })
        ).toBeAttached();
        expect(await edges.getType({ from: DefaultNodeName.DECISION_SERVICE, to: DefaultNodeName.DECISION })).toEqual(
          EdgeType.KNOWLEDGE_REQUIREMENT
        );
        await expect(diagram.get()).toHaveScreenshot("add-decision-node-from-decision-service-node.png");
      });

      test("should add connected Decision node from Knowledge Source node", async ({
        diagram,
        palette,
        nodes,
        edges,
      }) => {
        await palette.dragNewNode({
          type: NodeType.KNOWLEDGE_SOURCE,
          targetPosition: { x: 100, y: 100 },
        });
        await nodes.dragNewConnectedNode({
          from: DefaultNodeName.KNOWLEDGE_SOURCE,
          type: NodeType.DECISION,
          targetPosition: { x: 100, y: 300 },
        });

        expect(
          await edges.get({ from: DefaultNodeName.KNOWLEDGE_SOURCE, to: DefaultNodeName.DECISION })
        ).toBeAttached();
        expect(await edges.getType({ from: DefaultNodeName.KNOWLEDGE_SOURCE, to: DefaultNodeName.DECISION })).toEqual(
          EdgeType.AUTHORITY_REQUIREMENT
        );
        await expect(diagram.get()).toHaveScreenshot("add-decision-node-from-knowledge-source-node.png");
      });
    });
  });
});
