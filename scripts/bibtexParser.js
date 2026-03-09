/**
 * A lightweight, custom client-side BibTeX parser.
 * Designed to extract common fields, including custom tags (keywords), url, and project links.
 */
class BibtexParser {
    static parse(bibtexString) {
        const entries = [];
        // Split entries roughly by looking for @
        const rawEntries = bibtexString.split(/@(?=[a-zA-Z]+{)/).filter(r => r.trim() !== '');

        rawEntries.forEach(raw => {
            const entryStr = raw.trim();
            if (!entryStr) return;

            // Extract type and cite key
            const match = entryStr.match(/^([a-zA-Z]+)\s*{\s*([^,]+),/);
            if (!match) return;

            const type = match[1].toLowerCase();
            const citeKey = match[2].trim();

            const entry = { type, id: citeKey, fields: {} };

            // Find the contents inside the main braces
            const firstBraceIdx = entryStr.indexOf('{');
            const lastBraceIdx = entryStr.lastIndexOf('}');
            if (firstBraceIdx === -1 || lastBraceIdx === -1) return;

            const fieldsContent = entryStr.substring(entryStr.indexOf(',', firstBraceIdx) + 1, lastBraceIdx).trim();

            // Regex to match `key = {value}` or `key = "value"` or `key = value`
            // Handles multiline values
            const fieldRegex = /([a-zA-Z0-9_\-]+)\s*=\s*(?:{([^}]*)}|"([^"]*)"|([^,\s]*))/g;
            let fieldMatch;

            while ((fieldMatch = fieldRegex.exec(fieldsContent)) !== null) {
                const key = fieldMatch[1].toLowerCase();
                // Pick whichever group matched
                let value = fieldMatch[2] !== undefined ? fieldMatch[2] :
                    fieldMatch[3] !== undefined ? fieldMatch[3] :
                        fieldMatch[4] !== undefined ? fieldMatch[4] : "";

                // Clean up whitespace inside value (remove newlines, collapse spaces)
                value = value.replace(/\s+/g, ' ').trim();

                entry.fields[key] = value;
            }

            entries.push(entry);
        });

        return entries;
    }
}

// Attach it to Window for global access
window.BibtexParser = BibtexParser;
