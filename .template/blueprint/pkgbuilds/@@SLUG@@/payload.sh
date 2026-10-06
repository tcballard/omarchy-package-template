#!/usr/bin/env bash
set -euo pipefail
case "${1:-}" in
  --version) printf '%s\n' '@@SLUG@@ 0.1.0' ;;
  '') printf '%s\n' 'Local package starter. Replace this payload with your inspected upstream application.' ;;
  *) printf '%s\n' 'Usage: @@SLUG@@ [--version]' >&2; exit 2 ;;
esac
