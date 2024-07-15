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

import { BPMNDI__BPMNEdge, BPMNDI__BPMNShape } from "@kie-tools/bpmn-marshaller/dist/schemas/bpmn-2_0/ts-gen/types";
import * as React from "react";
import { useRef } from "react";
import * as RF from "reactflow";
import { DEFAULT_INTRACTION_WIDTH } from "../maths/DiMaths";
import { propsHaveSameValuesDeep } from "../memoization/memoization";
import { useIsHovered } from "../useIsHovered";
import { PotentialWaypoint, Waypoints } from "./Waypoints";
import { useAlwaysVisibleEdgeUpdatersAtNodeBorders } from "./useAlwaysVisibleEdgeUpdatersAtNodeBorders";
import { useKieEdgePath } from "./useKieEdgePath";
import { usePotentialWaypointControls } from "./usePotentialWaypointControls";
import { Normalized } from "../../normalization/normalize";

export type BpmnDiagramEdgeData = {
  bpmnEdge: (Normalized<BPMNDI__BPMNEdge> & { index: number }) | undefined;
  bpmnObject: unknown; // FIXME: Tiago: ?
  bpmnShapeSource: Normalized<BPMNDI__BPMNShape> | undefined;
  bpmnShapeTarget: Normalized<BPMNDI__BPMNShape> | undefined;
};

export const SequenceFlowPath = React.memo(
  (_props: React.SVGProps<SVGPathElement> & { svgRef?: React.RefObject<SVGPathElement> }) => {
    const { svgRef, ...props } = _props;
    return (
      <>
        <path ref={svgRef} style={{ strokeWidth: 1, stroke: "black" }} markerEnd={"url(#closed-arrow)"} {...props} />
      </>
    );
  }
);

export const AssociationPath = React.memo(
  (__props: React.SVGProps<SVGPathElement> & { svgRef?: React.RefObject<SVGPathElement> }) => {
    const strokeWidth = __props.strokeWidth ?? 1.5;
    const { svgRef, ...props } = __props;
    return (
      <>
        <path
          ref={svgRef}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeLinejoin="round"
          style={{ stroke: "black", strokeDasharray: `${strokeWidth},10` }}
          {...props}
        />
      </>
    );
  }
);

export function useEdgeClassName(isConnecting: boolean, isDraggingWaypoint: boolean) {
  if (isConnecting) {
    return "dimmed";
  }

  if (isDraggingWaypoint) {
    return "dragging-waypoint";
  }

  return "normal";
}

//

const interactionStrokeProps: Partial<React.SVGAttributes<SVGPathElement>> = {
  strokeOpacity: 1,
  markerEnd: undefined,
  style: undefined,
  className: "react-flow__edge-interaction",
  stroke: "transparent",
  strokeLinecap: "round",
};

export const SequenceFlowEdge = React.memo((props: RF.EdgeProps<BpmnDiagramEdgeData>) => {
  const renderCount = useRef<number>(0);
  renderCount.current++;

  const { path, points: waypoints } = useKieEdgePath(props.source, props.target, props.data);

  const interactionPathRef = React.useRef<SVGPathElement>(null);
  const isHovered = useIsHovered(interactionPathRef);

  const { onMouseMove, onDoubleClick, potentialWaypoint, isDraggingWaypoint } = usePotentialWaypointControls(
    waypoints,
    props.selected,
    props.id,
    props.data?.bpmnEdge?.index,
    interactionPathRef
  );

  const isConnecting = !!RF.useStore((s) => s.connectionNodeId);
  const className = useEdgeClassName(isConnecting, isDraggingWaypoint);

  useAlwaysVisibleEdgeUpdatersAtNodeBorders(interactionPathRef, props.source, props.target, waypoints);

  return (
    <>
      <SequenceFlowPath
        svgRef={interactionPathRef}
        d={path}
        {...interactionStrokeProps}
        className={`${interactionStrokeProps.className} ${className}`}
        strokeWidth={props.interactionWidth ?? DEFAULT_INTRACTION_WIDTH}
        onMouseMove={onMouseMove}
        onDoubleClick={onDoubleClick}
        data-edgetype={"information-requirement"}
      />
      <SequenceFlowPath d={path} className={`kie-bpmn-editor--edge ${className}`} />

      {props.selected && !isConnecting && props.data?.bpmnEdge && (
        <Waypoints
          edgeId={props.id}
          edgeIndex={props.data.bpmnEdge.index}
          waypoints={waypoints}
          onDragStop={onMouseMove}
        />
      )}
      {isHovered && potentialWaypoint && <PotentialWaypoint point={potentialWaypoint.point} />}
    </>
  );
}, propsHaveSameValuesDeep);

export const AssociationEdge = React.memo((props: RF.EdgeProps<BpmnDiagramEdgeData>) => {
  const renderCount = useRef<number>(0);
  renderCount.current++;

  const { path, points: waypoints } = useKieEdgePath(props.source, props.target, props.data);

  const interactionPathRef = React.useRef<SVGPathElement>(null);
  const isHovered = useIsHovered(interactionPathRef);

  const { onMouseMove, onDoubleClick, potentialWaypoint, isDraggingWaypoint } = usePotentialWaypointControls(
    waypoints,
    props.selected,
    props.id,
    props.data?.bpmnEdge?.index,
    interactionPathRef
  );

  const isConnecting = !!RF.useStore((s) => s.connectionNodeId);
  const className = useEdgeClassName(isConnecting, isDraggingWaypoint);

  useAlwaysVisibleEdgeUpdatersAtNodeBorders(interactionPathRef, props.source, props.target, waypoints);

  return (
    <>
      <AssociationPath
        svgRef={interactionPathRef}
        d={path}
        {...interactionStrokeProps}
        className={`${interactionStrokeProps.className} ${className}`}
        strokeWidth={props.interactionWidth ?? DEFAULT_INTRACTION_WIDTH}
        onMouseMove={onMouseMove}
        onDoubleClick={onDoubleClick}
        data-edgetype={"association"}
      />
      <AssociationPath d={path} className={`kie-bpmn-editor--edge ${className}`} />

      {props.selected && !isConnecting && props.data?.bpmnEdge && (
        <Waypoints
          edgeId={props.id}
          edgeIndex={props.data.bpmnEdge.index}
          waypoints={waypoints}
          onDragStop={onMouseMove}
        />
      )}
      {isHovered && potentialWaypoint && <PotentialWaypoint point={potentialWaypoint.point} />}
    </>
  );
}, propsHaveSameValuesDeep);
