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
import { AddRowPosition } from "../../__fixtures__/scesimEditor";

test.describe("Populate Decision Test Scenario table", () => {
  test("should correctly populate decision-based a test scenario table", async ({
    stories,
    page,
    resizing,
    scesimEditor,
    monaco,
  }) => {
    await stories.openTestScenarioTableDecision();
    await monaco.fillByRowAndColumn({ content: "Scenario one", rowLocatorInfo: "1", column: 0 });
    await monaco.fillByRowAndColumn({
      content: "date and time(5, 10)",
      rowLocatorInfo: "1 Scenario one Scenario one",
      column: 1,
    });
    await monaco.fillByRowAndColumn({
      content: "100",
      rowLocatorInfo: "1 Scenario one Scenario one date and time(5, 10) date and time(5, 10)",
      column: 2,
    });

    await resizing.reset(page.getByRole("columnheader", { name: "GIVEN" }));
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });

    await monaco.fillByRowAndColumn({ content: "{foo}", rowLocatorInfo: "2", column: 0 });
    await monaco.fillByRowAndColumn({ content: '"foo"', rowLocatorInfo: "3", column: 0 });
    await monaco.fillByRowAndColumn({ content: "[foo]", rowLocatorInfo: "4", column: 0 });
    await monaco.fillByRowAndColumn({ content: ",./123", rowLocatorInfo: "5", column: 0 });
    await monaco.fillByRowAndColumn({ content: '"6789"', rowLocatorInfo: "6", column: 0 });

    await monaco.fillByRowAndColumn({ content: '"foo"', rowLocatorInfo: "2 {foo} {foo}", column: 1 });
    await monaco.fillByRowAndColumn({ content: "[foo]", rowLocatorInfo: '3 "foo" "foo"', column: 1 });
    await monaco.fillByRowAndColumn({ content: ",./123", rowLocatorInfo: "4 [foo] [foo]", column: 1 });
    await monaco.fillByRowAndColumn({ content: "Scenario two", rowLocatorInfo: "5 ,./123 ,./123", column: 1 });
    await monaco.fillByRowAndColumn({ content: '"129587289157"', rowLocatorInfo: '6 "6789" "6789"', column: 1 });

    await monaco.fillByRowAndColumn({ content: '"foo"', rowLocatorInfo: '2 {foo} {foo} "foo" "foo"', column: 2 });
    await monaco.fillByRowAndColumn({ content: ",./123", rowLocatorInfo: '3 "foo" "foo" [foo] [foo]', column: 2 });
    await monaco.fillByRowAndColumn({
      content: '"12859728917589"',
      rowLocatorInfo: "4 [foo] [foo] ,./123 ,./123",
      column: 2,
    });
    await monaco.fillByRowAndColumn({
      content: "Scenario date and time(213,456 , )",
      rowLocatorInfo: "5 ,./123 ,./123 Scenario two Scenario two",
      column: 2,
    });
    await monaco.fillByRowAndColumn({
      content: "{foofoo}{foofoo}",
      rowLocatorInfo: '6 "6789" "6789" "129587289157" "129587289157"',
      column: 2,
    });

    await resizing.reset(page.getByRole("columnheader", { name: "EXPECT" }));
    await expect(page.getByLabel("Test Scenario")).toHaveScreenshot("test-scenario-table-decision.png");
  });
});

test.describe("Populate Rule Test Scenario table", () => {
  test("should correctly populate a rule-based test scenario table", async ({
    stories,
    page,
    resizing,
    scesimEditor,
    monaco,
  }) => {
    await stories.openTestScenarioTableRule();

    await monaco.fillByRowAndColumn({ content: "Scenario one", rowLocatorInfo: "1", column: 0 });
    await monaco.fillByRowAndColumn({
      content: "date and time(5, 10)",
      rowLocatorInfo: "1 Scenario one Scenario one",
      column: 1,
    });
    await monaco.fillByRowAndColumn({
      content: "100",
      rowLocatorInfo: "1 Scenario one Scenario one date and time(5, 10) date and time(5, 10)",
      column: 2,
    });

    await resizing.reset(page.getByRole("columnheader", { name: "GIVEN" }));
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });
    await scesimEditor.addRow({ targetCell: "1", position: AddRowPosition.BELOW });

    await monaco.fillByRowAndColumn({ content: "{foo}", rowLocatorInfo: "2", column: 0 });
    await monaco.fillByRowAndColumn({ content: '"foo"', rowLocatorInfo: "3", column: 0 });
    await monaco.fillByRowAndColumn({ content: "[foo]", rowLocatorInfo: "4", column: 0 });
    await monaco.fillByRowAndColumn({ content: ",./123", rowLocatorInfo: "5", column: 0 });
    await monaco.fillByRowAndColumn({ content: '"6789"', rowLocatorInfo: "6", column: 0 });

    await monaco.fillByRowAndColumn({ content: '"foo"', rowLocatorInfo: "2 {foo} {foo}", column: 1 });
    await monaco.fillByRowAndColumn({ content: "[foo]", rowLocatorInfo: '3 "foo" "foo"', column: 1 });
    await monaco.fillByRowAndColumn({ content: ",./123", rowLocatorInfo: "4 [foo] [foo]", column: 1 });
    await monaco.fillByRowAndColumn({ content: "Scenario two", rowLocatorInfo: "5 ,./123 ,./123", column: 1 });
    await monaco.fillByRowAndColumn({ content: '"129587289157"', rowLocatorInfo: '6 "6789" "6789"', column: 1 });

    await monaco.fillByRowAndColumn({ content: '"foo"', rowLocatorInfo: '2 {foo} {foo} "foo" "foo"', column: 2 });
    await monaco.fillByRowAndColumn({ content: ",./123", rowLocatorInfo: '3 "foo" "foo" [foo] [foo]', column: 2 });
    await monaco.fillByRowAndColumn({
      content: '"12859728917589"',
      rowLocatorInfo: "4 [foo] [foo] ,./123 ,./123",
      column: 2,
    });
    await monaco.fillByRowAndColumn({
      content: "Scenario date and time(213,456 , )",
      rowLocatorInfo: "5 ,./123 ,./123 Scenario two Scenario two",
      column: 2,
    });
    await monaco.fillByRowAndColumn({
      content: "{foofoo}{foofoo}",
      rowLocatorInfo: '6 "6789" "6789" "129587289157" "129587289157"',
      column: 2,
    });

    await resizing.reset(page.getByRole("columnheader", { name: "EXPECT" }));
    await expect(page.getByLabel("Test Scenario")).toHaveScreenshot("test-scenario-table-rule.png");
  });
});
