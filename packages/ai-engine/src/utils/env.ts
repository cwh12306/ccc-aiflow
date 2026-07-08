export function resolveEnvironmentValue(keys: string[]): string | undefined {
    for (const key of keys) {
        const value = process.env[key];
        if (value && value.trim()) {
            return value;
        }
    }

    return undefined;
}
