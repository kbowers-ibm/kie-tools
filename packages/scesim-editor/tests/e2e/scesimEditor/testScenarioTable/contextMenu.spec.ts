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

import { test, expect } from "../../__fixtures__/base";
import { AssetType } from "../../__fixtures__/editor";
import { AddColumnPosition, AddRowPosition } from "../../__fixtures__/table";

test.describe("Test Scenario Table context menu", () => {
  test.describe("Context menu checks", () => {
    test.beforeEach(async ({ editor, testScenarioTable, table }) => {
      await editor.createTestScenario(AssetType.RULE);
      await table.addRow({ targetCell: "1", position: AddRowPosition.ABOVE });
      await testScenarioTable.fillTestScenarioTableCell({ content: "test", rowLocatorInfo: "1", column: 1 });
    });

    test("should render select context menu", async ({ contextMenu }) => {
      await contextMenu.openOnCell({ rowNumber: "1", columnNumber: 1 });
      await expect(contextMenu.getHeader({ header: "SELECTION" })).toBeAttached();
      await expect(contextMenu.getHeader({ header: "SCENARIO" })).toBeAttached();
      await expect(contextMenu.getHeader({ header: "FIELD" })).not.toBeAttached();
      await expect(contextMenu.getHeader({ header: "INSTANCE" })).not.toBeAttached();
    });

    test("should render field context menu", async ({ contextMenu }) => {
      await contextMenu.openOnProperty({ name: "PROPERTY (<Undefined>)", columnNumber: 1 });
      await expect(contextMenu.getHeader({ header: "SELECTION" })).not.toBeAttached();
      await expect(contextMenu.getHeader({ header: "SCENARIO" })).not.toBeAttached();
      await expect(contextMenu.getHeader({ header: "FIELD" })).toBeAttached();
      await expect(contextMenu.getHeader({ header: "INSTANCE" })).not.toBeAttached();
    });

    test("should render instance context menu", async ({ contextMenu }) => {
      await contextMenu.openOnInstance({ name: "INSTANCE-1 (<Undefined>)" });
      await expect(contextMenu.getHeader({ header: "SELECTION" })).not.toBeAttached();
      await expect(contextMenu.getHeader({ header: "SCENARIO" })).not.toBeAttached();
      await expect(contextMenu.getHeader({ header: "FIELD" })).not.toBeAttached();
      await expect(contextMenu.getHeader({ header: "INSTANCE" })).toBeAttached();
    });
    test("should add and delete instance column left", async ({ contextMenu, table, testScenarioTable }) => {
      await expect(table.getColumnHeader({ name: "INSTANCE-3 (<Undefined>)" })).not.toBeAttached();
      await table.addInstanceColumn({
        targetCell: "INSTANCE-1 (<Undefined>)",
        position: AddColumnPosition.LEFT,
      });
      await expect(table.getColumnHeader({ name: "INSTANCE-3 (<Undefined>)" })).toBeAttached();
      await expect(testScenarioTable.get()).toHaveScreenshot("test-scenario-table-add-instance-column-left.png");
      await contextMenu.openOnInstance({ name: "INSTANCE-3 (<Undefined>)" });
      await contextMenu.command({ command: "Delete Instance" });
      await expect(table.getColumnHeader({ name: "INSTANCE-3 (<Undefined>)" })).not.toBeAttached();
    });
    test("should add and delete instance column right", async ({ contextMenu, table, testScenarioTable }) => {
      await expect(table.getColumnHeader({ name: "INSTANCE-3 (<Undefined>)" })).not.toBeAttached();
      await table.addInstanceColumn({
        targetCell: "INSTANCE-1 (<Undefined>)",
        position: AddColumnPosition.RIGHT,
      });
      await expect(table.getColumnHeader({ name: "INSTANCE-3 (<Undefined>)" })).toBeAttached();
      await expect(testScenarioTable.get()).toHaveScreenshot("test-scenario-table-add-instance-column-right.png");
      await contextMenu.openOnInstance({ name: "INSTANCE-3 (<Undefined>)" });
      await contextMenu.command({ command: "Delete Instance" });
      await expect(table.getColumnHeader({ name: "INSTANCE-3 (<Undefined>)" })).not.toBeAttached();
    });
    test("should add and delete property column left", async ({ contextMenu, table, testScenarioTable }) => {
      await expect(table.getColumnHeader({ name: "PROPERTY (<Undefined>)" }).nth(2)).not.toBeAttached();
      await table.addPropertyColumn({
        targetCell: "PROPERTY (<Undefined>)",
        position: AddColumnPosition.LEFT,
        nth: 0,
      });
      await expect(table.getColumnHeader({ name: "PROPERTY (<Undefined>)" }).nth(2)).toBeAttached();
      await expect(testScenarioTable.get()).toHaveScreenshot("test-scenario-table-add-property-column-left.png");
      await contextMenu.openOnProperty({ name: "PROPERTY (<Undefined>)", columnNumber: 1 });
      await contextMenu.command({ command: "Delete Field" });
      await expect(table.getColumnHeader({ name: "PROPERTY (<Undefined>)" }).nth(2)).not.toBeAttached();
    });
    test("should add and delete property column right", async ({ contextMenu, table, testScenarioTable }) => {
      await expect(table.getColumnHeader({ name: "PROPERTY (<Undefined>)" }).nth(2)).not.toBeAttached();
      await table.addPropertyColumn({
        targetCell: "PROPERTY (<Undefined>)",
        position: AddColumnPosition.RIGHT,
        nth: 0,
      });
      await expect(table.getColumnHeader({ name: "PROPERTY (<Undefined>)" }).nth(2)).toBeAttached();
      await expect(testScenarioTable.get()).toHaveScreenshot("test-scenario-table-add-property-column-right.png");
      await contextMenu.openOnProperty({ name: "PROPERTY (<Undefined>)", columnNumber: 1 });
      await contextMenu.command({ command: "Delete Field" });
      await expect(table.getColumnHeader({ name: "PROPERTY (<Undefined>)" }).nth(2)).not.toBeAttached();
    });
    test("should add and delete row below", async ({ table, contextMenu }) => {
      await expect(table.getCell({ rowNumber: "3", columnNumber: 0 })).not.toBeAttached();
      await table.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
      await expect(table.getCell({ rowNumber: "1", columnNumber: 1 })).toContainText("test");
      await contextMenu.openOnCell({ rowNumber: "3", columnNumber: 0 });
      await contextMenu.command({ command: "Delete" });
      await expect(table.getCell({ rowNumber: "3", columnNumber: 0 })).not.toBeAttached();
    });
    test("should add and delete row above", async ({ table, contextMenu }) => {
      await expect(table.getCell({ rowNumber: "3", columnNumber: 0 })).not.toBeAttached();
      await table.addRow({ targetCell: "1", position: AddRowPosition.ABOVE });
      await expect(table.getCell({ rowNumber: "2", columnNumber: 1 })).toContainText("test");
      await contextMenu.openOnCell({ rowNumber: "3", columnNumber: 0 });
      await contextMenu.command({ command: "Delete" });
      await expect(table.getCell({ rowNumber: "3", columnNumber: 0 })).not.toBeAttached();
    });
  });
});
