#!/usr/bin/env bash
# Erzeugt aus dem Template eine neue, rein lokale Präsentation (frische Git-Historie).
#
# Aufruf:
#   ./neue-praesentation.sh <name> [zielordner]
#
# Beispiele:
#   ./neue-praesentation.sh vortrag-2026             # legt ./vortrag-2026 an
#   ./neue-praesentation.sh vortrag-2026 ~/talks     # legt ~/talks/vortrag-2026 an

set -euo pipefail

TEMPLATE_URL="${TEMPLATE_URL:-https://github.com/FLimeGreen/Praesentation-Tamplate-Angular.git}"

usage() {
  echo "Aufruf: $(basename "$0") <name> [zielordner]"
  echo "  name         Name der neuen Präsentation (= Ordnername)"
  echo "  zielordner   Ordner, in dem sie angelegt wird (Standard: aktuelles Verzeichnis)"
  exit 1
}

NAME="${1:-}"
PARENT_DIR="${2:-.}"

[[ -z "$NAME" ]] && usage

# Name prüfen: keine Pfadtrenner, keine Leerzeichen am Rand
if [[ "$NAME" =~ [/\\] ]]; then
  echo "Fehler: Der Name darf keine Schrägstriche enthalten." >&2
  exit 1
fi

# Zielordner anlegen, falls er fehlt, und in absoluten Pfad umwandeln
mkdir -p "$PARENT_DIR"
PARENT_DIR="$(cd "$PARENT_DIR" && pwd)"
TARGET="$PARENT_DIR/$NAME"

if [[ -e "$TARGET" ]]; then
  echo "Fehler: $TARGET existiert bereits." >&2
  exit 1
fi

echo "→ Klone Template nach $TARGET"
git clone --quiet --depth 1 "$TEMPLATE_URL" "$TARGET"

cd "$TARGET"

echo "→ Entferne Template-Historie und initialisiere neues Repo"
rm -rf .git
git init --quiet
git add .
git commit --quiet -m "Start"

echo
echo "Fertig: $TARGET"
echo "Weiter mit:"
echo "  cd \"$TARGET\""
echo "  npm install"
echo "  ng serve --open"
