import _ from 'lodash';

/**
 * Updates a value in the JSON object at the specified path.
 * Returns a new object (immutable update).
 */
export const updateJsonValue = (json: any, path: string[], value: any): any => {
    const newJson = JSON.parse(JSON.stringify(json));
    let current = newJson;
    for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
            current[path[i]] = {};
        }
        current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    return newJson;
};

/**
 * Converts weird "YYYYMMDDHHmm" date string to standard "YYYY-MM-DDTHH:mm" for input fields.
 */
export const toInputDate = (dateStr: string): string => {
    if (!dateStr || dateStr.length !== 12) return "";
    const y = dateStr.substring(0, 4);
    const m = dateStr.substring(4, 6);
    const d = dateStr.substring(6, 8);
    const h = dateStr.substring(8, 10);
    const min = dateStr.substring(10, 12);
    return `${y}-${m}-${d}T${h}:${min}`;
};

/**
 * Converts standard "YYYY-MM-DDTHH:mm" input back to "YYYYMMDDHHmm".
 */
export const fromInputDate = (isoStr: string): string => {
    if (!isoStr) return "";
    return isoStr.replace(/[-T:]/g, "");
};

/**
 * Checks if a string is a valid ISO date or the custom format.
 */
export const isDateKey = (key: string): boolean => {
    const lower = key.toLowerCase();
    return lower.includes('date') || lower.includes('time');
};

/**
 * Checks if a key implies a color value.
 */
export const isColorKey = (key: string): boolean => {
    const lower = key.toLowerCase();
    return lower.includes('color') || lower.includes('bg') || lower.includes('background');
};

/**
 * Download JSON file
 */
export const downloadJson = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 4)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
