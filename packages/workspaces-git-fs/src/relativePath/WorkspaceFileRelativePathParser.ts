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

import { basename, extname, parse } from "path";

export function parseWorkspaceFileRelativePath(relativePath: string) {
  const extension = extractExtension(relativePath);
  return {
    relativePathWithoutExtension: relativePath.replace(`.${extension}`, ""),
    relativeDirPath: parse(relativePath).dir,
    extension: extension,
    nameWithoutExtension: basename(relativePath, `.${extension}`),
    name: basename(relativePath),
  };
}

export function extractExtension(relativePath: string) {
  const fileName = basename(relativePath).toLowerCase();
  let extensionFinder = 0;
  if (fileName.includes(".sw.")) {
    extensionFinder = fileName.lastIndexOf(".sw.");
  } else if (fileName.includes(".yard.")) {
    extensionFinder = fileName.lastIndexOf(".yard.");
  } else if (fileName.includes(".dash.")) {
    extensionFinder = fileName.lastIndexOf(".dash.");
  } else {
    extensionFinder = fileName.lastIndexOf(".");
  }
  return fileName.substring(extensionFinder + 1);
}
