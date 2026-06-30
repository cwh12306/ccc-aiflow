import { Extension } from '@tiptap/react';
import { SuggestionOptions } from '@tiptap/suggestion';

export interface SlashCommandItem {
    type: 'node' | 'variable';
}

export interface SlashCommandOptions {
    suggestion: Omit<SuggestionOptions<SlashCommandItem>, 'editor'>;
    // availableOutputs:
}

export const SlashCommand = Extension.create<SlashCommandOptions>({
    name: 'slashCommand',

    addOptions() {
        return {
            suggestion: {
                char: '/',
            },
        };
    },
});
