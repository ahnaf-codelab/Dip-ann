/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  icon: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface ReasonItem {
  id: string;
  reason: string;
  details: string;
  iconName: string;
}

export interface FutureGoal {
  id: string;
  title: string;
  description: string;
  emoji: string;
  colorClass: string;
}
