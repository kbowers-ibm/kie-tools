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

import { ProjectName } from "@kie-tools/playwright-base/projectNames";
import { Page, Locator } from "@playwright/test";

export class Monaco {
  constructor(public page: Page, public projectName: ProjectName) {}

  public async fillByRowAndColumn(args: { content: string; rowLocatorInfo: string; column: number }) {
    if (args.column === 0) {
      await this.page
        .getByRole("row", { name: args.rowLocatorInfo, exact: true })
        .getByTestId("monaco-container")
        .first()
        .dblclick();
    } else {
      await this.page
        .getByRole("row", { name: args.rowLocatorInfo, exact: true })
        .getByTestId("monaco-container")
        .nth(args.column)
        .dblclick();
    }

    if (this.projectName === ProjectName.GOOGLE_CHROME) {
      // Google chromes fill function is not always erasing the input content
      await this.page.getByLabel("Editor content;Press Alt+F1 for Accessibility Options.").press("Control+A");
    }
    // FEEL text input selector when the monaco editor is selected.
    await this.page.getByLabel("Editor content;Press Alt+F1 for Accessibility Options.").fill(args.content);
    await this.page.keyboard.press("Home");
    await this.page.keyboard.press("Enter");
  }
  public async fillBackgroundTableCell(args: { content: string; column: number }) {
    if (args.column === 0) {
      await this.page.getByLabel("Background").getByTestId("monaco-container").first().dblclick();
    } else {
      await this.page.getByLabel("Background").getByTestId("monaco-container").nth(args.column).dblclick();
    }

    if (this.projectName === ProjectName.GOOGLE_CHROME) {
      // Google chromes fill function is not always erasing the input content
      await this.page.getByLabel("Editor content;Press Alt+F1 for Accessibility Options.").press("Control+A");
    }
    // FEEL text input selector when the monaco editor is selected.
    await this.page.getByLabel("Editor content;Press Alt+F1 for Accessibility Options.").fill(args.content);
    await this.page.keyboard.press("Home");
    await this.page.keyboard.press("Enter");
  }
}
