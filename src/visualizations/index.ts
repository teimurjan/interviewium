import type { ComponentType } from "react";
import SlidingWindow from "./sliding-window";
import TwoPointers from "./two-pointers";
import BinarySearch from "./binary-search";
import PrefixSum from "./prefix-sum";
import Intervals from "./intervals";
import Dp1d from "./dp-1d";
import Dp2d from "./dp-2d";
import DpKnapsack from "./dp-knapsack";
import GraphBfs from "./graph-bfs";
import GraphDfs from "./graph-dfs";
import GridBfs from "./grid-bfs";
import Dijkstra from "./dijkstra";
import MinimumSpanningTree from "./minimum-spanning-tree";
import TopologicalSort from "./topological-sort";
import UnionFind from "./union-find";
import HashMap from "./hash-map";
import SetMembership from "./set-membership";
import Quickselect from "./quickselect";
import Sorting from "./sorting";
import Stack from "./stack";
import Queue from "./queue";
import MonotonicStack from "./monotonic-stack";
import Heap from "./heap";
import LinkedList from "./linked-list";
import StringMatching from "./string-matching";
import Trie from "./trie";
import TreeBfs from "./tree-bfs";
import TreeDfs from "./tree-dfs";
import Backtracking from "./backtracking";

/**
 * Visualization registry — maps a lesson's frontmatter `viz` key to its
 * standalone component. Add a key here and reference it via `viz: <key>` in
 * the matching `.md` file.
 */
export const visualizations: Record<string, ComponentType> = {
  "sliding-window": SlidingWindow,
  "two-pointers": TwoPointers,
  "binary-search": BinarySearch,
  "prefix-sum": PrefixSum,
  intervals: Intervals,
  "dp-1d": Dp1d,
  "dp-2d": Dp2d,
  "dp-knapsack": DpKnapsack,
  "graph-bfs": GraphBfs,
  "graph-dfs": GraphDfs,
  "grid-bfs": GridBfs,
  dijkstra: Dijkstra,
  "minimum-spanning-tree": MinimumSpanningTree,
  "topological-sort": TopologicalSort,
  "union-find": UnionFind,
  "hash-map": HashMap,
  "set-membership": SetMembership,
  quickselect: Quickselect,
  sorting: Sorting,
  stack: Stack,
  queue: Queue,
  "monotonic-stack": MonotonicStack,
  heap: Heap,
  "linked-list": LinkedList,
  "string-matching": StringMatching,
  trie: Trie,
  "tree-bfs": TreeBfs,
  "tree-dfs": TreeDfs,
  backtracking: Backtracking,
};
